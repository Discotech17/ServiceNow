//Headers, recordName, table, field, record are all place holders.
//attachTo is the Script Include where this function will be for System attachment creation purposes.
//WILL NOT WORK UNLESS attachTo IS SET UP.
//data is your place holder, and then user record to update the attachment with the user who runs the script.
//ONCE RAN CLICK AVAILABLE HERE LINK ON BACKGROUND SCRIPT TO START DOWNLOAD

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

//Loop through headers array to build out the excel column headers.
for (var i = 0; i < headers.length; i++) {
    data = data + '"' + headers[i] + '"' + ',';
}

//Start next row in excel
data = data + '\r\n';

//Loop through recordName array to build out your rows.
//Start next row
for (var x = 0; x < recordName.length; x++) {
    data = data + '"' + recordName[x] + '",' + '"' + table[x] + '",' + '"' + field[x] + '",' + '"' + record[x] + '"';
    data = data + '\r\n';
}

//Create the Sys Attachment with fileName and fileType
var sa = new GlideSysAttachment();
var fileName = 'test.csv';
var fileType = 'application/csv';

//Put all together
//attachTo is record you are tying attachment too
//fileName is the name of the file
//fileType is the type of file
//data is all your data
sa.write(attachTo, fileName, fileType, data);

//Get the unique attachment that was just created.
var getAttach = new GlideRecord('sys_attachment');
getAttach.get('table_sys_id', attachTo.getUniqueValue());

//Remove the link to Script Include
//Update Created By and Updated By to user who ran the script.
if (fileName == getAttach.getValue('file_name')) {
    getAttach.setValue('table_sys_id', '');
    getAttach.setValue('created_by', user.getUniqueValue());
    getAttach.setValue('updated_by', user.getUniqueValue());
    getAttach.update();
}

//Return info to click Available here link to start download.
//Redirect is to the attachment to start download.
gs.info('Please click "Available here" link above to start download');
gs.setRedirect(getAttach.getTableName() + '.do?sys_id=' + getAttach.getUniqueValue());
