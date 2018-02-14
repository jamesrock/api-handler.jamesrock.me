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
		this.endpoints = {};
		this.headers = {};
		this.params = {};

	};

	APIHandler.prototype.call = function(endpoint, options, sync) {

		var
		xhr = new XMLHttpRequest(),
		api = this.endpoints[endpoint],
		path = api.path,
		contentType = contentTypes.json,
		callback = 'error',
		key,
		url = this.url;

		path = ROCK.STRING.replacer(path, this.params);

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

		this.endpoints[name] = {
			method: method,
			path: path
		};

		return this;

	};
	APIHandler.prototype.addHeader = function(name, value) {

		this.headers[name] = value;

		return this;

	};
	APIHandler.prototype.addParam = function(name, value) {

		this.params[name] = value;

		return this;

	};

	window.APIHandler = APIHandler;

})();
