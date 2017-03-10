$(document).on("turbolinks:load", function(){
    console.log( "ready!" );

    $("input").focus(function(){
        $(this).css("background-color", "#cccccc");
    });
    $("input").blur(function(){
        $(this).css("background-color", "#ffffff");
    });

    $(document).on("click", ".calendarSuccess", function(){
        var info = $(this).find("#info").val();
        var id = $(this).find("#id").val();
        var games = $(this).find("#games").val();
        $("#gameDate").text(info);
        $("#roomid").val(id);
        $("#gameList").text(games);
    });
});   


/*
    $(".calendarSuccess").on("click", function(){
        var info = $(this).find("#info").val();
        var id = $(this).find("#id").val();
        $("#roomSelect").text(info);
        $("#jqq").val(id);
        alert(id);
    });
*/