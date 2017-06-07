oocl_piwik_config ={
  piwik_url: 'http://localhost/piwik',
  piwik_sites: [
    {
      url: 'http://dongja3-w7.corp.oocl.com:9000/cmcd',
      siteId:1,
      cookieid:'SSO_IRIS4_USERID_COOKIE_DEV',
      cookieid_callback:callback
    },
    {
      url: 'http://chengcr-w7.corp.oocl.com:9002/wls_ath_con/',
      siteId:1,
      cookieid:'SSO_IRIS4_USERID_COOKIE_DEV'
    }
  ],
  ignoreServicePrefix: [
    '/cmcd/service/'
  ]

}
