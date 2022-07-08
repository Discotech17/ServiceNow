var list = new GlideRecord('sysrule_assignment');
list.addActiveQuery();
list.orderBy('table');
list.orderBy('name');
list.setLimit(25);
list.query();

var listArr = [];
var names = [];
var conditions = [];
var tables = [];
var order = [];
var matchConditions = [];
var user = [];
var group = [];
var script = [];
var sysID = [];

while (list.next()) {
    var scriptYesOrNo = ((list.getValue('script') == null) ? 'NOVALUE' : 'YES');
    listArr.push(list.getValue('name').replaceAll(',', ' ') + ' | ' + list.getValue('table') + ' | ' + list.getValue('condition') + ' | ' + list.getValue('order') + ' | ' + scriptYesOrNo + ' | ' + list.getValue('user') + ' | ' + list.getValue('group') + ' | ' + list.getUniqueValue() + ' | ' + list.getValue('match_conditions'));
}

listArr = listArr.toString().replaceAll(' | ', ',').split(',');

var x = 9;

names = listArr.filter(function (value, index, arr) {
    return index % x == 0
});
tables = listArr.filter(function (value, index, arr) {
    return index % x == 1
});
conditions = listArr.filter(function (value, index, arr) {
    return index % x == 2
});
order = listArr.filter(function (value, index, arr) {
    return index % x == 3
});
script = listArr.filter(function (value, index, arr) {
    return index % x == 4
});
user = listArr.filter(function (value, index, arr) {
    return index % x == 5
});
group = listArr.filter(function (value, index, arr) {
    return index % x == 6
});
sysID = listArr.filter(function (value, index, arr) {
  	return index % x == 7
});
matchConditions = listArr.filter(function (value, index, arr) {
  	return index % x == 8
});

var condList = conditions;

conditions = conditions.toString().replaceAll('^', '^ ^').split('^ ');
conditions = conditions.toString().split(',');

var nullIndex = [];

for (var n = 0; n < conditions.length; n++) {
    if (conditions[n].includes('null')) {
        nullIndex.push([n + 1]);
    }
}

for (var n = 0; n < nullIndex.length; n++) {
    conditions.splice(nullIndex[n], 0, '^EQ');
}

var cl = 0;
var newTable = [];
var newNames = [];
var newSysID = [];
var newField = [];
var newOrder = [];
var newMatch = [];
var newScript = [];
var newGroup = [];
var newUser = [];

for (var c = 0; c < conditions.length; c++) {
    if ((!conditions[c].includes('^EQ')) && condList[cl].toString().includes(conditions[c])) {
        if (c == '0') {
          newTable.push(tables[cl]);
          newNames.push(names[cl]);
          newSysID.push(sysID[cl]);
          newOrder.push(order[cl]);
          newMatch.push(matchConditions[cl]);
          newScript.push(script[cl]);
          newUser.push(user[cl]);
          newGroup.push(group[cl]);
        } else if (tables[cl] != newTable[cl - 1]) {
          newTable.push(tables[cl]);
          newNames.push(names[cl]);
          newSysID.push(sysID[cl]);
          newOrder.push(order[cl]);
          newMatch.push(matchConditions[cl]);
          newScript.push(script[cl]);
          newUser.push(user[cl]);
          newGroup.push(group[cl]);
        } else {
          newTable.push(newTable[cl - 1]);
          newNames.push(names[cl - 1]);
          newSysID.push(sysID[cl - 1]);
          newOrder.push(order[cl - 1]);
          newMatch.push(matchConditions[cl - 1]);
          newScript.push(script[cl - 1]);
          newUser.push(user[cl - 1]);
          newGroup.push(group[cl - 1]);
        }
    } else {
      newTable.push(' ');
      newNames.push(' ');
      newSysID.push(' ');
      newOrder.push(' ');
      newMatch.push(' ');
      newScript.push(' ');
      newUser.push(' ');
      newGroup.push(' ');
      cl++;
    }
}

var displayField = [];
var displayRecord = [];
var subTable;
var operator = [];
var updatedConditions = [];

for(var a = 0; a < conditions.length; a++){
  var orLine = ((conditions[a].toString().startsWith('^OR')) ? 'True' : 'False');
  var andLine = ((conditions[a].toString().startsWith('^') && conditions[a].toString().charAt('1') != 'O') ? 'True' : 'False');
  var operatorChar;
  var startsWith = 'STARTSWITH';
  var notLike = 'NOT LIKE';
  var is = 'IS';
  var like = 'LIKE';
  var notEqual = '!=';
  var endOp;
  var op;
  if(conditions[a].toString().includes('=') || conditions[a].toString().includes('STARTSWITH') || conditions[a].toString().includes('NOT LIKE') + conditions[a].toString().includes('IS') || conditions[a].toString().includes('LIKE')){
    if(conditions[a].toString().indexOf('!=') != '-1'){
    	operatorChar = conditions[a].toString().indexOf('!=');
      endOp = notEqual.length;
      op = conditions[a].toString().substring(operatorChar, operatorChar + endOp)
      operator.push(conditions[a].toString().substring(operatorChar, operatorChar + endOp));
    }else if(conditions[a].toString().indexOf('STARTSWITH') != '-1'){
      operatorChar = conditions[a].toString().indexOf('STARTSWITH');
    	endOp = startsWith.length;
      op = conditions[a].toString().substring(operatorChar, operatorChar + endOp)
      operator.push(conditions[a].toString().substring(operatorChar, operatorChar + endOp));
    }else if(conditions[a].toString().indexOf('NOT LIKE') != '-1'){
      operatorChar = conditions[a].toString().indexOf('NOT LIKE');
      endOp = notLike.length;
      op = conditions[a].toString().substring(operatorChar, operatorChar + endOp)
      operator.push(conditions[a].toString().substring(operatorChar, operatorChar + endOp));
    }else if(conditions[a].toString().indexOf('IS') != '-1'){
      operatorChar = conditions[a].toString().indexOf('IS');
      endOp = is.length;
      op = conditions[a].toString().substring(operatorChar, operatorChar + endOp)
      operator.push(conditions[a].toString().substring(operatorChar, operatorChar + endOp));
    }else if(conditions[a].toString().indexOf('LIKE') != '-1'){
      operatorChar = conditions[a].toString().indexOf('LIKE');
      endOp = like.length;
      op = conditions[a].toString().substring(operatorChar, operatorChar + endOp)
      operator.push(conditions[a].toString().substring(operatorChar, operatorChar + endOp));
    }else{
      operatorChar = conditions[a].toString().indexOf('=');
      op = conditions[a].toString().charAt(operatorChar);
      operator.push(conditions[a].toString().charAt(operatorChar));
    }
  }else if(conditions[a].toString() == 'null'){
    operator.push('NULL');
  }else{
    operator.push(' ');
  }
  
  //Start getting display values of tables/fields/records
  if(conditions[a].toString() == 'null'){
    displayRecord.push('NULL');
    displayField.push('NULL');
  }
  //IF END QUERY
  else if(conditions[a].toString() == '^EQ'){
    displayField.push(' ');
    displayRecord.push(' ');
  }
	//EQUAL, NO PERIOD, FIRST LINE CONDITION
  else if((!conditions[a].toString().includes('.')) && conditions[a].toString().includes('=') && orLine == 'False' && andLine == 'False'){
    var tableQuery = conditions[a].toString().substring(0, operatorChar);
    var recordQuery = conditions[a].toString().substring(operatorChar + 1);
    //gs.info('EQUALS, NO PERIOD, FIRST LINE | ' + ' | ' + tableQuery + ' | ' + recordQuery + ' | ' + conditions[a] + ' | ' + newTable[a]);
    
    var dictionary = new GlideRecord('sys_dictionary');
  	dictionary.get('element', tableQuery);
    
    if(dictionary.getValue('internal_type') == 'reference'){
      var getRecord = new GlideRecord(dictionary.getValue('reference'));
    	getRecord.get(recordQuery);
      
      if(getRecord.isValid()){
        displayField.push(dictionary.getValue('column_label'));
        displayRecord.push(getRecord.getDisplayValue());
      }else{
        displayField.push(dictionary.getValue('column_label'));
        displayRecord.push(recordQuery);
      }
    }else{
      displayField.push(dictionary.getValue('column_label'));
      displayRecord.push(recordQuery);
    } 
  }
  //EQUALS, NO PERIOD, IS AND || OR LINE
	else if((!conditions[a].toString().includes('.')) && conditions[a].toString().includes('=') && (orLine == 'True' || andLine == 'True')){
    orLine == 'True' ? subTable = '3' : subTable = '1';
    var tableQuery = conditions[a].toString().substring(subTable, operatorChar);
    var recordQuery = conditions[a].toString().substring(operatorChar + 1);    
    //gs.info('EQUALS, NO PERIOD, AND OR | ' + ' | ' + tableQuery + ' | ' + recordQuery + ' | ' + conditions[a]);
    
    var dictionary = new GlideRecord('sys_dictionary');
  	dictionary.get('element', tableQuery);
    
    if(dictionary.getValue('internal_type') == 'reference'){
      var getRecord = new GlideRecord(dictionary.getValue('reference'));
    	getRecord.get(recordQuery);
      
      if(getRecord.isValid()){
        displayField.push(dictionary.getValue('column_label'));
        displayRecord.push(getRecord.getDisplayValue());
      }else{
        displayField.push(dictionary.getValue('column_label'));
        displayRecord.push(recordQuery);
      }
    }else{
      displayField.push(dictionary.getValue('column_label'));
      displayRecord.push(recordQuery);
    } 
  }
  //NO PERIOD, NO EQUAL, FIRST LINE
  else if((!conditions[a].toString().includes('.')) && !conditions[a].toString().includes('=') && (orLine == 'False' && andLine == 'False')){
    var fieldQuery = conditions[a].toString().substring(0, operatorChar);
    var recordQuery = conditions[a].toString().substring(operatorChar + 1);
    //gs.info('NO PERIOD,NO EQUALS, FIRST LINE | ' + ' | ' + fieldQuery + ' | ' + recordQuery + ' | ' + conditions[a]);
    
    var getTable = new GlideRecord('sys_db_object');
    getTable.get('name', newTable[a]);
    
    if(getTable.getValue('name') != null){
    }else{
      var getFormRecord = new GlideRecord(getTable.getValue('name'));
      getFormRecord.addActiveQuery();
      getFormRecord.orderByDesc('sys_created_on');
      getFormRecord.setLimit(1);
      getFormRecord.query();
      
      if(getFormRecord.next()){
        var dictionary = new GlideRecord('sys_dictionary');
        dictionary.get('element', fieldQuery);

        displayField.push(dictionary.getValue('column_label'));
        displayRecord.push(' ');
      }   
    }  
  }
  //NO PERIOD, NO EQUAL, IS AND || OR LINE
  else if((!conditions[a].toString().includes('.')) && !conditions[a].toString().includes('=') && (orLine == 'True' || andLine == 'True')){
    orLine == 'True' ? subTable = '3' : subTable = '1';
    var fieldQuery = conditions[a].toString().substring(subTable, operatorChar);
    var recordQuery = conditions[a].toString().substring(operatorChar + endOp);
    //gs.info('NO PERIOD,NO EQUALS, AND OR | ' + fieldQuery + ' | ' + recordQuery + ' | ' + conditions[a]);
    
    var dictionary = new GlideRecord('sys_dictionary');
    dictionary.get('element', fieldQuery);
    
    if(dictionary.getValue('internal_type') == 'reference' && recordQuery !== 'EMPTY'){
      var getRecord = new GlideRecord(dictionary.getValue('reference'));
      getRecord.get(fieldQuery, recordQuery);
      
      if(getRecord.isValid() && recordQuery == getRecord.getDisplayValue()){
      	displayField.push(dictionary.getValue('column_label'));
      	displayRecord.push(getRecord.getDisplayValue());
      }else{
        displayField.push(dictionary.getValue('column_label'));
        displayRecord.push(recordQuery);
      }
    }else{
      displayField.push(dictionary.getValue('column_label'));
      displayRecord.push(recordQuery);
    }
     
  }
  //IF ONE PERIOD, EQUALS, FIRST LINE
  else if(conditions[a].toString().includes('.') && (conditions[a].toString().lastIndexOf('.') == conditions[a].toString().indexOf('.')) && conditions[a].toString().includes('=') && (orLine == 'False' && andLine == 'False')){
    var periodIndex = conditions[a].toString().indexOf('.');
    var tableQuery = conditions[a].toString().substring(0, periodIndex);
    var fieldQuery = conditions[a].toString().substring(periodIndex + 1, operatorChar);
    var recordQuery = conditions[a].toString().substring(operatorChar + 1);
    //gs.info('ONE PERIOD, EQUALS, FIRST LINE | ' + tableQuery + ' | ' + fieldQuery + ' | ' + recordQuery + ' | ' + conditions[a] + ' | ' + newNames[a]);
    
    var getTable = new GlideRecord('sys_db_object');
    getTable.get('name', tableQuery);
    
    if(getTable.getValue('name') != null){
      var dictionary = new GlideRecord('sys_dictionary');
      dictionary.get('element', fieldQuery);

      displayField.push(dictionary.getValue('column_label'));
      
      if(dictionary.getValue('internal_type') == 'reference'){
        var getRecord = new GlideRecord(getTable.getValue('name'));
        getRecord.get(fieldQuery, recordQuery);
        
        displayRecord.push(getRecord.getDisplayValue());
      }else if(dictionary.getValue('internal_type') == 'sys_class_name'){
        var getChoiceValue = new GlideRecord('sys_choice');
        getChoiceValue.addActiveQuery();
        getChoiceValue.addQuery('value', recordQuery);
        getChoiceValue.orderBy('sequence');
        getChoiceValue.setLimit(1);
        getChoiceValue.query();
        
        if(getChoiceValue.next()){
          displayRecord.push(getChoiceValue.getValue('label') + ' ' + recordQuery);
        }
      } 
    }else{
      var getFormRecord = new GlideRecord(newTable[a]);
      getFormRecord.addActiveQuery();
      getFormRecord.orderByDesc('sys_created_on');
      getFormRecord.setLimit(1);
      getFormRecord.query();
      
      if(getFormRecord.next()){
        var dictionary = new GlideRecord('sys_dictionary');
        dictionary.get('element', fieldQuery);

        displayField.push(dictionary.getValue('column_label'));
        displayRecord.push(' ');
      } 
    }
  }
  //IF ONE PERIOD, EQUALS, IS AND || OR LINE
  else if(conditions[a].toString().includes('.') && (conditions[a].toString().lastIndexOf('.') == conditions[a].toString().indexOf('.')) && conditions[a].toString().includes('=') && (orLine == 'True' || andLine == 'True')){
    orLine == 'True' ? subTable = '3' : subTable = '1';
    var periodIndex = conditions[a].toString().indexOf('.');
    var tableQuery = conditions[a].toString().substring(subTable, periodIndex);
    var fieldQuery = conditions[a].toString().substring(periodIndex + 1, operatorChar);
    var recordQuery = conditions[a].toString().substring(operatorChar + 1);
    //gs.info('ONE PERIOD, EQUALS, AND OR | ' + tableQuery + ' | ' + fieldQuery + ' | ' + recordQuery + ' | ' + conditions[a] + ' | ' + newTable[a]);
    
    var getTable = new GlideRecord('sys_db_object');
    getTable.get('name', tableQuery);
    
    if(getTable.getValue('name') != null){
      var dictionary = new GlideRecord('sys_dictionary');
      dictionary.get('element', fieldQuery);

      displayField.push(dictionary.getValue('column_label'));
      
      if(dictionary.getValue('internal_type') == 'reference'){
        var getRecord = new GlideRecord(getTable.getValue('name'));
        getRecord.get(fieldQuery, recordQuery);
        
        displayRecord.push(getRecord.getDisplayValue());
      }else{
        var getChoiceValue = new GlideRecord('sys_choice');
        getChoiceValue.addActiveQuery();
        getChoiceValue.addQuery('value', recordQuery);
        getChoiceValue.orderBy('sequence');
        getChoiceValue.setLimit(1);
        getChoiceValue.query();
        
        if(getChoiceValue.next()){
          displayRecord.push(getChoiceValue.getValue('label') + ' ' + recordQuery);
        }
      }
    }else{
      var getFormRecord = new GlideRecord(newTable[a]);
      getFormRecord.addActiveQuery();
      getFormRecord.orderByDesc('sys_created_on');
      getFormRecord.setLimit(1);
      getFormRecord.query();
      
      if(getFormRecord.next()){
        var dictionary = new GlideRecord('sys_dictionary');
        dictionary.get('element', fieldQuery);

        displayField.push(dictionary.getValue('column_label'));
        displayRecord.push(' ');
      } 
    } 
  }
  //IF ONE PERIOD, NO EQUALS, FIRST LINE
  else if(conditions[a].toString().includes('.') && (conditions[a].toString().lastIndexOf('.') == conditions[a].toString().indexOf('.')) && !conditions[a].toString().includes('=') && (orLine == 'False' || andLine == 'False')){
    var periodIndex = conditions[a].toString().indexOf('.');
    var tableQuery = conditions[a].toString().substring(0, periodIndex);
    var fieldQuery = conditions[a].toString().substring(periodIndex + 1, operatorChar);
    var recordQuery = conditions[a].toString().substring(operatorChar + 1);
    
    var getTable = new GlideRecord('sys_db_object');
    getTable.get('name', tableQuery);
    
    if(getTable.getValue('name') != null){
      var getRecord = new GlideRecord(getTable.getValue('name'));
      getRecord.get(fieldQuery, recordQuery);
      
      var dictionary = new GlideRecord('sys_dictionary');
      dictionary.get('element', fieldQuery);

      displayField.push(dictionary.getValue('column_label'));
      displayRecord.push(getRecord.getDisplayValue());
    }else{
      var getFormRecord = new GlideRecord(newTable[a]);
      getFormRecord.addActiveQuery();
      getFormRecord.orderByDesc('sys_created_on');
      getFormRecord.setLimit(1);
      getFormRecord.query();
      
      if(getFormRecord.next()){
        var dictionary = new GlideRecord('sys_dictionary');
        dictionary.get('element', fieldQuery);

        displayField.push(dictionary.getValue('column_label'));
        displayRecord.push(' ');
      } 
    }
  }
  //IF ONE PERIOD, NO EQUALS, IS AND || OR LINE
  else if(conditions[a].toString().includes('.') && (conditions[a].toString().lastIndexOf('.') == conditions[a].toString().indexOf('.')) && !conditions[a].toString().includes('=') && (orLine == 'True' || andLine == 'True')){
    orLine == 'True' ? subTable = '3' : subTable = '1';
    var periodIndex = conditions[a].toString().indexOf('.');
    var tableQuery = conditions[a].toString().substring(subTable, periodIndex);
    var fieldQuery = conditions[a].toString().substring(periodIndex + 1, operatorChar);
    var recordQuery = conditions[a].toString().substring(operatorChar + 1);
    
    var getTable = new GlideRecord('sys_db_object');
    getTable.get('name', tableQuery);
    
    if(getTable.getValue('name') != null){
      var getRecord = new GlideRecord(getTable.getValue('name'));
      getRecord.get(fieldQuery, recordQuery);
      
      if(getRecord){
      	displayRecord.push(getRecord.getDisplayValue());
      }
      var dictionary = new GlideRecord('sys_dictionary');
      dictionary.get('element', fieldQuery);

      displayField.push(dictionary.getValue('column_label'));
      
    }else{
      var getFormRecord = new GlideRecord(getTable.getValue('name'));
      getFormRecord.addActiveQuery();
      getFormRecord.orderByDesc('sys_created_on');
      getFormRecord.setLimit(1);
      getFormRecord.query();
      
      if(getFormRecord.next()){
        var dictionary = new GlideRecord('sys_dictionary');
        dictionary.get('element', fieldQuery);

        displayField.push(dictionary.getValue('column_label'));
        displayRecord.push(' ');
      }
    } 
  }
  //MORE THAN ONE PERIOD, EQUALS, FIRST LINE
  /*else if(conditions[a].toString().includes('.') && conditions[a].toString().includes('=') && (orLine == 'False' || andLine == 'False')){
    var firstPeriodIndex = conditions[a].toString().indexOf('.');
    var tableQuery = conditions[a].toString().substring(0, periodIndex);
    var encodedQuery = conditions[a].toString().substring(periodIndex + 1, operatorChar);
    var recordQuery = conditions[a].toString().substring(operatorChar + 1);
    gs.info('MORE THAN ONE, EQUALS, FIRST LINE | ' + conditions[a]);
    
    
  }
  //MORE THAN ONE PERIOD, EQUALS, AND || OR LINE
  else if(conditions[a].toString().includes('.') && conditions[a].toString().includes('=') && (orLine == 'True' || andLine == 'True')){
    orLine == 'True' ? subTable = '3' : subTable = '1';
    var firstPeriodIndex = conditions[a].toString().indexOf('.');
    var tableQuery = conditions[a].toString().substring(subTable, periodIndex);
    var encodedQuery = conditions[a].toString().substring(periodIndex + 1, operatorChar);
    var recordQuery = conditions[a].toString().substring(operatorChar + 1);
    gs.info('MORE THAN ONE, EQUALS, AND OR | ' + conditions[a]);
    
  }
  //MORE THAN ONE PERIOD, NO EQUALS, FIRST LINE
  else if(conditions[a].toString().includes('.') && !conditions[a].toString().includes('=') && (orLine == 'False' && andLine == 'False')){
    var firstPeriodIndex = conditions[a].toString().indexOf('.');
    var tableQuery = conditions[a].toString().substring(0, firstPeriodIndex);
    var encodedQuery = conditions[a].toString().substring(firstPeriodIndex + 1);
    //gs.info('MORE THAN ONE, NO EQUALS, FIRST LINE | ' + conditions[a] + ' | ' + tableQuery + ' | ' +encodedQuery);
    
    var getTable = new GlideRecord('sys_db_object');
    getTable.get('name', tableQuery);
    
    if(getTable.getValue('name') != null){
      displayField.push(getTable.getDisplayValue());
      displayRecord.push(encodedQuery);
    }else{
        var dictionary = new GlideRecord('sys_dictionary');
        dictionary.get('element', tableQuery);

        displayField.push(dictionary.getValue('column_label'));
        displayRecord.push(encodedQuery);
    }
  }*/
  //MORE THAN ONE PERIOS, NO EQUALS, AND || OR LINE
  else if(conditions[a].toString().includes('.') && !conditions[a].toString().includes('=') && (orLine == 'True' || andLine == 'True')){
    orLine == 'True' ? subTable = '3' : subTable = '1';
    var firstPeriodIndex = conditions[a].toString().indexOf('.');
    var tableQuery = conditions[a].toString().substring(subTable, firstPeriodIndex);
    var encodedQuery = conditions[a].toString().substring(firstPeriodIndex + 1);
    //gs.info('MORE THAN ONE, NO EQUALS, AND OR | ' + conditions[a] + ' | ' + tableQuery + ' | ' +encodedQuery);
    
    var getTable = new GlideRecord('sys_db_object');
    getTable.get('name', tableQuery);
    
    if(getTable.getValue('name') != null){
      displayField.push(getTable.getDisplayValue());
      displayRecord.push(encodedQuery);
    }else{
        var dictionary = new GlideRecord('sys_dictionary');
        dictionary.get('element', tableQuery);

        displayField.push(dictionary.getValue('column_label'));
        displayRecord.push(encodedQuery);
    }
  }
  //ALL ELSE
  /*else{
    gs.error('ELSE | ' + conditions[a]);
  }*/
}

//Get display values for table, group, user
for(var t = 0; t < newTable.length; t++){
  var displayTable = new GlideRecord('sys_db_object');
  displayTable.get('name', newTable[t]);
  
  if(displayTable){
    newTable.splice([t], 1, displayTable.getDisplayValue());
  }
  
  var displayUser = new GlideRecord('sys_user');
  displayUser.get(newUser[t]);
  
  if(displayUser){
    newUser.splice([t], 1, displayUser.getValue('name'));    
  }
  
  var displayGroup = new GlideRecord('sys_user_group');
  displayGroup.get(newGroup[t]);
  
  if(displayGroup){
    newGroup.splice([t], 1, displayGroup.getValue('name'));
  }

}

for(var m = 0; m < displayField.length; m++){
  updatedConditions.push(displayField[m].toString() + ' ' + operator[m].toString() + ' ' + displayRecord[m].toString().replaceAll(',', '|'));
}

newNames = newNames.toString().split(',').join('\n');
newTable = newTable.toString().split(',').join('\n');
conditions = conditions.toString().replaceAll('^EQ', '').split(',').join('\n');
newOrder = newOrder.toString().split(',').join('\n');
newMatch = newMatch.toString().split(',').join('\n');
newScript = newScript.toString().split(',').join('\n');
newUser = newUser.toString().split(',').join('\n');
newGroup = newGroup.toString().split(',').join('\n');
newSysID = newSysID.toString().split(',').join('\n');
updatedConditions = updatedConditions.toString().split(',').join('\n').replaceAll('|',',');

gs.info(newNames);
gs.info(newTable);
gs.info(newOrder);
gs.info(newMatch);
gs.info(newUser);
gs.info(newGroup);
gs.info(newScript);
gs.info(newSysID);
gs.info(updatedConditions);
