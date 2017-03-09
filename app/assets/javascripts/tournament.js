$(document).ready(function(){
 /*
    $("input").focus(function(){
        $(this).css("background-color", "#cccccc");
    });
    $("input").blur(function(){
        $(this).css("background-color", "#ffffff");
    });
*/
    $(".calendarSuccess").click(function(){
    	var date = $(this).text();
    	$("#jqq").val(date);
    	$("#roomSelect").append(date);
	});
});   
