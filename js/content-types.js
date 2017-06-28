(function() {

	contentTypes = {
		json: {
			header: 'application/json',
			parseIn: function(input) {
				return JSON.parse(input);
			},
			parseOut: function(input) {
				return JSON.stringify(input);
			}
		}
	};

})();
