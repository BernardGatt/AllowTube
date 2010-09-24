function hma_load()
{
	var hmehPro = '?hmeh-pro=';
	var loc = hmeh_jQuery(location).attr('href');
	
	var index = loc.indexOf(hmehPro);
	
	if (index != -1)
	{
		hmeh_jQuery('document').css("visibility","hidden");
		var vidId = loc.substr(index + hmehPro.length);
		hmeh_jQuery('form input:text').val("http://youtube.com/watch?v=" + vidId);
		hmeh_jQuery('#form').submit();
	}
	else
	{
		if (document.referrer.indexOf(hmehPro) != -1)
		{
			if ( hmeh_jQuery('#error').length > 0 || hmeh_jQuery("#hma-player").length == 0 )
			{	
				document.documentElement.innerHTML = "<div style='color:#fff; background-color:#000; text-align:center;'>Error, please <a style='color:#fff;' title='a link... within a link... inception.... :O' href='"+document.referrer+"'>reload</a> the video.</div>";
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

                var target = hmeh_jQuery("#hmainput").val();

	            var index = target.toLowerCase().indexOf(targetAcquired);
	            var vidId = target.substr(index + targetAcquired.length);

	            if (vidId.indexOf("&") != -1)
	            {
	                vidId = vidId.substr(0, vidId.indexOf("&"));
	            }

			    window.parent.postMessage(vidId + "|HMEH|" + hmeh_jQuery("#eow-title").text(),'*');
				document.body.style.visibility = "hidden";
				var video = document.getElementById("hma-player").innerHTML;
				document.documentElement.innerHTML = video;
				
				hmeh_jQuery("#hma-player_api").prepend("<param name=\"wmode\" value=\"transparent\">");
			}
		}
	}
}

