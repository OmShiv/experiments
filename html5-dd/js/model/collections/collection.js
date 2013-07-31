var HTML5DD = HTML5DD || {};

(function(App) {

	var ImagesList = Backbone.Collection.extend({

		model: App.item,

		localStorage: new Store('HTML5DD'),

		liked: function() {
			return this.filter(function( item ) {
				return item.get('liked');
			});
		},

		unliked: function() {
			return this.without.apply( this, this.liked() );
		},

		nextOrder: function() {
			if ( !this.length ) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		comparator: function( item ) {
			return item.get('order');
		}
	});

	App.Collection = new ImagesList();

}(HTML5DD));
