(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    var cal = 0;

    var gr = new GlideRecord('sn_grc_osumc_coi_op_data');
    gr.addNotNullQuery('u_op_npi');
    gr.query();

    while (gr.next()) {
        if (gr.u_op_npi == current.u_op_npi) {
            cal += parseFloat(gr.u_op_total_payment);
        }
    }

    var gr2 = new GlideRecord('sn_grc_osumc_coi_op_data');
    gr2.addNotNullQuery('u_op_npi');
    gr2.query();

    while (gr2.next()) {
        if (gr2.u_op_npi == current.u_op_npi) {
            gr2.u_coi_combined_op_amount = cal.toFixed(2);
            gr2.update();
        }
    }

})(current, previous);