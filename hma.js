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
		
		if (document.getElementById('error') != null)
		{
			window.vidIdRef = ref.substr(hmehIndexRef + hmehPro.length);			
			document.documentElement.innerHTML = "<div style='color:#fff; background-color:#000; text-align:center;'>Error, please <a style='color:#fff;' href='" + ref + "' onclick='window.parent.postMessage(vidIdRef + \"|HMEH|\" + \"HIDE\",\"*\");'>reload</a> the video.</div>";
			window.parent.postMessage(vidIdRef + "|HMEH|" + "ERROR",'*');
		}
		else
		{
			var player = flowplayer(0);
			
			player.onLoad(function ()
			{
				player.stop();
				player.hide();
				player.stopBuffering();
				player.startBuffering();
				player.show();
				
				window.parent.postMessage(vidId + "|HMEH|" + title,'*');
			});
			
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

			document.body.innerHTML = video.outerHTML;		
		}
	}
}

