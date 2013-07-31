
var HTML5DD = HTML5DD || {};

(function(App, w, d) {
	var base64DefaultImage = 'data:image/png;base64,'+
		'R0lGODdhtAB9AOMAAMzMzJaWlqqqqsXFxZycnKOjo7Gxsb6+vre3twAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'ACwAAAAAtAB9AAAE/hDISau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6' +
		'n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+Q' +
		'kZKTlJWWl5iZmpucnZ6foEMBowITo6cgBwQEB6GmpwMSp6MgBKMErq8BpbK0tbe5vaOxAKggCKutwbO8' +
		'xkcDxH2zAbHOAwWjBdEUs6+s2AQIAwKrCBXjtgXmE+gB6gG4Eu3hdrfYpcYDtqcE28IBuqZNUwZA37R1' +
		'BqcZkLfv1Lo5sIYZEzDKgIGKF5wVy3bglIGO/rsoWASAABiAiwEQgAQoAeVCivEg0qKIkuU+aCYraDSW' +
		'rVdMnb5ubmQJQChIf29QDYDH05dGXdycSiVaEIEBilOFBZxFMI6xmiybUoVKVuwEVQK1Dt16qiucfN3W' +
		'ygVK1excbCnl2p17x1lNCTeXwsvoS+1eu0Kd4UUqk+o+CVgtYrSwM+vcfQdWQq6ouSUpAKoeeo170lfC' +
		'W0jTxhXLsqTAUitJn/7cuHBRoteyMVZtlzQyd655ucZLdd7CYCCq2UZ+QvBP5iPEAcDKC3r0af2slyAH' +
		'TwBj7eDDix9Pvrz58+jTq1/Pvr379/Djy59Pv779+/jz69/Pv7///wAGEijggAQWaOCBCCao4IIMNuhE' +
		'BAA7';

	App.item = Backbone.Model.extend({

		defaults: {
			title: 'A dummy image',
			dataURL: base64DefaultImage,
			width: 180,
			liked: false
		},

		toggle: function() {
			this.save({
				liked: !this.get('liked')
			});
		}
	});

}(HTML5DD, window, document));



