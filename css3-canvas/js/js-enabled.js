
    /* I would rather use this JavaSript to create 1600 <label> Elements */

    !(function (w, d){

        var CanvasWidth = 100,
            CanvasHeight = 100,
            CanvasDots = CanvasWidth * CanvasHeight,
            DOMString = '',
            mousedown = false,
            DOMcreated = false,
            pg = d.getElementById('pg'),
            script = d.getElementById('the-javascript'),
            gen = d.getElementById('generate');

        function createDOM(e) {
            if (DOMcreated) {
                alert(':-/ Already created canvas\nStart drawing and don\'t expect anythin\' from me now !');
                return false;
            }

            gen.innerHTML = "Working";

            for (var i = 1; i <= CanvasDots; ++i) {
                DOMString+= '' +
                    '<input id="ip-'+ i +'" type="checkbox" />'+
                    '<label class="four-px" for="ip-'+ i +'">Select</label>';
            }

            pg.innerHTML = DOMString;
            DOMcreated = true;
            gen.innerHTML = "Done";
            attachEvents();
            // gen.removeEventListener('click', createDOM, false);
        };

        function draw(e) {
            e = e || w.event;
            var target = e.target || e.srcElement;

            if (mousedown && target.nodeName == "LABEL") {
                target.previousSibling.checked = true;
            }
        };

        function attachEvents() {
            pg.addEventListener('mousedown', function(e) {
                mousedown = true;
            }, false);

            pg.addEventListener('mouseup', function(e) {
                mousedown = false;
            }, false);

            pg.addEventListener('mouseover', draw, false);
        }

        gen.addEventListener('click', createDOM, false);

        // script.parentNode.removeChild(script);

    }(window, window.document));
