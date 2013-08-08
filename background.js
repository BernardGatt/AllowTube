chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getEId") {
		sendResponse({id: chrome.runtime.id});
	}
});
function checkUrl(details, domain) {
    return (
	    (details.url.indexOf("https://www."+domain) == 0) || (details.url.indexOf("https://"+domain) == 0) ||
	    (details.url.indexOf("http://www."+domain) == 0) || (details.url.indexOf("http://"+domain) == 0));
}
function checkSetting(setting) {
	return ((localStorage[setting] == undefined) || (localStorage[setting] == "true"));
}
function interceptRequest(details) {
    if ((checkUrl(details, "youtube.com/embed/")) && (localStorage["allowTube"] == "true")) {
		var vidId = details.url.indexOf("embed/");
		var getParams = details.url.indexOf("?");
		vidId = details.url.substr(vidId+6);
		if (getParams > 0) {
			vidId = vidId.substr(0, getParams);
		}
		return { redirectUrl: 'http://www.proxfree.com?hmeh-pro='+encodeURI('http://www.youtube.com/watch?aembed=1&v=')+vidId }
    } else if ((checkUrl(details, "youtube.com")) && (checkSetting("allowTube"))) {
		return { redirectUrl: 'http://www.proxfree.com?hmeh-pro=' + details.url }	
	} else if ((checkUrl(details, "facebook.com")) && (checkSetting("allowFacebook"))) {
		return { redirectUrl: details.url.replace("facebook.com", "fbk.g00p.com") }
	} else if (((checkUrl(details, "imdb.com")) && (checkSetting("allowIMDB")))
     || (((checkUrl(details, "html5.grooveshark.com"))
     || (checkUrl(details, "grooveshark.com")) && (checkSetting("allowGrooveshark"))))) {
		return { redirectUrl: 'http://hidemyass.com?hmeh-pro=' + details.url }
    }
    return { cancel: false }
}
chrome.webRequest.onBeforeRequest.addListener(interceptRequest, { urls: ['*://*.youtube.com/*', '*://*.facebook.com/*', '*://*.grooveshark.com/*', '*://*.imdb.com/*'] }, ['blocking']);

var requestFilter = {
    urls: [ "*://www.g00p.com/*", "*://*.g00p.com/*" ]
  },
  extraInfoSpec = ['requestHeaders','blocking'],
  handler = function( details ) {
 
    var headers = details.requestHeaders,
      blockingResponse = {};
    for( var i = 0, l = headers.length; i < l; ++i ) {
      if( headers[i].name == 'Cookie' ) {
		headers[i].value = headers[i].value.replace(/g00p_session_id=([a-z|0-9])*;/, "");
		headers[i].value = headers[i].value.replace(/g00p_session_id=([a-z|0-9])*/, "");
		//alert(headers[i].value);
		//headers[i].value = '';
        break;
      }
    }
 
    blockingResponse.requestHeaders = headers;
    return blockingResponse;
  };
 
chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	chrome.pageAction.show(tabId);
});