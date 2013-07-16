window.addEventListener('load', function() {
	document.body.className = "loaded";
	var c = document.getElementsByClassName("setting");
	for (var i=0; i<c.length; i++) {
		var sk = c[i].getAttribute("_setting");	
		if (c[i].getAttribute("type") == "checkbox") {
			if ((localStorage[sk] == undefined) && (c[i].getAttribute("_default") != undefined)) {
				localStorage[sk] = c[i].getAttribute("_default");
			}
			if (localStorage[sk] == "true") {
				c[i].checked = true;
			}
		} if (c[i].getAttribute("type") == "range") {
			if (localStorage[sk] == undefined) {
				c[i].value = 0;	
			} else {
				c[i].value = localStorage[sk];	
			}
		} else {
			c[i].value = localStorage[sk];	
		}
		c[i].onchange = function() {
			var skey = this.getAttribute("_setting");	
			if (this.getAttribute("type") == "checkbox") {
				if ((localStorage[skey] == undefined) && (this.getAttribute("_default") != undefined)) {
					localStorage[skey] = this.getAttribute("_default");
				}
				localStorage[skey] = this.checked ? "true" : "false";
			} else {
				localStorage[skey] = this.value;
			}
			document.getElementById("changeEffect").className = "show";
			if (this.getAttribute("_changed") != undefined) {
				callFunc(this.getAttribute("_changed"));
			}
		}
		if (c[i].getAttribute("_changed") != undefined) {
			callFunc(c[i].getAttribute("_changed"));
		}
	}
}, false);

function callFunc(callback) {
	eval(callback)();
}

