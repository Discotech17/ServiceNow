var headers = ['Name', 'Table', 'Field', 'Record'];
var recordName = ['Test Record', 'TEST', 'TEST', 'TEST'];
var table = ['Incident', 'Incident', 'Incident', 'Incident'];
var field = ['Caller', 'Caller', 'Caller', 'Caller'];
var record = ['Beth', 'Joe', 'Frank', 'Cindy'];
var attachTo = new GlideRecord('sys_script_include');
attachTo.get('7b5ef4cf87ecd510d153206f8bbb3531');
var data = '';
var user = new GlideRecord('sys_user');
user.get(gs.getUserID());

for (var i = 0; i < headers.length; i++) {
    data = data + '"' + headers[i] + '"' + ',';
}

data = data + '\r\n';

for (var x = 0; x < recordName.length; x++) {
    data = data + '"' + recordName[x] + '",' + '"' + table[x] + '",' + '"' + field[x] + '",' + '"' + record[x] + '"';
    data = data + '\r\n';
}

var sa = new GlideSysAttachment();
var fileName = 'test.csv';
var fileType = 'application/csv';

sa.write(attachTo, fileName, fileType, data);

var getAttach = new GlideRecord('sys_attachment');
getAttach.get('table_sys_id', attachTo.getUniqueValue());

if (fileName == getAttach.getValue('file_name')) {
    getAttach.setValue('table_sys_id', '');
    getAttach.setValue('created_by', user.getUniqueValue());
    getAttach.setValue('updated_by', user.getUniqueValue());
    getAttach.update();
}

url = url + getAttach.getTableName() + '.do?sys_id=' + getAttach.getUniqueValue();

gs.info('Please click "Available here" link above to start download');
gs.setRedirect(getAttach.getTableName() + '.do?sys_id=' + getAttach.getUniqueValue());
