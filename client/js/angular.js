var PongApp = angular.module("PongApp", ["ngRoute"])
,   player1 = {
    name: null,
    ready: 0
}
,   player2 = {
    name: null,
    ready: 0
};

function getPlayer1() {
    return player1;
}

function getPlayer2() {
    return player2;
}

function getDeviceTemplate() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    if(check) {
        return '/templates/homeMobile.html';
    } else {
        return '/templates/homeDesktop.html';
    }
}

function getDeviceController() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    if(check) {
        return 'mobileController';
    } else {
        return 'desktopController';
    }
}

PongApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: getDeviceTemplate(),
            controller: getDeviceController()
        });
    $locationProvider.html5Mode(true);
});


PongApp.controller("mainController", function($scope, $http, socketIO) {

    /*
    Check for userAgent
    source:
    http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser#answer-11381730
    */
    //window.mobilecheck = function() {
    //    var check = false;
    //    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    //    return check;
    //};
    //
    //var mobile = window.mobilecheck();
    //
    //if(mobile) {
    //
    //    $scope.message = "Hi, I'm a mobile phone!";
    //    $scope.mobile = true;
    //} else {
    //    $scope.message = "Hi, I'm a computer!";
    //    $scope.mobile = false;
    //}
    //
    //socketIO.emit("newDevice", $scope.message);
    //
    //socketIO.on("deviceAdded", function(data){
    //    console.log("socket message received");
    //    console.log(data);
    //    $(".players:first").append('<p>' + data + '</p><br>');
    //})
});

PongApp.controller("mobileController", function($scope, $http, socketIO){
        var screenWidth = $(window).width()
        ,   screenHeight = $(window).height()
        ,   x
        ,   y
        ,   yMem = 0
        ,   beta
        ,   besturing = ""
        ,   $paddle = null
        ,   $select_option_selected = null
        ,   userName = null
        ,   error = null
        ,   mapMax = 400,
            nameEntered = false;


    $(document).ready(function() {
        $(document).bind('touchmove', function(e){
            e.preventDefault();
        });

        //window.setTimeout( function() {
        checkUsername();
        //}, 1000);
    });

    function checkError() {
        socketIO.on('error', function(msg){
            error = msg;
        });
    }

    function checkUsername() {
        if(userName == null) {
            $.mobile.changePage('../templates/username-dialog.html', {
                changeHash: false,
                role: 'dialog'
            });

            window.setTimeout(function() {
                $(document).on('keyup', '#user', function() {
                    userName = $('#user').val();
                });
            },1);

            $(document).on('click', '#user-btn', function () {
                error = null;
                if(userName.length >= 4) {
                    socketIO.emit('username', userName);
                    checkError();
                    window.setTimeout(function() {
                        if(error == null) {
                            nameEntered = true;
                            document.getElementById('show-username').innerHTML = 'Username: '+userName;
                            $('#usernameForm').dialog('close');
                        } else {
                            sweetAlert({
                                title: 'Oops!',
                                text: error,
                                type: 'error',
                                confirmButtonColor: '#696969'
                            });
                            error = null;
                        }
                    },100);
                } else {
                    sweetAlert({
                        title: 'Oops!',
                        text: 'De username moet uit minimaal 4 karakters bestaan.',
                        type: 'error',
                        confirmButtonColor: '#696969'
                    });
                    error = null;
                }
            });

        } else {
            document.getElementById('show-username').innerHTML = 'Username: '+userName;
        }
        steering();
        steering();
    }


    socketIO.on('username', function(msg) {
       username = msg;
    });

    $('#ready-button').click(function() {
        console.log('hehallo');
        $('#ready-button').addClass('ui-state-disabled').text('You are ready!');
        console.log(username);
        socketIO.emit('userReady', userName);
    });

    $(function() {
        history.pushState(null, null, '/');
        $select_option_selected = $("[name='radio-mini']");
        $select_option_selected.click(function() {
            besturing = $(this).val();
            $select_option_selected.removeClass('button-active');
            console.log(besturing);
            $(this).addClass('button-active');
            steering();
        });
        besturing = $select_option_selected.val();
    });

    function map( x,  in_min,  in_max,  out_min,  out_max){
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    function steering() {

        gyro.stopTracking();
        if(besturing == '1' || besturing == '') {

            $('#index').die('touchmove vmousemove');
            setTimeout(function(){
                $(document).on('touchmove vmousemove','#index', function (e) {
                    e.preventDefault();
                    x = Math.round(map(e.pageX, 0, screenWidth, 0, 100));
                    y = !isNaN(e.pageY) ? Math.round(map(e.pageY, 0, screenHeight, 0, mapMax)) : yMem;

                    if (yMem != y) {
                        socketIO.emit('y-coord', y);
                        yMem = y;
                    }
                    $('.paddle').css('margin-top', y-150);
                });
            },100);


            socketIO.on('start-mob', function (msg) {
                $('#start').innerHTML = msg;
            });
        } else {
            $('#index').die('touchmove vmousemove');
            gyro.frequency = 50;
            gyro.startTracking(function(o) {
                beta = Math.round(map(o.beta, 0, 90, 0, mapMax));
                socketIO.emit('rotatie', beta);
                $('.paddle').css('margin-top', beta*2);
            });
        }
    }

    socketIO.on("disconnect", function(username){
        console.log(username);
        if (username === "!noUser!") {
            swal({
                title: "Oops...",
                text: "The game has been disconnected",
                type: "warning",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }, function () {
                window.location.href = "/";
            });
        } else if(username !== null) {
            if(nameEntered) {
                swal({
                    title: "Oops...",
                    text: username + " has disconnected",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: false
                }, function () {
                    //window.location.href = "/";
                });
            }

        }
    });


});

PongApp.controller("desktopController", function($scope, $http, socketIO){

    var     x
        ,   y
        ,   usernames = [];


    socketIO.on('username', function(msg) {
        if (player1.name == null) {
            player1.name = msg;
            document.getElementById('player1').innerHTML = '('+player1.name+')';
        } else {
            player2.name = msg;
            document.getElementById('player2').innerHTML = '('+player2.name+')';
        }
        usernames.push(msg);
    });

    socketIO.on('userReady', function(msg) {
        if(player1.name == msg) {
            player1.ready = 1;
            $('#player1').append('<i class="fa fa-check"></i>');
        } else {
            player2.ready = 1;
            $('#player2').prepend('<i class="fa fa-check"></i>');
        }
    });

    socketIO.on('disconnect', function(msg) {
        var index = usernames.indexOf(msg);
        usernames.splice(index,1);
        if(msg == player1) {
            player1 = {
                name: null,
                ready: 0
            };
            document.getElementById('player1').innerHTML = '';
        } else {
            player2 = {
                name: null,
                ready: 0
            };
            document.getElementById('player2').innerHTML = '';
        }
    });

});
