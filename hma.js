function hma_load()
{
	var hmehPro = '?hmeh-pro=';
	var loc = window.location.href;
	
	var index = loc.indexOf(hmehPro);
	
	if (index != -1)
	{
		document.body.style.visibility = "hidden";
		var vidId = loc.substr(index + hmehPro.length);
		
		var frm = document.forms[0];
		frm.elements[0].value = "http://www.youtube.com/watch?v=" + vidId;
		frm.submit();
	}
	else
	{
		if (document.referrer.indexOf(hmehPro) == -1)
		{
			return;
		}	
		
		if (document.getElementById('error') != null)
		{			
			var ref = document.referrer;
			var indexRef = ref.indexOf(hmehPro);
			window.vidIdRef = ref.substr(indexRef + hmehPro.length);
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
			});
			
			var targetAcquired = "youtube.com/watch?v=";

			var target = document.getElementById("hmainput").value;

			var index = target.toLowerCase().indexOf(targetAcquired);
			var vidId = target.substr(index + targetAcquired.length);

			if (vidId.indexOf("&") != -1)
			{
				vidId = vidId.substr(0, vidId.indexOf("&"));
			}
			
			var title = document.getElementById("eow-title").innerText;
			
			var video = document.getElementById('hma-player_api');
			
			var trans = document.createElement('param');
			trans.setAttribute('name','wmode');
			trans.setAttribute('value','transparent');
			video.appendChild(trans);
			
			document.body.innerHTML = video.outerHTML;		
			
			window.parent.postMessage(vidId + "|HMEH|" + title,'*');
		}
	}
}

