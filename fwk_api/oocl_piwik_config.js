oocl_piwik_config = {
  piwik_sites: [
    // {
    //   piwik_url: 'http://dongja3-w7/piwik',
    //   url: '',//your url here
    //   siteId: 3,
    //   cookieid: 'connect.sid'
    // }
    //  {
    //   piwik_url: 'https://pengaa.innocraft.cloud',
    //   url: 'http://localhost/piwiktest',//your url here
    //   siteId: 1,
    //   cookieid: 'connect.sid'
    // }
    {
      piwik_url: 'http://localhost/piwik',
      url: 'http://localhost/piwiktest',//your url here
      siteId: 1,
      cookieid_callback: function(){
        return 'testuser';
      }
    }
  ],
  ignoreServicePrefix:[
    '/fwk_api/test'
  ]
}