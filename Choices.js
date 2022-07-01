printChoiceOptionLabel: function(table, onlyChoiceList) {
        var choiceList = [];
        if (gs.nil(onlyChoiceList)) {
            this._printChoiceOptionLabel(table, choiceList);
        } else {
            this.printTypesFor(table, onlyChoiceList);
        }
    },
    _printChoiceOptionLabel: function(table, list) {
	//Set Headers for Choices
        var choiceList = ['TABLE | DISPLAY ELEMENT | ELEMENT | LABEL | VALUE'];
        //Query table choices and sort by element then label
        var choice = new GlideRecord('sys_choice');
        choice.addEncodedQuery('nameIN' + table + ',' + table + '_task,task^language=en^inactive=false^value!=NULL^ORlabel!=NULL');
        choice.orderBy('element');
        choice.orderBy('label');
        choice.orderBy('name');
        choice.query();

        var choiceNames = [];
        var fields = {};
        var x = 1;

        while (choice.next()) {
            //Add in field Display Value object to return correct Display Value for custom fields.
            var length = choiceList.length;
            var choiceName = choice.getValue('element');
            var field = new GlideRecord('sys_dictionary');
            field.get('element', choiceName);
            fields[choiceName] = (field.getValue('column_label') == null) ? 'NOVALUE' : field.getValue('column_label');

            if (choiceList.toString().includes(choice.getValue('element') + ' | ' + choice.getValue('label').replaceAll(',', ';') + ' | ' + choice.getValue('value').replaceAll(',', ';'))) {
                choiceList.splice((length - x), (length - x), choice.getValue('name') + ' | ' + fields[choiceName].toString() + ' | ' + choice.getValue('element') + ' | ' + choice.getValue('label').replaceAll(',', ';') + ' | ' + choice.getValue('value').replaceAll(',', ';'));
            } else {
                choiceList.push(choice.getValue('name') + ' | ' + fields[choiceName].toString() + ' | ' + choice.getValue('element') + ' | ' + choice.getValue('label').replaceAll(',', ';') + ' | ' + choice.getValue('value').replaceAll(',', ';'));
            }
		}

        //Create arrays to remove duplicates in case we need to see the duplications.
        var choices = [];
        var duplicate = [];

        //Remove the duplicates to the duplicate array for safe keeping.
        for (var i = 0; i < choiceList.length; i++) {
            if (choices.indexOf(choiceList[i]) == '-1') {
                choices.push(choiceList[i]);
            } else {
                duplicate.push(choiceList[i]);
            }
        }

        //Remove all our | dividers
        //Set our arrays to return and size for only getting specific fields
        choices = choices.toString().replaceAll(' | ', ',').split(',');
        choiceList = choiceList.toString().replaceAll(' | ', ',').split(',');
        var tables = [];
        var elementDisplay = [];
        var elements = [];
        var labels = [];
        var values = [];
        var size = 4;

        //Pushing to array, and if it's a new element then it'll add a break for better viewing.
        for (var i = 0; i < choices.length; i++, i += size) {
            if (elements.length > 1 && (elements.lastIndexOf(choices[i + 2]) == '-1')) {
                tables.push(' ');
                tables.push(choices[i]);
                elementDisplay.push(' ');
                elementDisplay.push(choices[i + 1]);
                elements.push(' ');
                elements.push(choices[i + 2]);
                labels.push(' ');
                labels.push(choices[i + 3]);
                values.push(' ');
                values.push(choices[i + 4]);
            } else if (choices[i - 1] == null) {
                tables.push(choices[i]);
                elementDisplay.push(choices[i + 1]);
                elements.push(choices[i + 2]);
                labels.push(choices[i + 3]);
                values.push(choices[i + 4]);
            } else {
                tables.push(choices[i]);
                elementDisplay.push(choices[i + 1]);
                elements.push(choices[i + 2]);
                labels.push(choices[i + 3]);
                values.push(choices[i + 4]);
            }
        }

        //string, split, join with new line then return.
        //choices = choices.toString().split(',').join('\n');
        //tables = tables.toString().split(',').join('\n');
        elementDisplay = elementDisplay.toString().split(',').join('\n');
        elements = elements.toString().split(',').join('\n');
        labels = labels.toString().split(',').join('\n');
        values = values.toString().split(',').join('\n');
        //duplicate = duplicate.toString().split(',').join('\n');
        //gs.info('CHOICES ' + choices + '\n');
        //gs.info('TABLES ' + tables + '\n');
        gs.info('DISPLAY ELEMENT ' + elementDisplay + '\n');
        gs.info('ELEMENTS ' + elements + '\n');
        gs.info('LABELS ' + labels + '\n' + '\n' + '\n');
        gs.info('VALUES ' + values);
    },
