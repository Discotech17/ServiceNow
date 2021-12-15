 (function runAction( /*GlideRecord*/ current, /*GlideRecord*/ event, /*EmailWrapper*/ email, /*ScopedEmailLogger*/ logger, /*EmailClassifier*/ classifier) {

    var newUser = new GlideRecord('sys_user');
    newUser.initialize();
    newUser.user_name = email.origemail;
    newUser.email = email.origemail;
    newUser.company = 'ecfd7ee387ce7410bf9fdd373cbb35fd';
    
  //  newUser.domain = '';
    if (newUser.email) {
        user.addQuery('email', current.email.toString());
        user.addActiveQuery();
        user.query();
        if (user.next() && user.sys_id != current.sys_id) {
            current.setAbortAction(true);
        } else {
            newUser.insert();
        }
    }
})(current, event, email, logger, classifier);