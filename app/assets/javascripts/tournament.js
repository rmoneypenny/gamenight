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
        var buttons = "<button class=\"btn btn-primary subtract-weight\" type=\"button\">-</button>"
                    + "<button class=\"btn btn-secondary add-weight\" type=\"button\" style=\"display:none\">+</button>";
        list.text("");
        for(var i=0; i<g.length-1; i++){
            list.append("<li id=" + gid[i] +">"
                        + "<div class=\"input-group input-group-sm\">"
                        + "<span class=\"input-group-addon\">" + g[i] + "</span>"
                        + "<input type=\"text\" class=\"form-control\" id=\"weight\" value=\"1\" readonly=\"readonly\">"
                        + "<span class=\"input-group-btn\">"
                        + buttons
                        + "</span>"
                        + "</div>"
                        + "</li>");
              
        };
        var info = $(this).find("#info").val();
        $("#joinedGameDate").text(info);
    });
       

    $("#buttonNumber").on("click", ".subtract-weight",function(){
        alert($(this).closest("li").attr("id"));
        var weight = parseInt($("#weight").val());
        if (weight > 0){
            $("#weight").val(weight - 1);
            $(".add-weight").show();
            $(this).closest("ul").find(".subtract-weight").hide();
        };
    });

    // $("#buttonNumber").on("click", ".add-weight",function(){
    //     var weight = parseInt($("#weight").val());
    //     $("#weight").val(weight + 1);
    //     $(".add-weight").hide();
    // });

  //list.append(gid[i] + g[i] + "weight" + buttons);
          
 // = "<div class=\"input-group input-group-sm\">"
 //                    + "<span class=\"input-group-addon\">GameName</span>"
 //                    + "<input type=\"text\" class=\"form-control\" placeholder=\"Weight\">"
 //                    + "<span class=\"input-group-btn\">"
 //                    + "<button class=\"btn btn-primary\" type=\"button\">-</button>"
 //                    + "<button class=\"btn btn-secondary\" type=\"button\">+</button>"
 //                    + "</span>"
 //                    + "</div>";


// list.append("<li id=" + gid[i] + ">" + g[i] 
//                         + "<textarea id=\"weight\" rows=\"1\" cols=\"10\">" + 1 + "</textarea>" + buttons);
     


});   


