var piwik_uuid;
QUnit.test('_isAngular',function(assert){ 
    if(oocl_piwik_common._isAngular())
      assert.ok(oocl_piwik_common._isAngular(),'pass');
    else assert.ok(!oocl_piwik_common._isAngular(),'pass');
});

QUnit.test('_isExt',function(assert){ 
     assert.ok(!oocl_piwik_common._isExt(),'pass');
});

QUnit.test('_getDoctitle',function(assert){ 
    if(!oocl_piwik_common._isAngular())
      assert.equal(oocl_piwik_common._getDocTitle(),'QUnit Test','pass');
    else  assert.equal(oocl_piwik_common._getDocTitle(),'','pass');
});

QUnit.test('_getCustomUrl',function(assert){ 
    if(!oocl_piwik_common._isAngular())
      assert.equal(oocl_piwik_common._getCustomUrl(),'unit_test.html','pass');
    else  assert.equal(oocl_piwik_common._getCustomUrl(),'','pass');
});

QUnit.test('setupContext',function(assert){ 
     oocl_piwik_tracker.setupContext('test');
     assert.ok(oocl_piwik_bfName=='test'&&oocl_piwik_customUrl=='test','pass');


     oocl_piwik_tracker.setupContext();
     assert.ok(oocl_piwik_bfName==null&&oocl_piwik_customUrl==null,'pass');
});

QUnit.test('_clearContext',function(assert){ 
     oocl_piwik_tracker._clearContext();
     assert.ok(oocl_piwik_bfName==null&&oocl_piwik_customUrl==null,'pass');

});

QUnit.test('_createContext',function(assert){ 
     piwik_uuid=oocl_piwik_tracker._createContext();
     var expect={
         "bfName":oocl_piwik_common._getDocTitle(),
         "customUrl":oocl_piwik_common._getCustomUrl()
     };
     var actual=JSON.parse(localStorage.getItem(piwik_uuid))
     assert.propEqual(actual,expect,'pass');
});


QUnit.test('_startTiming',function(assert){ 
     var actual=oocl_piwik_tracker._startTiming();
     assert.strictEqual(actual,undefined,'pass');
});


QUnit.test('_endTiming',function(assert){ 
     oocl_piwik_tracker._endTiming(piwik_uuid);
     var actual=localStorage.getItem(piwik_uuid);
      assert.strictEqual(actual,null,'pass');
});

QUnit.test('Context',function(assert){ 
    var actual=new oocl_piwik.Context('testtitle','testurl');
    var expect={
        bfName:'testtitle',
        customUrl:'testurl'
    };
     assert.propEqual(actual,expect,'pass');
     if(!oocl_piwik_common._isAngular()){
         actual=new oocl_piwik.Context();
         expect={
             bfName:'QUnit Test',
             customUrl:'unit_test.html'
        };
        assert.propEqual(actual,expect,'pass');
    }
    else {
        actual=new oocl_piwik.Context();
        expect={
             bfName:'',
             customUrl:''
         };
        assert.propEqual(actual,expect,'pass');
    }
});

QUnit.test('_ignoreServicePrefix',function(assert){ 
     var url='http://localhost/unit_test.html?user=111&password=222';
     var actual=oocl_piwik_common._ignoreServicePrefix(url);
     var expect='/unit_test.html';
     assert.equal(actual,expect,'pass');
});