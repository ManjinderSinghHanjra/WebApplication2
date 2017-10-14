var b1 = 0, b2 = 0, b3 = 0;
$(document).ready(function () {

	$("#ReadMoreButton1").click(function () {
		 b1 = Math.abs(b1 - 1);
		 var parentDiv = $(this).parent('div');
		 if( b1 === 0 )
		 {
			$(parentDiv).css({
				"box-shadow": "20px 10px 20px 40px #ffffff"
			});
		 }
		 else
		 {
			$(parentDiv).css({
				"backgroundColor": "#001e33",
				"box-shadow": "0px 0px 0px 0px #001e33"
			});
		 }
	});
	$("#ReadMoreButton2").click(function () {
		b2 = Math.abs(b2 - 1);
		var parentDiv = $(this).parent('div');
		if(b2 === 0 )
		 {			 
			$(parentDiv).css({
				"box-shadow": "20px 10px 20px 40px #ffffff"
			});
		 }
		 else
		 {
			$(parentDiv).css({
				"backgroundColor": "#001e33",
				"box-shadow": "0px 0px 0px 0px #001e33"
			});
		 }
	});
	$("#ReadMoreButton3").click(function () {
		b3 = Math.abs(b3 - 1);
		var parentDiv = $(this).parent('div');
		 if( b3 === 0 )
		 {			 
			$(parentDiv).css({
				"box-shadow": "20px 10px 20px 40px #ffffff"
			});
		 }
		 else
		 {
			$(parentDiv).css({
				"backgroundColor": "#001e33",
				"box-shadow": "0px 0px 0px 0px #001e33"
			});
		 }
	});
});