
    /* I would rather use this JavaSript to create 1600 <label> Elements */

    !(function (w, d){

        var CanvasWidth = 40,
            CanvasHeight = 40,
            CanvasDots = CanvasWidth * CanvasHeight,
            DOMString = '',
            created = false,
            pg = d.getElementById('pg'),
            script = d.getElementById('the-javascript'),
            gen = d.getElementById('generate');

        function createDOM(e) {
            if (created) {
                alert(':-/ Already created canvas\nStart drawing and don\'t expect anythin\' from me now !');
                return false;
            }

            gen.innerHTML = "Working";

            for (var i = 1; i <= CanvasDots; ++i) {
                DOMString+= '' +
                    '<input id="ip-'+ i +'" type="checkbox" />'+
                    '<label class="ten-px" for="ip-'+ i +'">Select</label>';
            }

            pg.innerHTML = DOMString;
            created = true;
            gen.innerHTML = "Done";
            // gen.removeEventListener('click', createDOM, false);
        };

        gen.addEventListener('click', createDOM, false);
        script.parentNode.removeChild(script);

    }(window, window.document));
