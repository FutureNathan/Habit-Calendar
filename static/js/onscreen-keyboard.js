$('#keyboard')
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
		autoAccept: true,
        validate: function (kb, val) {
            return val.length > 3;
        }
	})
	.addTyping({
        showTyping: true,
        delay: 250
    });
   
