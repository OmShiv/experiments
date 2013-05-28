var HTML5DD = HTML5DD || {};

HTML5DD.Main = Backbone.View.extend({

    el: '#html5-dd-app',

    getOriginalEvt: function(e) {
        return (e && e.hasOwnProperty('originalEvent')) ? e.originalEvent : e;
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

        $(window).on('beforeunload', function(e) {
            _this.clearStorage(e);
        })

        this.$dropDiv = this.$('#drop-div');
        this.$output = this.$('#output');
        this.$controls = this.$('#filters-div');
        
        HTML5DD.Collection.on('add', this.addImages, this );
        HTML5DD.Collection.on('reset', this.addImages, this );
        HTML5DD.Collection.on('change:liked', this.applyOnItem, this);
        HTML5DD.Collection.on('filter', this.applyOnCollection, this);

        HTML5DD.Collection.on('all', this.render, this);

        HTML5DD.Collection.fetch();
    },

    render: function() {
        var liked = HTML5DD.Collection.liked().length,
            unliked = HTML5DD.Collection.unliked().length;

        if ( HTML5DD.Collection.length ) {
            this.$output.show();
            this.$controls.show();

            this.$controls.html(this.statsTemplate({
                liked: liked,
                unliked: unliked
            }));

            this.$('#filters').find('a.filter')
                .removeClass('on')
                .filter('[href="#/' + ( HTML5DD.Scan || '' ) + '"]')
                .addClass('on');
        } else {
            this.$output.hide();
            this.$controls.hide();
        }
    },

    addImage: function( item ) {
        var thisHTML = new HTML5DD.ItemHTML({ model: item });
        this.$output.append( thisHTML.render().el );
    },

    addImages: function() {
        this.$output.html('');
        HTML5DD.Collection.each(this.addImage, this);
    },

    applyOnItem : function (item) {
        item.trigger('show');
    },

    applyOnCollection : function () {
        HTML5DD.Collection.each(this.applyOnItem, this);
    },

    newAttributes: function(file) {
        var image = d.createElement('image'),
            height;

        image.src = file.dataurl;
        height = 100 * image.height / image.width;

        return {
            title: file.name,
            dataURL: file.dataurl,
            order: HTML5DD.Collection.nextOrder(),
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
            var reader = new window.FileReader(),
                fileObject = {};

            reader.onload = function (event) {
                fileObject.dataurl = event.target.result;
                fileObject.name = file.name;

                // This will call Backbone's "add" method for model, automatically
                HTML5DD.Collection.create( _this.newAttributes( fileObject ) );
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
        _.each( HTML5DD.Collection.liked(), function( item ) {
            item.destroy();
        });

        return false;
    },

    likeAll: function() {
        HTML5DD.Collection.each(function( item ) {
            item.save({ 'liked': liked });
        });
    }
});
