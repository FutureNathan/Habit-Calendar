$('#save_keyboard')
	.keyboard({
		layout: 'international',
		css: {
			input: 'form-control input-sm dark',
			container: 'center-block well',
			buttonDefault: 'btn btn-default',
			buttonHover: 'btn-primary',
			buttonAction: 'active',
			buttonDisabled: 'disabled'
		},usePreview: false,
		acceptValid: true,
		//autoAccept: true,
        validate: function (kb, val) {
            return val.length > 3;
        }
	})
	.addTyping({
        showTyping: true,
        delay: 250
    });
   
$('#rename_input')
	.keyboard({
		layout: 'international',
		css: {
			input: 'form-control input-sm dark',
			container: 'center-block well',
			buttonDefault: 'btn btn-default',
			buttonHover: 'btn-primary',
			buttonAction: 'active',
			buttonDisabled: 'disabled'
		},usePreview: false,
		acceptValid: true,
		//autoAccept: true,
		validate: function (kb, val) {
			return val.length > 3;
		}
	})
	.addTyping({
		showTyping: true,
		delay: 250
	});

function setInputFilter(textbox, inputFilter) {
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
		textbox.addEventListener(event, function() {
		if (inputFilter(this.value)) {
			this.oldValue = this.value;
			this.oldSelectionStart = this.selectionStart;
			this.oldSelectionEnd = this.selectionEnd;
		} else if (this.hasOwnProperty("oldValue")) {
			this.value = this.oldValue;
			this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
		} else {
			this.value = "";
		}
		});
	});
	}

setInputFilter(document.getElementById("save_keyboard"), function(value) {
	return /^[0-9a-zA-Z ]+$/i.test(value); });

setInputFilter(document.getElementById("rename_input"), function(value) {
	return /^[0-9a-zA-Z ]+$/i.test(value); });