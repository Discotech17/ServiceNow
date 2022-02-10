function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    //Type appropriate comment here, and begin script below
    var restData = new GlideAjax('getCaller');
    restData.addParam('sysparm_name', 'getUserInfo');
    restData.addParam('sysparm_stc', g_form.getDisplayBox('caller_id').value); //DisplayBox<field>.value is for back end.  DisplayValue is for front end.
    restData.getXMLAnswer(categoriesOutput);
}

function categoriesOutput(response) {
    var data = JSON.parse(response);
    g_form.setValue('manager', data.mgrUser);
    g_form.setValue('admin_contact', data.mgrUser);
    var stc = [];
    for (var i = 0; i < data.test.result.tables.row.length; i++) {
        stc.push(data.test.result.tables.row[i].CITY);
        stc.push(data.test.result.tables.row[i].EMAIL);
        stc.push(data.test.result.tables.row[i].PHONE);
        stc.push(data.test.result.tables.row[i].COUNTRY);
    }
    g_form.setValue('city', stc[0]);
    g_form.setValue('email', stc[1]);
    g_form.setValue('phone', stc[2]);
    g_form.setValue('country', stc[3]);

    g_form.save();
}
