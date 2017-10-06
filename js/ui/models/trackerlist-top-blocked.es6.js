const Parent = window.DDG.base.Model

function TrackerListTopBlocked (attrs) {
    attrs = attrs || {}
    attrs.numCompanies = attrs.numCompanies
    attrs.companyList = []
    attrs.companyListMap = []
    Parent.call(this, attrs)
}

TrackerListTopBlocked.prototype = $.extend({},
  Parent.prototype,
  {

      modelName: 'trackerListTopBlocked',

      getTopBlocked: function () {
          return new Promise((resolve, reject) => {
              this.fetch({getTopBlockedByPages: this.numCompanies})
                  .then((data) => {
                      if (!data.totalPages || data.totalPages < 10) return resolve()
                      if (!data.topBlocked || data.topBlocked.length < 1) return resolve()
                      this.companyList = data.topBlocked
                      this.companyListMap = this.companyList.map((company) => {
                          return {
                            name: company.name,
                            percent: company.percent,
                            // calc graph bars using pixels instead of % to
                            // make margins easier
                            // max width: 145px
                            px: Math.floor(company.percent / 100 * 145)
                          }
                      })
                      resolve()
                })
          })
      },

      reset: function () {
          this.companyList = []
          this.companyListMap = []
      }

  }
)

module.exports = TrackerListTopBlocked
