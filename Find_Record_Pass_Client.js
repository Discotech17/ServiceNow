function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || newValue === '') {
    return;
  }
  
  //Type appropriate comment here, and begin script below
  var companyInfo = new GlideAjax('FieldReturnInclude'); // GlideAjax calling the script include
  companyInfo.addParam('sysparm_name', 'getRecordFunction'); // the function we're performing
  companyInfo.addParam('sysparm_rec', g_form.getValue('company')); // the value in the company field that we want to match in our GlideRecord
  companyInfo.addParam('sysparm_table', 'core_company'); // Table we want the ScriptInclude to Query against
  companyInfo.getXMLAnswer(setRecValue); // Retrieve the Answer
}

function setRecValue(response) { // function of getting the response
  var fieldInfo = JSON.parse(response); // parse data to set the values
  g_form.setValue('phone', fieldInfo.phone); //set values
  g_form.setValue('location', fieldInfo.location);
}

// Client Script when the company field is change, it'll pull the location and phone then populate the fields with the respective information.
