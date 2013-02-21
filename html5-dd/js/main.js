
	
	jQuery(document).ready(function($) {
		if (window.FileReader) {
			new HTML5DD.Main();
		} else {
			var msgArr = 'Your Browser does not have Support for new HTML5 File-Reader Feature'.split(''),
				counter = -1,
				msg;

			$('#drop-div').text('');

			ti = window.setInterval(function(){
				counter++;
				if ( counter != msgArr.length ) {
					msg = $('#drop-div').text() + msgArr[counter];
					$('#drop-div').text(msg);
				} else {
					window.clearInterval(ti);
					$('#drop-div')
						.fadeOut(300, function() {
							$(this)
								.text(':-(')
								.fadeIn(800)
								.css({
									'font-weight': 'bold',
									'-webkit-transform': 'rotate(90deg)'
								});
						});
				}
			}, 50)
		}
	});
	