// ==UserScript==
// @name           AllowTube
// @namespace      allow.tube
// @description    A grease-monkey script that enables users to visit YouTube links from behind any proxy/firewall.
// @include        *
// @include        https://*
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @runat		   document-start
// @version 1.1
// ==/UserScript==

function main_load()
{
	var hmehPro = 'hmeh-pro';

	var targetAcquired = "youtube.com/watch?v=";
	var embedTargetAcquired = "youtube.com/v/";
	
	var anchorElements = hmeh_jQuery("a[href*='" + targetAcquired + "']");
	
	if (anchorElements.length != 0)
	{
		anchorElements.unbind('mousedown');
		anchorElements.unbind('click');
		
		anchorElements.click(function (e)
		{
			e.preventDefault();
			e.stopPropagation();

			var target = decodeURIComponent(hmeh_jQuery(this).attr('href'));
			
			var index = target.toLowerCase().indexOf(targetAcquired);
			var vidId = target.substr(index + targetAcquired.length);

			if (vidId.indexOf("&") != -1)
			{
				vidId = vidId.substr(0, vidId.indexOf("&"));
			}

			var iframeId = "GB_frame_" + vidId;

			hmeh_jQuery("#" + iframeId).remove();
			hmeh_jQuery(document.body).append("<iframe style='visibility:hidden' frameBorder='0' scrolling='no' id='" + iframeId + "' title='YouTube Viewer' src='" + 'http://hidemyass.com?' + hmehPro + '=' + vidId + "'></iframe>");

			hmeh_jQuery("#" + iframeId).dialog(
			{ 	width: 460,
				height: 360,
				resizable: false,
				close: function (event, ui) { hmeh_jQuery("#" + iframeId).remove(); }
			});

			hmeh_jQuery("#" + iframeId).css("width", "420px");
			hmeh_jQuery("#" + iframeId).css("height", "280px");

			return false;
		});
	}

	var embeddedElements = hmeh_jQuery("embed[src*='" + embedTargetAcquired + "']");
	
	if (embeddedElements.length != 0)
	{
		var parentObject = embeddedElements.parent("object");
		
		if (parentObject.length != 0)
		{
			parentObject.children("param").remove();
			parentObject.replaceWith( function() { return this.innerHTML; } );
		}
	
		embeddedElements.replaceWith(function ()
		{
			var target = decodeURIComponent(hmeh_jQuery(this).attr('src'));
			
			if (this.length == 0 || target.length == 0) { return; }
			
			var index = target.toLowerCase().indexOf(embedTargetAcquired);
			var vidId = target.substr(index + embedTargetAcquired.length);

			if (vidId.indexOf("?") != -1)
			{
				vidId = vidId.substr(0, vidId.indexOf("?"));
			}
			
			if (vidId.indexOf("&") != -1)
			{
				vidId = vidId.substr(0, vidId.indexOf("&"));
			}
			
			var iframeId = "GB_embed_frame_" + vidId;
			var embed = hmeh_jQuery(this);
			
			return "<iframe id='" + iframeId + "' width='" + embed.attr('width') + "' height='" + embed.attr('height') + "' style='visibility:hidden' frameBorder='0' scrolling='no' src='" + 'http://hidemyass.com?' + hmehPro + '=' + vidId + "'></iframe>";
		});
	}
	
	window.addEventListener('message', function (e)
	{
		var dataSplit = e.data.split("|HMEH|");
		
		if (dataSplit.length < 2)
		{
			return;
		}
		
		var vidId = dataSplit[0];
		var data = dataSplit[1];
		
		var iframe = hmeh_jQuery("#GB_frame_" + vidId);
		
		if (iframe.length != 0)
		{		
			iframe.dialog("option", "title", data == "HIDE" ? "YouTube Viewer" : data);				
		}
		else
		{
			iframe = hmeh_jQuery("#GB_embed_frame_" + vidId);
		}
		
		iframe.css("visibility", data == "HIDE" ? "hidden" : "visible");
	});
}

