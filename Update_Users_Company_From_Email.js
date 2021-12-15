(function executeRule(current, previous /*null when async*/) {

  // Add your code here
  var aspenUser = new GlideRecord('sys_user');
  aspenUser.addQuery('email', current.user); //Check the user table's email fields against the current user field on the email table.
  aspenUser.query();

  while (aspenUser.next()) {
    aspenUser.company = '86c1f3193790200044e0bfc8bcbe5d95'; // Set the company
    aspenUser.managed_domain = true; // Check the managed domain box, need this to set domain
    aspenUser.sys_domain = 'c90d4b084a362312013398f051272c0d'; // Set the domain
    aspenUser.update(); // Need this to update the record.
  }

})(current, previous);

/* Business Rule to update company and domain.
Assigned to the email tab, to pull a user(email) and search the user table for said email.
