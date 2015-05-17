!(function(root, $, factory)	{
	root.LOCYAHOOAPI = root.LOCYAHOOAPI || factory(root, $);

	$(document).ready(function() {
		$('#submit').on('click', function(e)	{
			return LOCYAHOOAPI.init( $('#query'), $('#output'), $(this) );
		});
	});


})(this, jQuery, function(root, $) {

	function makeQuery(query) {
		var select = 'SELECT * FROM geo.placemaker';
		var where = ' WHERE documentContent = "' + query + '"';
		var and = ' AND documentType = "text/plain"';
		return select + where + and;
	}

	var app = {
		api: 'https://query.yahooapis.com/v1/public/yql',
		args: ['format=json'],

		init: function(query, output, submit) {
			if ( ! query.val().length ) return query.focus();
			var that = this;

			$.ajax({
			  url: that.api,
			  data: {
			    'q': makeQuery(query.val()),
			    'format': 'json'
			  },
			  method: 'GET',
			  success: function(data) {
			  	if (data) {
		  			output.html(JSON.stringify(data, null, 4))
		  				.wrap( $('<pre />') );
		  		}
			  },
			  error: function(xhr, error) {
			  	output
			  		.html(JSON.stringify(xhr.responseJSON), null, 4)
			  		.wrap( $('<pre />', {
				  		'class': 'error'
				  	}) );
			  }
			});
		}

	};

	return app;
});