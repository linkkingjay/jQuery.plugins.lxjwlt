;(function($){
    $.fn.extend({
        // 页面滚动至元素顶部
        goTop: function (speed) {
            if ($(this).is(':animated')) return false;
            var targetOffset = $(this).offset().top;
            speed = speed || 400;
            $('html,body').animate({
                scrollTop: targetOffset
            }, speed);
            return this;
        },
        // 创建置顶按钮
        // 需要引用：
        // goTop 方法
        createGoTop: function (options) {
            var $me = this,
                $parent = $me.parent();
            var o = $.extend({
                // 参考物，用于限定按钮显现高度，默认为父元素
                reference : $parent,
                // 作用物，指定滚动至该元素的顶部，默认为父元素
                actor : $parent
            }, options);
            var $ref = $(o.reference),
                $actor = $(o.actor),
                rTop = $ref.offset().top;
            // 预设样式
            if ($me.css('position') !== 'fixed') {
                $me.css({
                    'display': 'none',
                    'position': 'fixed',
                    'left': o.left || $ref.offset().left + $ref.outerWidth() + 
                            'px',
                    'bottom': o.bottom || 0 + 'px',
                    // 必须除去外边距
                    'margin': '0'
                });
            } else {
                // 如果用户给定了left或bottom参数
                if (o.left) {
                    $me.css('left', o.left);
                }
                if (o.bottom) {
                    $me.css('left', o.bottom);
                }
            }
            $me.on('click', function(event) {
                // 滚动到参考物的顶部
                $actor.goTop(o.speed);
                event.preventDefault();
            });
            // 当页面滚动时，控制置顶按钮显示隐藏
            $(window).on('scroll', function() {
                // 判断视口顶部是否超过了参考物的顶部
                if ($(this).scrollTop() >= rTop) {
                    $me
                        .css('display', 'block')
                        .stop()
                        .animate({opacity : 1});
                } else {
                    $me
                        .stop()
                        .animate({opacity : 0}, function(){
                            $me.css('display', 'none');
                        });
                }
            });
        }
    });
})(jQuery);
