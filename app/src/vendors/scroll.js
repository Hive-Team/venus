var $win = $(window);
var slider = $("#slider_home");
var home_nav_fixed = $("#home_nav_fixed");
var $main_rig_func_box = $("#main_rig_func_box");
var $func_box = $("#func_box");
var $disgin_box = $(".disgin-box");
var $hover_box = $(".hover-box");
var $phone_window = $("#phone_window");
var $qr_code_box = $("#qr_code_box")
var isFixed = false;
var date1 = new Date().getTime();
var date2;

// $("#nav_main,#nav_fixed,#header,#footer").css({display:"none"});
$win.bind("mousewheel scroll", function() {
    date2 = new Date().getTime();

    $phone_window.width(0);

    if (/safari/.test(navigator.userAgent.toLowerCase())) {
        if ((date2 - date1) > 10) {
            scroll($(this));
            date1 = date2;
        }
    } else {
        scroll($(this));
    }

    if ($(this).scrollTop() >= 720) {
        if(!isFixed){
            isFixed = true;
            home_nav_fixed.animate({
                top: 0
            });
        }

        tipTanTip(40,1);
        $hover_box.each(function(i){
            $(this).css({display:"none"});
            if(i >= 4){
                $(this).css({display:"block"});
            }
        });
    } else if ($(this).scrollTop() < 720){
        if(isFixed){
            isFixed = false;
            home_nav_fixed.animate({
                top: -80
            });
        }

        tipTanTip(0,0.2);
    }
});
//方案老大不喜欢。 1. 没有美女头像 2. 不直观，没有马上能找到在线咨询的地方。
$main_rig_func_box.bind("mouseenter",function(){
    console.log('dfdfdfdfdf');
    if($win.scrollTop() >= 720){
        $hover_box.each(function(i){
            $(this).css({display:"block"});
        });
        tipTanTip(204,1);
    }else if ($win.scrollTop() < 720){
        $hover_box.each(function(i){
            $(this).css({display:"block"});
            if(i >= 4){
                $(this).css({display:"none"});
            }
        });
        tipTanTip(163,1);
    }
});

$($hover_box[1]).bind("mouseenter",function(){
    $phone_window.width(120);
}).bind("mouseleave",function(){
    $phone_window.width(0);
});

$($hover_box[2]).bind("mouseenter",function(){
    $qr_code_box.width(100);
}).bind("mouseleave",function(){
    $qr_code_box.width(0);
});

function tipTanTip(a,b,f){
    $func_box.height(a);
    $disgin_box.each(function(i){
        $(this).css({opacity:b});
    });
}

//首页幻灯
//function scroll(t) {
//    var slider = $("#slider_home");
//    var scrollTop = t.scrollTop();
//    if (scrollTop < 0) {
//        slider.css({
//            top: 0 - scrollTop
//        });
//    } else if (scrollTop < 680  && scrollTop >= 0) {
//        slider.css({
//            top: -scrollTop*0.86
//        });
//    } else {
//        slider.css({
//            top: scrollTop
//        });
//    }
//}
$("#back_top").bind("click",function(){
    $win.scrollTop(0);
});

$("#pop_chat").bind("click",function(){
    $('#live800iconlink').trigger('click');

});
