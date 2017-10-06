$(document).ready( function(){

	$("#ReadMoreButton1").click( function(){
		 var parentDiv = $(this).parent('div');
		 if( $(this).attr('aria-expanded') == "false" )
		 {			 
			$(parentDiv).css({
			"backgroundColor":"#230303",
			"box-shadow":"20px 10px 20px 40px #230303"
			});
		 }
		 else
		 {
			$(parentDiv).css({
			"backgroundColor":"#1d2524",
			"box-shadow":"0px 0px 0px 0px"
			});
		 }
	});
	$("#ReadMoreButton2").click( function(){
		var parentDiv = $(this).parent('div');
		if( $(this).attr('aria-expanded') == "false" )
		 {			 
			$(parentDiv).css({
			"backgroundColor":"#230303",
			"box-shadow":"20px 10px 20px 40px #230303"
			});
		 }
		 else
		 {
			$(parentDiv).css({
			"backgroundColor":"#1d2524",
			"box-shadow":"0px 0px 0px 0px"
			});
		 }
	});
	$("#ReadMoreButton3").click( function(){
		var parentDiv = $(this).parent('div');
		 if( $(this).attr('aria-expanded') == "false" )
		 {			 
			$(parentDiv).css({
			"backgroundColor":"#230303",
			"box-shadow":"20px 10px 20px 40px #230303"
			});
		 }
		 else
		 {
			$(parentDiv).css({
			"backgroundColor":"#1d2524",
			"box-shadow":"0px 0px 0px 0px "
			});
		 }
	});
});