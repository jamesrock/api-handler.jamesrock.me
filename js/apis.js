(function() {

	apis = {
		getTwitterPosts: {
			name: 'getTwitterPosts',
			domain: 'twitter',
			method: 'get',
			url: '{domain}/posts'
		},
		createTwitterPost: {
			name: 'createTwitterPost',
			domain: 'twitter',
			method: 'post',
			url: '{domain}/posts/create'
		},
		getFacebookPosts: {
			name: 'getFacebookPosts',
			domain: 'facebook',
			method: 'get',
			url: '{domain}/posts'
		},
		createFacebookPost: {
			name: 'createFacebookPost',
			domain: 'facebook',
			method: 'post',
			url: '{domain}/posts/create'
		}
	};

})();
