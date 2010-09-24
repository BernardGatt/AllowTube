function init_main()
{
	//load_jQuery();
	//load_jQueryUI();
	
	
	var loc = window.location.href;
	
	if (loc.toLowerCase().indexOf('hidemyass.com') != -1)
	{			
		var script = document.createElement("script");

        script.textContent = hma_load + "hma_load();";
        document.body.appendChild(script);
		
	}
	else
	{
		window.hmeh_jQuery = $.noConflict();
		main_load();
		window.setInterval(main_load, 1000);
	}
}

loadInit(main_load + hma_load + init_main + "init_main();");