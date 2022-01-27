(function executeRule(current, previous /*null when async*/) {

	// Create query for the first field
	var dupEmail = new GlideRecord('sys_user');
	dupEmail.addQuery('email', current.email);
	dupEmail.query();
	
	// Create query for the second field
	var dupTitle = new GlideRecord('sys_user');
	dupTitle.addQuery('title', current.title);
	dupTitle.query();
	
	// Check to see if the first field has duplicates
	if(dupEmail.next()) {
		gs.addErrorMessage('Email is a duplicate');
		current.setAbortAction(true);
	}
  
	// Check to see if the second field has duplicates
	if(dupTitle.next()) {
		gs.addErrorMessage('Title is duplicate');
		current.setAbortAction(true);
	}

})(current, previous);

// On sys_user table as a business rule.
// Before insert
