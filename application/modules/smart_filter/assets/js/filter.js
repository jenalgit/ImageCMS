(function($) {
    var methods = {
        init: function(options) {
            var $this = $(this),
                    settings = $.extend({
                slider: $this.find('.slider'),
                minCost: null,
                maxCost: null,
                leftSlider: $this.find('.left-slider'),
                rightSlider: $this.find('.right-slider'),
            }, options);
            var slider = settings.slider,
                    minCost = $(settings.minCost),
                    maxCost = $(settings.maxCost),
                    left = settings.leftSlider,
                    right = settings.rightSlider,
                    defMin = settings.defMin,
                    defMax = settings.defMax,
                    curMin = settings.curMin,
                    curMax = settings.curMax,
                    lS = settings.lS,
                    rS = settings.rS;
            if (!$.existsN(minCost)) {
                minCost = $('<input type="text" class="minCost" data-mins="' + defMin + '" value="' + curMin + '" name="' + lS + '" />').appendTo($this.closest('form')).hide();
            }
            if (!$.existsN(maxCost)) {
                maxCost = $('<input type="text" class="maxCost" data-maxs="' + defMax + '" value="' + curMax + '" name="' + rS + '"/>').appendTo($this.closest('form')).hide();
            }
            slider.slider({
                min: defMin,
                max: defMax,
                values: [curMin, curMax],
                range: true,
                slide: function(event, ui) {
//                    if ($(ui.handle).is(left)) {
//                        $(ui.handle).tooltip({
//                            'title': ui.values[0],
//                            'effect': 'always',
//                            'otherClass': 'tooltip-slider'
//                        });
//                    }
//                    if ($(ui.handle).is(right)) {
//                        $(ui.handle).tooltip({
//                            'title': ui.values[1],
//                            'effect': 'always',
//                            'otherClass': 'tooltip-slider'
//                        })
//                    }

                    minCost.val(ui.values[0]);
                    maxCost.val(ui.values[1]);
                },
                stop: function() {
                    ajaxRecount('#' + slider.attr('id'), 'apply-slider', false);
                }
            });
            minCost.change(function() {
                var value1 = minCost.val(),
                        value2 = maxCost.val(),
                        minS = minCost.data('mins');
                if (parseInt(value1) > parseInt(value2)) {
                    value1 = value2;
                    maxCost.val(value1);
                }
                if (parseInt(value1) < minS) {
                    minCost.val(minS);
                    value1 = minS;
                }
                slider.slider("values", 0, value1);
            });
            maxCost.change(function() {
                var value1 = minCost.val(),
                        value2 = maxCost.val(),
                        maxS = maxCost.data('maxs');
                if (value2 > defMax) {
                    value2 = defMax;
                    maxCost.val(defMax);
                }

                if (parseInt(value1) > parseInt(value2)) {
                    value2 = value1;
                    maxCost.val(value2);
                }
                if (parseInt(value2) > maxS) {
                    maxCost.val(maxS);
                    value2 = maxS;
                }
                slider.slider("values", 1, value2);
            });
            minCost.add(maxCost).change(function() {
                ajaxRecount('#' + slider.attr('id'), 'apply-slider', false);
            });
        }
    };
    $.fn.sliderInit = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sliderInit');
        }
    };
})(jQuery);
(function($) {
    var methods = {
        init: function(options) {
            $.extend(cleaverFilterObj, {mainWraper: $(this), cleaverFilterFunc: function(elPos, countTov, clas) {
                    cleaverFilterObj.mainWraper.hide();

                    $(cleaverFilterObj.elCount).text(countTov);
                    cleaverFilterObj.mainWraper.find(genObj.plurProd).html(pluralStr(countTov, plurProd));
                    var left = 0;
                    if (cleaverFilterObj.location == 'right') {
                        left = elPos.width() + elPos.offset().left;
                    }
                    if (cleaverFilterObj.location == 'left') {
                        left = elPos.offset().left - cleaverFilterObj.mainWraper.actual('outerWidth');
                    }
                    cleaverFilterObj.mainWraper.css({
                        'left': left,
                        'top': elPos.offset().top
                    }).removeClass().addClass('apply').addClass(clas).addClass(cleaverFilterObj.addingClass);
                    cleaverFilterObj.mainWraper[cleaverFilterObj.effectIn](cleaverFilterObj.duration, function() {
                        $(document).trigger({'type': 'showCleaverFilter', 'el': $(this)});
                    });
                    cleaverFilterObj.mainWraper.find('a').focus();

                }}
            );
            (function() {
                $(cleaverFilterObj.elClosed).click(function() {
                    methods.triggerBtnClick();
                });
                $('body').live('click', function(event) {
                    event.stopPropagation();
                    if ($(event.target).parents().is(cleaverFilterObj.mainWraper) || $(event.target).is(cleaverFilterObj.mainWraper) || $(event.target).parents().is(cleaverFilterObj.elPos) || $(event.target).is(cleaverFilterObj.elPos))
                        return;
                    else {
                        methods.triggerBtnClick();
                    }

                }).live('keydown', function(e) {
                    var key, keyChar;
                    if (!e)
                        var e = window.event;
                    if (e.keyCode)
                        key = e.keyCode;
                    else if (e.which)
                        key = e.which;
                    if (key == 27) {
                        methods.triggerBtnClick();
                    }
                });
            })();
        },
        triggerBtnClick: function() {
            cleaverFilterObj.mainWraper[cleaverFilterObj.effectOff](cleaverFilterObj.duration);
        }
    };
    $.fn.cleaverFilterMethod = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.cleaverFilterMethod');
        }
    };
})(jQuery);
function afterAjaxInitializeFilter() {
    var apply = $('.apply'),
            $sliders = $('.frame-slider'),
            catalogForm = $('#catalog_form');
    //if ($.exists_nabir(frameSlider) == 0) frameSlider = $('<div class="frame-slider"></div>').append('.filter').hide();

    $sliders.each(function() {
        var $this = $(this);
        $this.sliderInit(eval($this.data('rel')));
    });
    $(".frame-group-checks").nStCheck({
        wrapper: $(".frame-label:has(.niceCheck)"),
        elCheckWrap: '.niceCheck',
        evCond: true,
        //classRemove: 'b_n',//if not standart
        //if evCond: true
        before: function(a, b, c) {
            c.nStCheck('changeCheck');
            ajaxRecount('#' + b.attr('id'), false, true);
        }
    });
    $(".frame-group-checks").each(function() {
        var $this = $(this),
                $thisRel = $this.data('rel');
        if ($thisRel != undefined) {
            var arr = $thisRel.split(' '),
                    arrL = arr.length;
            $.map(arr, function(n, i) {
                switch (n) {
                    case 'dropDown':
                        $this.find('.title .text-el').addClass('d_l');
                        $this.find('.title > span').click(function() {
                            var $this = $(this);
                            $this.parent().next().slideToggle(function() {
                                $this.toggleClass('valuePD');
                            });
                        });
                    case 'scroll':
                        $this.show().find('.fitlers-content').show().jScrollPane(scrollPane);
                        //$this.find('.fitlers-content').addClass('scroll');
                }
                switch (n) {
                    case 'dropDown':
                        $this.find('.fitlers-content').hide();
                }
                if (arrL - 1 == i)
                    setTimeout(function() {
                        $this.fadeIn();
                        $this.next(preloader).hide()
                    }, 1000);
            });
        }
    });
    apply.cleaverFilterMethod();
    apply.find('a').click(function() {
        catalogForm.submit();
        return false;
    });
    $('.tooltip').tooltip('remove');
    $('.clear-filter').click(function() {
        nm = $(this).data('name');
        $('#' + nm + ' input').attr('checked', false);
        catalogForm.submit();
        return false;
    });
    $('.clear-slider').click(function() {
        var obj = eval($(this).data('rel'));
        $(obj.minCost).val(obj.defMin);
        $(obj.maxCost).val(obj.defMax);
        catalogForm.submit();

        return false;
    });
}
function ajaxRecount(el, slChk, submit) {

//    var catalogForm = $('#catalog_form');
//    if (submit)
//        catalogForm.submit();

    var catalogForm = $('#catalog_form'),
            $this = el,
            data = catalogForm.serializeArray(),
            catUrl = window.location.pathname,
            catUrl = catUrl.replace('shop/category', 'smart_filter/filter');
    $.ajax({
        type: 'get',
        url: catUrl,
        data: data,
        beforeSend: function() {
            $.fancybox.showActivity();
        },
        success: function(msg) {
            var otherClass = '';
            catalogForm.find('.popup_container').html(msg);
            afterAjaxInitializeFilter();
            $.fancybox.hideActivity();
            if (slChk)
                otherClass = slChk;
            cleaverFilterObj.cleaverFilterFunc($($this), totalProducts, otherClass);
        }
    }).fail(function() {
        alert(1)
    });
    return false;
}

$(document).ready(function() {
    afterAjaxInitializeFilter();
});