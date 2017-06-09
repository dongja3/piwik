oocl_piwik_config ={
  piwik_sites: [
    {
      piwik_url: 'http://localhost/piwik',
      url: 'http://dongja3-w7.corp.oocl.com:9000/cmcd',
      siteId:1,
      cookieid:'SSO_IRIS4_USERID_COOKIE_DEV',
      cookieid_callback:callback
    },
    {
      piwik_url: 'http://localhost/piwik',
      url: 'http://chengcr-w7.corp.oocl.com:9002/wls_ath_con/',
      siteId:1,
      cookieid:'SSO_IRIS4_USERID_COOKIE_DEV'
    },
     {
      piwik_url: 'http://localhost/piwik',
      url: 'http://localhost/piwiktest',
      siteId:4,
      cookieid:'SSO_IRIS4_USERID_COOKIE_DEV',
      cookieid_callback:callback
    },
  ],
  ignoreServicePrefix: [
    '/cmcd/service/'
  ]
}
