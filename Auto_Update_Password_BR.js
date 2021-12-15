(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	var newPass = current.description; //pull description and make it as a password
	//gs.info(newPass.getValue());
	
	var callerId = current.caller_id.getRefRecord(); //pull sys_user record from the caller_id field
	if(callerId.isValidRecord()) { //is this valid
		callerId.user_password.setDisplayValue(newPass); //update password
		callerId.update();
		//gs.info(callerId.getValue('name'));
	}

})(current, previous);

//incident table
//before insert
//filter condition based on the short description contain