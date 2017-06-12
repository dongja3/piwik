oocl_piwik_config ={
  piwik_sites: [
    {
      piwik_url: 'http://localhost/piwik',//piwik服务url
      url: 'http://localhost/piwiktest',//要监视的网页的url
      siteId:4,//piwik服务中网站id
      cookieid:'SSO_IRIS4_USERID_COOKIE_DEV',//用户名对应的cookie
      cookieid_callback:callback,//获取用户名的callback方法
      module_name:'my-app'//angular中对应的模块名
    },
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
     
  ],
  ignoreServicePrefix: [
    // '/cmcd/service/'
    '/fwk_api/test/'
  ]
}
function callback(){
  return 'testuser';
}