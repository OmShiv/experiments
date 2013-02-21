var HTML5DD = HTML5DD || {};

jQuery(document).ready(function($) {

	HTML5DD.ItemHTML = Backbone.View.extend({

		tagName: 'div',

		template: _.template( $('#image-tpl').html() ),

		events: {
			'click .control.like' : 'toggleLike',
			'click .delete'	: 'deletItem'
		},

		initialize: function() {
			this.model.on( 'change', this.render, this );
			this.model.on( 'destroy', this.remove, this );
			this.model.on( 'show', this.showHide, this );
		},

		render: function() {
			var _this = this;
			this.$el
				.addClass('item')
				.html( this.template( this.model.toJSON() ) )

			this.$el.find('.control.like')
				.toggleClass( 'selected', this.model.get('liked') )
				.text(function() {
					return _this.model.get('liked') ? "Liked" : "Like"
				});

			this.showHide();
			return this;
		},

		showHide : function () {
			// class will be added dynamically depending on current router state, when it changes
			// as render is called on every change, which in turn, calls this function
			this.$el.toggleClass( 'hidden',  this.isHidden());
		},

		isHidden : function () {
			var isLiked = this.model.get('liked');

			// This will be dynamically true / false,
			// Depending on your application's current router state - the #link
			// which acts as a filter
			return ( (!isLiked && HTML5DD.Scan === 'liked') || (isLiked && HTML5DD.Scan === 'not-liked') );
		},

		toggleLike: function() {
			this.model.toggle();
		},

		deletItem: function() {
			this.model.destroy();
		}
	});
});