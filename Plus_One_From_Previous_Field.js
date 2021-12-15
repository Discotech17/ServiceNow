(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
	var prevVendor = new GlideRecord('incident');
	prevVendor.addQuery('company', current.company);
	prevVendor.addNotNullQuery('u_nwbtest');
	prevVendor.orderByDesc('sys_created_on');
	prevVendor.setLimit(1);
	prevVendor.query();
		
	var vendor = current.company.getRefRecord();
	
	while(prevVendor.next()) {
		current.u_nwbtest = prevVendor.u_nwbtest;
		current.u_nwbtest++;
		current.u_nwbtotal.setDisplayValue(vendor.u_prefix + '-' + current.u_nwbtest).ToString();
	}
	
})(current, previous);

//incident table
//before insert
//query the current.company, the custom field being not empty, and the most recent sys_created_on, with a limit of 1.
//while loop (could be if loop), set current.u_nwbtest to prevVendor that we queried.  Then ++ current.u_nwbtest.