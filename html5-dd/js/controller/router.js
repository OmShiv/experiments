var HTML5DD = HTML5DD || {};

(function(App, w) {

	var TheRouter = Backbone.Router.extend({
		routes:{
			'*filter': 'callFilter'
		},

		callFilter: function( param ) {
			App.Scan = param.trim() || '';
			App.Collection.trigger('filter');
		}
	});

	App.HTML5DDRouter = new TheRouter();
	Backbone.history.start();

}(HTML5DD, window));