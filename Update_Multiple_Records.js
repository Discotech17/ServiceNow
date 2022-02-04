(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	//var choiceValue = current.getDisplayValue('category');
	
	var updateAll = new GlideRecord('incident');
	updateAll.addQuery('caller_id', current.caller_id);
	updateAll.addNullQuery('description');
	updateAll.setLimit(5);
	updateAll.query();
	
	while (updateAll.next()) {
		updateAll.setValue('category', 'database');
		updateAll.update();
	}

})(current, previous);
