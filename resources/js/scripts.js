window.addEventListener("DOMContentLoaded", function () {
     
    backToTop(); 
 game_share();
//<div class="d-flex justify-content-start align-items-center"> <a href="/" class="search_item" > <img class="img_search_item" src="<?php echo $logo; ?>" alt="<?php echo $site_name; ?>" > <span class="game_name"><?php echo $site_name; ?></span> </a> </div>
//usage:
	$('input#search_input').each(function () {
        let empty = $(this).val().length == 0;
        if (empty) {
            $('#search_button').attr('disabled', 'disabled');
        }
    });
    $('input#search_input').keyup(function (e) {

        var keyword = $("input#search_input").val();

        if (keyword.length >= 3) {
            let empty = false;
            $('input#search_input').each(function () {
                empty = $(this).val().length == 0;
            });
            if (empty) {
                $('#search_button').attr('disabled', 'disabled');
            } else {
                $('#search_button').attr('disabled', false);
                $('#searchModalLabel').html('Result for ' + keyword);
                readTextFile(domain_root+"/games.json", function (text) {
                    var data = JSON.parse(text);
                    var games = search(data, keyword);

                    if (games.length > 0) {
                        console.log('result lenght:' + games.length);
                        let str_html = ''
                        games.forEach(function (item, index) {
                            str_html += `<div class="d-flex justify-content-start align-items-center my-1"> <a href="/${item.slug}.html" class="search_item w-100" > <img class="img_search_item" src="${item.image}" alt="${item.name}" > <span class="game_name">${item.name}</span> </a> </div>`;
                        });
                        $("#search_result").html(str_html);
                    } else {
                        console.log('no_result');
                        let no_result = `<center><h3 class="text-dark">No result for ${keyword}</h3></center>`
                        $("#search_result").html(no_result);
                    }

                });
            }
        }
    });


});
function game_share() {
    close_popup();
    $("._share_btn").click(function () {
        open_popup();
    })
    $(".popup-close").click(function () {
        close_popup();
    })
    $(".popup-bg").click(function () {
        close_popup();
    })
}

function open_popup() {
    $(".popup-bg").show();
    $('.share_social_list').find('.st-btn').addBack().show();
    $(".popup-share").show();
    $("html").css("overflow", "hidden")
}

function close_popup() {
    $(".popup-bg").hide();
    $(".popup-share").hide();
    $("html").css("overflow", "");
}
function copyToClipboard(e, t) {
    var s = $("<input>");
    $("body").append(s), $(e).select(), document.execCommand("copy"), $(t).html("COPIED!!"), setTimeout((function () {
        $(t).html("Copy link")
    }), 3e3), s.remove()
}

function search(array, value) {
    value = value.toString().toLowerCase();
    return array.filter(function (o) {
        return Object.keys(o).some(function (k) {
            return o[k].toString().toLowerCase().indexOf(value) !== -1;
        });
    });
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
  

function backToTop() {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 200) {
            $('#button-gotop').addClass("show");
        } else {
            $('#button-gotop').removeClass("show");
        }
    });


    $("#button-gotop").click(function () {
        $("html, body").animate({
            scrollTop: 0
        });
        return false;
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 40) {
        } else {
        }
    });
}

function open_fullscreen() {
    let game = document.getElementById("game-area");
	if(game == null) return;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {

        if (game.requestFullscreen) {
            game.requestFullscreen();
        } else if (game.msRequestFullscreen) {
            game.msRequestFullscreen();
        } else if (game.mozRequestFullScreen) {
            game.mozRequestFullScreen();
        } else if (game.webkitRequestFullscreen) {
            game.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}
