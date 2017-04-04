$(document).on("turbolinks:load", function(){

    var count=2;
    var tempcount;
    var gameWeight = {};
    var room;

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
        tempcount = count;
        gameWeight = {};
        var list = $("#joinedList");
        var games = ($(this).find("#games").val());
        var g = games.split('!*!');
        var gameid = ($(this).find("#gameIDs").val());
        var gid = gameid.split(" ");
        var vote = ($(this).find("#vote").val());
        var weight = ($(this).find("#weight").val());
        var w = weight.split(" ");
        var uservote = ($(this).find("#uservote").val());
        room = "";
        room = ($(this).find("#id").val());
        list.text("");

        buttons = (uservote!="true" ? 
                ("<span class=\"input-group-btn\">"
                + "<button class=\"btn btn-primary subtract-weight\" type=\"button\">-</button>"
                + "<button class=\"btn btn-primary add-weight\" type=\"button\" style=\"display:none\">+</button>"
                + "</span>") : (""));


        if (vote=="true"){
            for(var i=0; i<g.length-1; i++){
                list.append("<li id=" + gid[i] +">"
                            + "<div class=\"input-group input-group-sm\">"
                            + "<span class=\"input-group-addon\">" + g[i] + "</span>"
                            + "<input type=\"text\" class=\"form-control\" id=\"weight"
                            + gid[i] + "\""
                            + "value="
                            + w[i]
                            + " readonly=\"readonly\">"
                            + buttons
                            + "</div>"
                            + "</li>");
                gameWeight[gid[i]] = w[i];
            };
        }
        else{
            for(var i=0; i<g.length-1; i++){
                list.append("<li id=" + gid[i] +">"
                            + "<ul>"
                            + g[i]
                            + "</ul>"
                            + "</li>");
              
            };
        };
        var info = $(this).find("#info").val();
        $("#joinedGameDate").text(info);
    });
       


    $("#buttonNumber").on("click", ".subtract-weight",function(){
        var gid = ($(this).closest("li").attr("id"));
        var weight = parseInt($("#weight"+gid).val());
        if (weight > 0){
            $("#weight"+gid).val(weight - 1);
            gameWeight[gid] = weight - 1;
            tempcount = tempcount-1;
            if (tempcount == 0){
                $(this).closest("ul").find(".subtract-weight").hide();
                $(".add-weight").show();
                tempcount=count;
            };
        };
    });



    $("#buttonNumber").on("click", ".add-weight",function(){
        var gid = ($(this).closest("li").attr("id"));
        var weight = parseInt($("#weight"+gid).val());
        $("#weight"+gid).val(weight + 1);
        gameWeight[gid] = weight + 1;
        tempcount = tempcount-1;
        if (tempcount==0){
            $(".add-weight").hide();
            $("#submitWeight").show();
        };
    });


    $("#submitWeight").on("click", ".weight-button", function(){
        game = [];
        weight = [];
        for(i in gameWeight){
            game.push(i);
            weight.push(gameWeight[i]);
        };
        user = this.getAttribute("data-user");
        $.ajax({
            url : "/index",
            type : "patch",
            data : { games: game,
                     weights: weight,
                     user: user,
                     room: room }
        });

    });


    $("#updateroom").on("click", "#editRoom", function(){
        var roomid = ($(this).siblings("div").attr("id"));
        $("#"+roomid+"delete").hide();
        $("#"+roomid).toggle();
    });

    $("#updateroom").on("click", "#deleteRoom", function(){
        var roomid = ($(this).siblings("div").attr("id"));
        $("#"+roomid).hide();
        $("#"+roomid+"delete").toggle();

    });



});   


