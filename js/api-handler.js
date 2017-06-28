(function() {

	apiHandler = function(apiName, options, sync) {

		var
		xhr = new XMLHttpRequest(),
		api = apis[apiName],
		url = api.url,
		contentType = contentTypes.json,
		callback = 'error',
		key;

		// replace {domain} in url

		if(options.params) {

			for(key in options.params) {
				xhr.setRequestHeader(key, options.params[key]);
			};

		};

		xhr.open(api.method, url, !sync);

		if(options.type) {
			contentType = contentTypes[options.type];
		};

		xhr.setRequestHeader('content-type', contentType.header);

		if(options.headers) {

			for(key in options.headers) {
				xhr.setRequestHeader(key, options.headers[key]);
			};

		};

		if(options.data) {
			xhr.send(contentType.parseOut(options.data));
		}
		else {
			xhr.send();
		};

		xhr.onreadystatechange = function() {

			if(xhr.readyState===4) {
				if(xhr.status===200||xhr.status===201) {
					callback = 'success';
				};
				options[callback](conentType.parseIn(response), xhr);
			};

		};

		return xhr;

	};

})();
