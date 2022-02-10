EXTERNAL MAIL: Do not click links or open attachments unless you know the content is safe.
var getCaller = Class.create();
getCaller.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    getUserInfo: function() {
        try {
            var rest = new sn_ws.RESTMessageV2('Rest Call', 'get'); //call the REST Message
            var header = this.getParameter('sysparm_stc'); // Parameter
            rest.setRequestHeader('name', header);
            rest.setStringParameterNoEscape('name', header);
            var response = rest.execute();
            var responseBody = response.getBody();

            //Find Manager reference record based off REST Call Return
            var data = JSON.parse(responseBody);
            var mgr = [];
            for (var i = 0; i < data.result.tables.row.length; i++) {
                mgr.push(data.result.tables.row[i].manager);
            }
            var userMgr = new GlideRecord('sys_user');
            userMgr.get('user_name', mgr[0]);
             
            var stc = [];
            for (var i = 0; i < data.result.tables.row.length; i++) {
                stc.push(data.result.tables.row[i].CITY_NAME);
                stc.push(data.result.tables.row[i].INTERNET_ADDR);
                stc.push(data.result.tables.row[i].WORK_PHONE);
                stc.push(data.result.tables.row[i].FIELD1);
            }
            stc.push(userMgr.getValue('sys_id'));


            return JSON.stringify({
                'test': data,
                'mgrUpi': userMgr.getValue('sys_id')
            });
        } catch (ex) {
            var message = ex.getMessage();

            return "Test";
        }
    },

    type: 'getCaller'
});
