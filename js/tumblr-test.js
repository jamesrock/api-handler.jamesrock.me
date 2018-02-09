(function() {

	var
	tumblrBlogAPI = new APIHandler('http://api.tumblr.com/v2/blog'),
	tumblrOAuthAPI = new APIHandler('https://www.tumblr.com/oauth');

	tumblrBlogAPI.addEndpoint('getInfo', 'get', '/{blog-identifier}/info?api_key={key}');
	tumblrBlogAPI.addEndpoint('getPosts', 'get', '/{blog-identifier}/posts[/type]?api_key={key}&[optional-params=]');
	tumblrBlogAPI.addEndpoint('createPost', 'post', '/{blog-identifier}/post');
	tumblrBlogAPI.addEndpoint('editPost', 'post', '/{blog-identifier}/post/edit');

	tumblrOAuthAPI.addEndpoint('requestToken', 'post', '/request_token');
	tumblrOAuthAPI.addEndpoint('authorise', 'post', '/authorize');
	tumblrOAuthAPI.addEndpoint('accessToken', 'post', '/access_token');

	tumblrBlogAPI.call('getPosts', {
		success: function(response) {

			console.log(response);

		},
		params: {
			'blog-identifier': 'bob',
			'key': 'key'
		}
	});

})();
