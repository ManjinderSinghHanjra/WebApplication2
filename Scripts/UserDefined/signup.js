$(document).ready( function(){
				$("#dob").datepicker({
				onSelect: function() {
					$(this).data('datepicker').inline = true; 
				},
				onClose: function() {
					$(this).data('datepicker').inline = false;
				},
				changeMonth:true, 
				changeYear:true,
				dateFormat:'dd MM yy',
				yearRange:'1910:+nn',
				minDate: '-107Y',
				maxDate: '-9Y +93D',
				showOptions: {
					direction: 'up'
				}
				});
});