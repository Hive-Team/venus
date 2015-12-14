$.fn.Slider = function(obj, func) {
    var setting = {
      time: 5000, //时间间隔
      changeClass: "item-current", //当前
      sliderBoxClass: "slider-box",
      itemBoxClass: "item-box",
      itemClass: "item",
      itemBigUrl: "data-big-img-url",
      btnPrevClass: "btn-prev",
      btnNextClass: "btn-next",
      bigImgClass: "big-img",
      bigImgUrls: null,
      type: "alpha"
    }

    if (obj) {
      for (var i in obj) {
        setting[i] = obj[i];
      }
    }

    var _self = $(this);
    var $sliderBox = $("." + setting.sliderBoxClass, _self);
    var $itemBox = $("." + setting.itemBoxClass, _self);
    var $items = $("." + setting.itemClass, _self);
    var $btnPrev = $("." + setting.btnPrevClass, _self);
    var $btnNext = $("." + setting.btnNextClass, _self);
    var $bigImg = $("." + setting.bigImgClass, _self);
    var imgIndex;
    var clickBool = false;

    function slider() {
      if (setting.type == "alpha") {
        $items.each(function(i) {
          $(this).css({
            position: "absolute",
            left: 0,
            top: 0
          });

          if (i == 0) {
            $(this).addClass(setting.changeClass);
          }
        });

        setInterval(function() {
          $items.each(function(i) {
            if ($(this).hasClass(setting.changeClass)) {
              imgIndex = i;
            }
          });

          $($items[imgIndex]).removeClass(setting.changeClass);

          if (imgIndex < $items.length - 1) {
            $($items[imgIndex + 1]).addClass(setting.changeClass);
          } else {
            $($items[0]).addClass(setting.changeClass);
          }

        }, setting.time);
      } else if (setting.type == "Horizontal") {
        var itemWidth = $items.width();

        imgIndex = 0;
        $($items[0]).addClass(setting.changeClass);
        $bigImg.attr("src", $($items[0]).attr(setting.itemBigUrl));

        $itemBox.width(function() {
          return $items.length * itemWidth
        });
        $items.each(function(i) {
          $(this).css({
            left: itemWidth * i
          })
        });

        var itemBoxWidth = $itemBox.width();
        var displayWidth = $sliderBox.width();

        $btnPrev.bind("click", function() {
          if (imgIndex > 0 && imgIndex <= $items.length - 1) {
            imgIndex--;

            changeImg($($items[imgIndex]), imgIndex);

            var left = $itemBox.position().left;

            if (!clickBool && $itemBox.position().left < 0) {
              itemBoxMove(left + itemWidth);
            }
          }
        });

        $btnNext.bind("click", function() {
          if (imgIndex >= 0 && imgIndex < $items.length - 1) {
            imgIndex++;

            changeImg($($items[imgIndex]), imgIndex);

            var left = $itemBox.position().left;

            if (!clickBool && $itemBox.position().left > displayWidth - itemBoxWidth) {
              itemBoxMove(left - itemWidth);
            }
          }
        });

        $items.each(function(i) {
          $(this).bind("click", function() {
            imgIndex = i;

            changeImg($(this), imgIndex);
            return false;
          });
        });

        function changeImg(dom, i) {
          var index = i;

          dom.addClass(setting.changeClass);
          $items.each(function(i) {
            if (i != index)
              $(this).removeClass(setting.changeClass);
          });

          $bigImg.attr("src", $($items[index]).attr(setting.itemBigUrl));
        }

        function itemBoxMove(n) {
          clickBool = true;
          $itemBox.animate({
              left: n
            }, function() {
              clickBool = false; //console.log("dfadsf");});
            }
          }
        }

        slider();
      }