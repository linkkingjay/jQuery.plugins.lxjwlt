;(function($){
    $.fn.extend({
        bindDropDownList: function (options) {
            var o = $.extend({
                // 下拉菜单，默认为该元素的同辈ul标签
                DDList: this.siblings('ul'),
                // 设定类名，同类的按钮共用同一个类名，用于标记正在打开的按钮
                className: 'dropDownButton' + new Date().getTime(),
                // 定制回调函数，点击按钮时调用，默认为空
                start: null,
                // 定制回调函数，点击按钮后调用，默认为空
                stop: null
            }, options);
            return this.each(function (index) {
                var $me = $(this);
                // 检查该元素是否已经绑定了下拉菜单
                if (!$me.data('DDList')) {
                    // 获取下拉菜单元素
                    $me.data('DDList', $(o.DDList).eq(index));
                    var $DDList = $me.data('DDList');
                } else {
                    // 跳过本次循环
                    return;
                }
                $me
                    .on('click', o.start)
                    .on('click', function () {
                        var $this = $(this),
                            // 捕获对应的下拉菜单
                            $targetList = $this.data('DDList');
                        // 如果对象仍在动画过程中，点击无效
                        if ($targetList.is(':animated')) {
                            return false;
                        }
                        if (!$this.hasClass(o.className)) {
                            // 获取正被激活的按钮
                            var $enabledElem = $('.' + o.className);
                            if ($enabledElem.length) {
                                $enabledElem.triggerHandler('click');
                            }
                            $this.addClass(o.className);
                            $(document).on('click.' + o.className, function(){
                                var $target = $('.' + o.className);
                                if ($target.length) {
                                    $target.triggerHandler('click');
                                }
                            });
                        } else {
                            $this.removeClass(o.className);
                            $(document).off('click.' + o.className);
                        }
                        $targetList.fadeToggle(100, o.stop);
                        return false;
                    });
                $DDList
                    .on('click', function (event) {
                        //冒泡截止
                        event.stopPropagation();
                    })
                    .on('click', 'a', function (event) {
                        $('.' + o.className).triggerHandler('click');
                    });
            });
        }
    });
})(jQuery);
