var FieldReturnInclude = Class.create();
FieldReturnInclude.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
  
  getRecordFunction: function() {
    var record = this.getParameter('sysparm_rec'); // receive record param
    var table = this.getParameter('sysparm_table'); // receive table param
    
    var company = new GlideRecord(table); // query on table param
    company.addQuery('sys_id', record); // check record and sys_id
    company.query();
    
    if (company.next()) {
      return JSON.stringify({ // put location and phone number fields into a JSON to pass back to client
        'address': company.getDisplayValue('location'),
        'phone': company.getDisplayValue('phone')
      });
    }
  },
  type: 'FieldReturnInclude'
});

//Script Include
// View Find_Record_Pass_Client for Client Script
