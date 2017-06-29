oocl_piwik_config = {
  piwik_sites: [
    {
      piwik_url: 'http://tracking.weikayun.com/piwik2',
      url: 'http://test.e-eir.com',
      siteId: 2,
      cookieid_callback: function () {
        return localStorage.getItem('__userid');
      }
    },
    {
      piwik_url: 'http://tracking.weikayun.com/piwik',
      url: 'http://uat.e-eir.com',
      siteId: 2,
      cookieid_callback: function () {
        return localStorage.getItem('__userid');
      }
    }
  ],
  ignoreServicePrefix: [],
  canIgnoreRequest: function (request) {
    return !!request.cache;
  }
}