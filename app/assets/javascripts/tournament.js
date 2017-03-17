$(document).on("turbolinks:load", function(){


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

    $(document).on("click", ".calendarJoin", function(){
        var list = $("#joinedList");
        var games = ($(this).find("#games").val());
        var g = games.split('!*!');
        var gameid = ($(this).find("#gameIDs").val());
        var gid = gameid.split(" ");
        var buttons = "<button class=\"btn btn-default btn-xs subtract-weight\"> - </button><button class=\"btn btn-default btn-xs add-weight\" style=\"display:none\"> + </button>";
        list.text("");
        for(var i=0; i<g.length-1; i++){
            list.append("<li id=" + gid[i] + ">" + g[i] + "<textarea id=\"weight\" rows=\"1\" cols=\"10\">" + 0 + "</textarea>" + "<button class=\"btn btn-default btn-xs subtract-weight\"> - </button><button class=\"btn btn-default btn-xs add-weight\" style=\"display:none\"> + </button>" + "</li>");
            //list.append(gid[i] + g[i] + "weight" + buttons);
              
        };
        var info = $(this).find("#info").val();
        $("#joinedGameDate").text(info);
    });




    $("#buttonNumber").on("click", ".subtract-weight",function(){
        var weight = parseInt($("#weight").val());
        if (weight > 0){
            $("#weight").val(weight - 1);
            $(".subtract-weight").hide();
            $(".add-weight").show();
        };
    });

    // $("#buttonNumber").on("click", ".add-weight",function(){
    //     var weight = parseInt($("#weight").val());
    //     $("#weight").val(weight + 1);
    //     $(".add-weight").hide();
    // });

});   


