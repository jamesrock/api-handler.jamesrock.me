(function() {

	var
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
	},
	APIHandler = function(url) {

		this.url = url;
		this.apis = {};

	};

	APIHandler.prototype.call = function(apiName, options, sync) {

		var
		xhr = new XMLHttpRequest(),
		api = this.apis[apiName],
		path = api.path,
		contentType = contentTypes.json,
		callback = 'error',
		key,
		url = this.url;

		if(options.params) {
			path = ROCK.STRING.replacer(path, options.params);
		};

		url += path;

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
				options[callback](contentType.parseIn(xhr.response), xhr);
			};
		};

		return xhr;

	};
	APIHandler.prototype.addEndpoint = function(name, method, path) {

		this.apis[name] = {
			method: method,
			path: path
		};

		return this;

	};

	window.APIHandler = APIHandler;

})();
