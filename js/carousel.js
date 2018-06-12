$(document).ready(function(){				
	$('#slider').jcarousel({
		wrap: 'circular'
	});
	/*
	$('#mycarousel').jcarousel({
		wrap: 'circular'
	});
	*/


	$('#head-tabs').bind('mouseleave',(function() {
		$('#head-tabs div').addClass('ui-tabs-hide');
		$('#head-tabs ul li').removeClass('ui-tabs-selected');
		$('#head-tabs ul li').removeClass('ui-state-active');
	}));

	$('.outer_glow').bind('mouseover', function(){
		var element = $(this).attr('id');
		$('#' + element + ' .link').css('textDecoration','none');
		$('#' + element).css('backgroundPosition','-180px 0');
	});

	$('.outer_glow').bind('mouseout', function(){
		var element = $(this).attr('id');
		$('#' + element + ' .link').css('textDecoration','none');
		$('#' + element).css('backgroundPosition','0px 0');
	});
});