function hma_load()
{
	
	var hmehPro = '?hmeh-pro=';
	var loc = window.location.href;
	
	var hmehIndex = loc.indexOf(hmehPro);
	
	if (hmehIndex != -1)
	{
		document.body.style.visibility = "hidden";
		var vidId = loc.substr(hmehIndex + hmehPro.length);
		
		var frm = document.forms[0];
		frm.elements[0].value = "http://www.youtube.com/watch?v=" + vidId;
		frm.submit();
	}
	else
	{
		var ref = document.referrer;
		var hmehIndexRef = ref.indexOf(hmehPro);
		
		if (hmehIndexRef == -1)
		{
			return;
		}
		
		window.vidIdRef = ref.substr(hmehIndexRef + hmehPro.length);
		
		if (document.getElementById('error') != null)
		{
			hma_error();
			return;
		}
		
		try
		{
			var targetAcquired = "youtube.com/watch?v=";
			var target = document.getElementById("hmainput").value;

			var vidId = target.substr(target.toLowerCase().indexOf(targetAcquired) + targetAcquired.length);

			if (vidId.indexOf("&") != -1)
			{
				vidId = vidId.substr(0, vidId.indexOf("&"));
			}
			
			var title = document.getElementById("eow-title").innerText;
			var video = document.getElementById('hma-player_api');
			
			var playerFix = document.createElement('param');
			playerFix.setAttribute('name','wmode');
			playerFix.setAttribute('value','transparent');
			video.appendChild(playerFix);
			
			for (var i = 0; i < video.childNodes.length; i++)
			{
				var node = video.childNodes[i];
				
				if (node.name.toLowerCase() == "flashvars")
				{
					var value = node.value;
					node.value = value.substr(0, value.length - 3) + ', "autoPlay":false}]}';
				}
			}
	
			document.body.innerHTML = video.outerHTML;
			
			window.parent.postMessage(vidId + "|HMEH|" + title,'*');
		}
		
		catch(err)
		{
			hma_error();
		}
	}
}

function hma_error()
{
	var ref = document.referrer;
	document.body.innerHTML = "<div style='color:#fff; background-color:#000; text-align:center;'>Error, please <a style='color:#ff0; text-decoration: underline;' href='" + ref + "' onclick='window.parent.postMessage(vidIdRef + \"|HMEH|\" + \"HIDE\",\"*\");'>reload</a> the video.</div>";
	window.parent.postMessage(vidIdRef + "|HMEH|" + "ERROR",'*');
}

