function init_main()
{
	window.hmeh_jQuery = $.noConflict();
	
	var loc = hmeh_jQuery(location).attr('href');
	
	if (loc.toLowerCase().indexOf('hidemyass.com') != -1)
	{			
		hma_load();
	}
	else
	{
		main_load();
		window.setInterval(main_load, 1000);
	}
}

loadJquery(main_load + hma_load + init_main + "init_main();");