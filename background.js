function checkUrl(details, domain) {
    return (
	    (details.url.indexOf("https://www."+domain) == 0) || (details.url.indexOf("https://"+domain) == 0) ||
	    (details.url.indexOf("http://www."+domain) == 0) || (details.url.indexOf("http://"+domain) == 0));
}

function interceptRequest(details) {
    if (checkUrl(details, "youtube.com/embed/")) {
	var vidId = details.url.indexOf("embed/");
	var getParams = details.url.indexOf("?");
	vidId = details.url.substr(vidId+6);
	if (getParams > 0) {
		vidId = vidId.substr(0, getParams);
	}
	return { redirectUrl: 'http://hidemyass.com?hmeh-pro='+encodeURI('http://www.youtube.com/watch?aembed=1&v=')+vidId }
    } else if ((checkUrl(details, "youtube.com"))
     || (checkUrl(details, "imdb.com"))
     || (checkUrl(details, "html5.grooveshark.com"))
     || (checkUrl(details, "grooveshark.com"))
     || (checkUrl(details, "facebook.com"))) {
	return { redirectUrl: 'http://hidemyass.com?hmeh-pro=' + details.url }
    }
    return { cancel: false }
}
chrome.webRequest.onBeforeRequest.addListener(interceptRequest, { urls: ['<all_urls>'] }, ['blocking']);
