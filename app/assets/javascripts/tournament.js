$(document).on("turbolinks:load", function(){
    console.log( "ready!" );

    $("input").focus(function(){
        $(this).css("background-color", "#cccccc");
    });
    $("input").blur(function(){
        $(this).css("background-color", "#ffffff");
    });

    $(document).on("click", ".calendarSuccess", function(){
        $("#gameList").show();
        var list = $("#list")
        var games = ($(this).find("#games").val());
        var g = games.split('!*!');
        list.text("");
        for(var i=0; i<g.length-1; i++){
            list.append("<li>" + g[i] + "</li>");
        };
        var info = $(this).find("#info").val();
        var id = $(this).find("#id").val();
        $("#gameDate").text(info);
        $("#roomid").val(id);


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
/*
        var info = $(this).find("#info").val();
        var id = $(this).find("#id").val();
        var games = ($(this).find("#games").val());
        var g = games.split('!*!');
        var games = new Array("test","blah","blur");
        $("#gameDate").text(info);
        $("#roomid").val(id);
        $("#gameList").text(g[0]);
*/
