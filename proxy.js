if ((document.referrer.indexOf("aembed=1") > 0) || (location.href.indexOf("aembed=1") > 0)) {
	document.documentElement.style.display = "none";
}

var s = document.getElementsByTagName("script");
if (s.length >= 5) {
	if (s[4].innerHTML.indexOf("if(top != self) top") > 0) {
		s[4].remove();
	}
}