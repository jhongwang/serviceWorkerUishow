!function(a){var t=function(){var e=this;this.mask=a('<div id="photoGallery-mask">'),this.picWrapper=a('<div id="photoGallery-picWrapper">'),this.bodyNode=a(document.body),this.renderDOM(),this.picIndex=a("div.photoGallery-picIndex"),this.picDesc=a("div.photoGallery-picDesc"),this.prevBtn=a("span.photoGallery-prev-btn"),this.nextBtn=a("span.photoGallery-next-btn"),this.closeBtn=a("span.photoGallery-close-btn"),this.picCon=a("img.photoGallery-picCon"),this.picData=[],this.isGetData=!1,this.bodyNode.on("click",".photoGallery",function(t){t.stopPropagation(),e.isGetData||(e.getData(),e.isGetData=!0),e.showMaskAndWrapper(a(this))}),this.mask.click(function(){a(this).fadeOut(),e.picWrapper.fadeOut()}),this.closeBtn.click(function(){e.mask.fadeOut(),e.picWrapper.fadeOut()}),this.nextBtn.hover(function(){e.index<e.picData.length-1?a(this).addClass("photoGallery-next-btn-show"):e.index>=e.picData.length-1&&a(this).removeClass("photoGallery-next-btn-show")},function(){a(this).removeClass("photoGallery-next-btn-show")}).click(function(t){t.stopPropagation(),a(this).hasClass("photoGallery-next-btn-show")?e.goto("next"):1==e.picData.length&&(e.mask.fadeOut(),e.picWrapper.fadeOut())}),this.prevBtn.hover(function(){1<=e.index?a(this).addClass("photoGallery-prev-btn-show"):e.index<1&&a(this).removeClass("photoGallery-prev-btn-show")},function(){a(this).removeClass("photoGallery-prev-btn-show")}).click(function(t){t.stopPropagation(),a(this).hasClass("photoGallery-prev-btn-show")?e.goto("prev"):1==e.picData.length&&(e.mask.fadeOut(),e.picWrapper.fadeOut())}),this.timer=null,a(window).keyup(function(t){var i=t.which;38==i||37==i?e.goto("prev"):40!=i&&39!=i||e.goto("next")}).resize(function(){timer=window.setTimeout(function(){e.resizePic()},200)})};t.prototype={goto:function(t){var i=this;if("next"===t)if(this.index++,this.index>this.picData.length-1)a(this).removeClass("photoGallery-next-btn-show"),this.index=this.picData.length-1;else{var e=this.picData[this.index].src;this.loadImg(e,function(){i.picIndex.hide(),i.picDesc.hide(),i.closeBtn.hide(),i.changePic(e)})}else if("prev"===t)if(this.index--,this.index<0)a(this).removeClass("photoGallery-prev-btn-show"),this.index=0;else{console.log(this.picData);e=this.picData[this.index].src;this.loadImg(e,function(){i.picIndex.hide(),i.picDesc.hide(),i.closeBtn.hide(),i.changePic(e)})}},showMaskAndWrapper:function(t){var i=this,e=t.attr("data-src"),a=t.attr("data-id");t.attr("data-desc");this.picIndex.hide(),this.picDesc.hide(),this.picCon.hide(),this.closeBtn.hide(),this.index=this.getIndexOf(a),this.resizePic(),this.mask.fadeIn(),this.picWrapper.fadeIn(),this.loadImg(e,function(){i.changePic(e)})},resizePic:function(){var t=a(window).width(),i=a(window).height();.6<=i/t&&(i*=.6),this.picWrapper.animate({width:.6*t,height:.8*i,marginLeft:-.3*t,marginTop:-.4*i})},changePic:function(t){this.picCon.attr("src",t).fadeIn(),this.picIndex.text(this.index+1+" / "+this.picData.length).fadeIn(),this.picDesc.text(this.picData[this.index].desc).fadeIn(),this.closeBtn.fadeIn()},getIndexOf:function(i){var e=0;return a(this.picData).each(function(t){if(e=t,i===this.id)return!1}),e},loadImg:function(t,i){var e=new Image;window.ActiveXObject?e.onreadystatechange=function(){"complete"==this.readyState&&i()}:e.onload=function(){i()},e.src=t},getData:function(){var t=this;a("div#photoGallery-container").find(".photoGallery").each(function(){t.picData.push({id:a(this).attr("data-id"),src:a(this).attr("data-src"),desc:a(this).attr("data-desc")})})},renderDOM:function(){this.mask.html('<span class="photoGallery-btn photoGallery-prev-btn"></span><span class="photoGallery-btn photoGallery-next-btn"></span>'),this.picWrapper.html('<span class="photoGallery-close-btn"></span><div class="photoGallery-picIndex"></div><img class="photoGallery-picCon" src=""><div class="photoGallery-picDesc"></div>'),this.bodyNode.append(this.mask,this.picWrapper)}},window.PhotoGallery=t}(jQuery);