var optionCompare={helper:".helper-comp",frameCompare:".frame-tabs-compare > div",left:".left-compare li",right:".items-compare > li",elEven:"li",frameScroll:".items-compare",mouseWhell:true,scrollNSP:true,jScrollPane:true,scrollNSPT:".items-catalog",onlyDif:$('[data-href="#only-dif"]'),allParams:$('[data-href="#all-params"]'),hoverParent:".compare-characteristic",after:function(a){$(".comprasion-head").css("height",a.find(optionCompare.scrollNSPT).height());if($.existsN(a.find(".carousel-js-css:not(.iscarousel)"))){a.find(".carousel-js-css:not(.iscarousel)").myCarousel(carousel)}$(window).scroll()},compareChangeCategory:function(){if($.exists(optionCompare.frameCompare)){$(optionCompare.frameCompare).equalHorizCell(optionCompare);if(optionCompare.onlyDif.parent().hasClass("active")){optionCompare.onlyDif.click()}else{optionCompare.allParams.click()}}},scrollPane:{animateScroll:true,showArrows:true,arrowButtonSpeed:250}};$(document).on("scriptDefer",function(){$(document).on("remove.Cart add.Cart",function(){$(optionCompare.frameCompare).equalHorizCell("refresh",optionCompare)});$(window).resize(function(){$(optionCompare.frameCompare).equalHorizCell("refresh",optionCompare)});$(document).on("compare_list_rm",function(i){var h=i.el,g=h.parents("li"),a=h.parents("[data-equalhorizcell]").last(),b=a.find(optionCompare.right),f=b.add(a.siblings().find(optionCompare.right)).length,d=b.length;g.remove();if(d===1){var c=$('[data-href="#'+a.attr("id")+'"],[href="#'+a.attr("id")+'"]').parent();a.find(optionCompare.left).remove();if($.existsN(c.next())){c.next().children().click()}else{c.prev().children().click()}c.remove()}if(f===1){$(".page-compare").find(genObj.blockEmpty).show().end().find(genObj.blockNoEmpty).hide()}if($.existsN(a.find(".jcarousel-list"))){if(a.find(".right-compare").width()===(d-1)*b.last().width()){a.find(".jcarousel-list").css("left",0);a.find(".group-button-carousel").children().hide()}}$(optionCompare.frameCompare).equalHorizCell("refresh",optionCompare);if(optionCompare.onlyDif.parent().hasClass("active")){optionCompare.onlyDif.click()}else{optionCompare.allParams.click()}});$(optionCompare.frameCompare).equalHorizCell(optionCompare);$("#compare").change(function(){var a=$(this);$(a.val()).siblings().hide().end().show();optionCompare.compareChangeCategory()}).change()});