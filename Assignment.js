var list = new GlideRecord('sysrule_assignment');
list.addActiveQuery();
list.orderBy('table');
list.orderBy('name');
//list.setLimit(5);
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


while (list.next()) {
    var scriptYesOrNo = ((list.getValue('script') == null) ? 'NOVALUE' : 'YES');
    listArr.push(list.getValue('name') + ' | ' + list.getValue('table') + ' | ' + list.getValue('condition') + ' | ' + list.getValue('order') + ' | ' + scriptYesOrNo + ' | ' + list.getValue('user') + ' | ' + list.getValue('group'));
}

listArr = listArr.toString().replaceAll(' | ', ',').split(',');

var x = 7;

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

for (var c = 0; c < conditions.length; c++) {
    if ((!conditions[c].includes('^EQ')) && condList[cl].toString().includes(conditions[c])) {
        if (c == '0') {
            newTable.push(tables[cl]);
            newNames.push(names[cl]);
        } else if (tables[cl] != newTable[cl - 1]) {
            newTable.push(tables[cl]);
            newNames.push(names[cl]);
        } else {
            newTable.push(newTable[cl - 1]);
            newNames.push(names[cl - 1]);
        }
    } else {
        newTable.push(' ');
        newNames.push(' ');
        cl++;
    }
}

newNames = newNames.toString().split(',').join('\n');
newTable = newTable.toString().split(',').join('\n');
conditions = conditions.toString().replaceAll('^EQ', '').split(',').join('\n');
order = order.toString().split(',').join('\n');
script = script.toString().split(',').join('\n');
user = user.toString().split(',').join('\n');
group = group.toString().split(',').join('\n');

gs.info(newNames);
gs.info(newTable);
gs.info(conditions);
gs.info(order);
gs.info(script);
gs.info(user);
gs.info(group);

//
//SPLIT CONDITION BY TABLE, FIELD, RECORD
//GLIDE RECORD TABLE
//GET(FIELD, RECORD)
//ONLY WORKS FOR table.field=record FORMAT
var record = new GlideRecord('sysrule_assignment');
record.get('ecbf5738675432004792adab9485ef36');

var condition = record.getValue('condition');
condition = condition.replaceAll('^', '^ ^').split('^ ');
gs.info(condition);

var num = 0;
var conditionField = [];
var startSub = [];
var endSub = [];

while (num < condition.length) {
    startSub.push(condition[num].toString().indexOf('.') + 1);
    endSub.push(condition[num].toString().indexOf('='));
    condition[num] = condition[num].toString().substring(startSub[num], endSub[num]);
    conditionField.push(condition);
    num = 1;
}
conditionField

var fields = [];

var getFields = new GlideRecord(record.getValue('table'));
getFields.addQuery('active', 'true');
getFields.orderByDesc('sys_created_on');
getFields.setLimit(1);
getFields.query();

if (getFields.next()) {
    for (var key in getFields) {
        fields.push(key);
    }
}

var condField = [];

for (var i = 0; i < fields.length; i++) {
    if (condition.toString().includes(fields[i])) {
        condField.push(fields[i]);
    }
}

var refTables = [];
for (var i = 0; i < condField.length; i++) {
    var checkTable = new GlideRecord('sys_db_object');
    checkTable.addQuery('name', condField[i]);
    checkTable.query();

    if (checkTable.next()) {
        var getDisplayValue = new GlideRecord(checkTable.getValue('name'));
        getDisplayValue.addQuery('active', 'true');
        getDisplayValue.addQuery('sys_class_name', 'cmdb_ci_netgear');
        getDisplayValue.query();

        if (getDisplayValue.next()) {
            refTables.push(getDisplayValue.getDisplayValue('sys_class_name'));
        }
    }
}

refTables;
