var HTML5DD = HTML5DD || {};

HTML5DD.item = Backbone.Model.extend({

    defaults: {
        title: 'A dummy image',
        dataURL: 'base64DefaultImage', // no use of this
        width: 180,
        liked: false
    },

    toggle: function() {
        this.save({
            liked: !this.get('liked')
        });
    }
});
