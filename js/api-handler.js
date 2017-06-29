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
	};

	var
	APIHandler = function(domain) {

		this.domain = domain;
		this.apis = {};

	};
	APIHandler.prototype.call = function(apiName, options, sync) {

		var
		xhr = new XMLHttpRequest(),
		api = this.apis[apiName],
		url = api.url,
		contentType = contentTypes.json,
		callback = 'error',
		key;

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

	var
	APIHandlerService = function(apiHandler, name, method, url) {

		this.name = name;
		this.method = method;
		this.url = url;

		apiHandler.services[name] = this;

	};

	var
	tumblrBlogAPI = new APIHandler('http://api.tumblr.com/v2/blog'),
	tumblrOAuthAPI = new APIHandler('https://www.tumblr.com/oauth');

	new APIHandlerService(tumblrAPI, 'getInfo', 'get', '/{blog-identifier}/info?api_key={key}');
	new APIHandlerService(tumblrAPI, 'getPosts', 'get', '/{blog-identifier}/posts[/type]?api_key={key}&[optional-params=]');
	new APIHandlerService(tumblrAPI, 'createPost', 'post', '/{blog-identifier}/post');
	new APIHandlerService(tumblrAPI, 'editPost', 'post', '/{blog-identifier}/post/edit');

	new APIHandlerService(tumblrOAuthAPI, 'requestToken', 'post', '/request_token');
	new APIHandlerService(tumblrOAuthAPI, 'authorise', 'post', '/authorize');
	new APIHandlerService(tumblrOAuthAPI, 'accessToken', 'post', '/access_token');

	tumblrAPI.call('getPosts', {
		success: function(response) {

			console.log(response);

		},
		params: {
			'blog-identifier': 'bob',
			'key': 'key'
		}
	});

})();
