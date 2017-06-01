$(document).on("turbolinks:load", function(){

    var count=1;
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

        votemessage = (uservote!="true" ? 
                        ("Remove "
                        + count
                        + " vote from the game you do not want to play and add "
                        + count
                        + " to one that you do. ") : (""));

        if (vote=="true"){
            list.append(votemessage);
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
        $("#players").show();
        $.ajax({
            url : "/index",
            type : "get",
            data: {room_id: room}
        });
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
        $("#"+roomid).slideToggle();
    });

    $("#updateroom").on("click", "#deleteRoom", function(){
        var roomid = ($(this).siblings("div").attr("id"));
        $("#"+roomid).hide();
        $("#"+roomid+"delete").slideToggle();

    });


//Tournament JS

    $(document).ready(function() {
        select = $("#select");
        select.append("Please select the number of players<br>")
        options = "<select id=\"players\">";
        for(i=2; i<=8; i++){
            options += "<option value=" + i + ">" + i + "</option>";
         }
        options += "</select><br>";
        select.append(options);
        select.append("<input id=\"losers\" type=\"checkbox\" />Losers bracket? <br>"
                    + "<button id=\"normal\"> Normal </button>"
                    + "<button id=\"revenge\"> Revenge </button>");
    });

    $("#normal").click(function(){
        //build a normal tournament
    });
    $("#revenge").click(function(){
        var players = $("#players").val();
        var nameboxes = "";
        for(i=1; i<=players; i++){
            nameboxes += "Player " + i + "<input type=\"text\" id=\"name" + i + "\"> <br>";
            for(j=1;j<=players*players; j++){
                nameboxes += "Character " + j + "<input type=\"text\" id=\"character" + i + "w" + j + "\"> <br>"; 
            }
        }
        nameboxes += "<br><button id=\"createrevenge\"> Create </button>"
        $("#select").text("");
        $("#select").append(nameboxes);
    });




});   


