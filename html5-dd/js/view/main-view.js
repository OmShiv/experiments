var HTML5DD = HTML5DD || {};

jQuery(document).ready(function($) {

	(function(App, w, d) {

		App = w.HTML5DD || App;

		q = d.querySelector || function (id) {
			return d.getElementById(id) ? d.getElementById(id) : false;
		}

		App.Main = Backbone.View.extend({

			el: '#html5-dd-app',

			getOriginalEvt: function(e) {
				return (e && e.hasOwnProperty('originalEvent')) ? e.originalEvent : e ? e : null;
			},

			emasculate: function(e) {
				e.preventDefault(); e.stopPropagation();
			},

			statsTemplate: _.template( $('#stats-template').html() ),

			events: {
				'drop #drop-div': 'createImage',
				'click #delete-all': 'deleteAll',
				'click #like-all': 'likeAll',
				'click .local-storage-div': 'changeClass'
			},

			initialize: function() {
				var _this = this;

				// Binding here since this is off track.
				// Your browser might not be the active application, still you want to be able to drag drop
				// right? so thats for it !!

				$(this.el).on('dragenter dragover', function(backboneDDEvt) {
					backboneDDEvt.preventDefault();
					backboneDDEvt.stopPropagation();
					_this.$dropDiv.addClass('hover-class');
				});
				$(this.el).on('dragend', function(backboneDDEvt) {
					_this.$dropDiv.removeClass('hover-class');
				});

				$(w).on('beforeunload', function(e) {
					_this.clearStorage(e);
				})

				this.$dropDiv = this.$('#drop-div');
				this.$output = this.$('#output');
				this.$controls = this.$('#filters-div');
				
				App.Collection.on('add', this.addImages, this );
				App.Collection.on('reset', this.addImages, this );
				App.Collection.on('change:liked', this.applyOnItem, this);
				App.Collection.on('filter', this.applyOnCollection, this);

				App.Collection.on('all', this.render, this);

				App.Collection.fetch();
			},

			render: function() {
				var liked = App.Collection.liked().length,
					unliked = App.Collection.unliked().length;

				if ( App.Collection.length ) {
					this.$output.show();
					this.$controls.show();

					this.$controls.html(this.statsTemplate({
						liked: liked,
						unliked: unliked
					}));

					this.$('#filters').find('a.filter')
						.removeClass('on')
						.filter('[href="#/' + ( App.Scan || '' ) + '"]')
						.addClass('on');
				} else {
					this.$output.hide();
					this.$controls.hide();
				}
			},

			addImage: function( item ) {
				var thisHTML = new App.ItemHTML({ model: item });
				this.$output.append( thisHTML.render().el );
			},

			addImages: function() {
				this.$output.html('');
				App.Collection.each(this.addImage, this);
			},

			applyOnItem : function (item) {
				item.trigger('show');
			},

			applyOnCollection : function () {
				App.Collection.each(this.applyOnItem, this);
			},

			newAttributes: function(file) {
				var image = d.createElement('image'),
					height;

				image.src = file.dataurl;
				height = 100 * image.height / image.width;

				return {
					title: file.name,
					dataURL: file.dataurl,
					order: App.Collection.nextOrder(),
					height: height,
					liked: false
				};
			},

			createImage: function( e ) {
				var _this = this,
					ddEvt = this.getOriginalEvt(e),
					filesList = ddEvt.dataTransfer.files;

				if (!ddEvt.dataTransfer) return;

				ddEvt.stopPropagation(); ddEvt.preventDefault();
				_this.$dropDiv.removeClass('hover-class');

				_.each( filesList, function( file ) {
					if (! /^image/.test(file.type)) return;
					var reader = new w.FileReader(),
						fileObject = {};

					reader.onload = function (event) {
					  	fileObject.dataurl = event.target.result;
					  	fileObject.name = file.name;

					  	// This will call Backbone's "add" method for model, automatically
					  	App.Collection.create( _this.newAttributes( fileObject ) );
					};

				  	reader.readAsDataURL(file);
					
				});

	  		},

	  		changeClass: function() {
	  			$('.local-storage-div').toggleClass('selected');
	  		},

	  		clearStorage: function() {
	  			if( $('.local-storage-div').hasClass('selected') ) {
	  				alert('Local Storage will be cleared');
	  				localStorage.clear('HTML5DD');
	  			}
	  		},

			// Clear all completed todo items, destroying their models.
			deleteAll: function() {
				_.each( App.Collection.liked(), function( item ) {
					item.destroy();
				});

				return false;
			},

			likeAll: function() {
				App.Collection.each(function( item ) {
					item.save({ 'liked': liked });
				});
			}
		});

	}(HTML5DD, window, window.document));

});
