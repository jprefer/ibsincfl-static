(function($){
 //top menu
$(".site-navbar,.home-navbar").click(function(){
	$(".top-nav").toggle();
});
$('.top-nav ul li').hover(function(){
	$(this).find('ul:first').slideDown(100);
	$(this).addClass("hover");
},function(){
	$(this).find('ul').css('display','none');
	$(this).removeClass("hover");
});
	
$('.top-nav li ul li:has(ul)').find("a:first").append(" <span class='menu_more'>»</span> ");
var windowWidth = $(window).width();
if(windowWidth > 939){
	if($(".site-main .sidebar").height() > $(".site-main .main-content").height()){
		$(".site-main .main-content").css("height",($(".site-main .sidebar").height()+140)+"px");
	}
	}else{
		$(".site-main .main-content").css("height","auto");
	}
	
$(window).resize(function() {
	var windowWidth = $(window).width(); 
	if(windowWidth > 939){
		if($(".site-main .sidebar").height() > $(".site-main .main-content").height()){
			$(".site-main .main-content").css("height",($(".site-main .sidebar").height()+140)+"px");
		}
	}else{
			$(".site-main .main-content").css("height","auto");
	}	
	  
	if(windowWidth > 919){
		$(".top-nav").show();
	}else{
		$(".top-nav").hide();
	}
});
	
})(jQuery);

jQuery(document).ready(function($){
	
	var adminbarHeight = function(){
	var stickyTop;
    if ($("body.admin-bar").length) {
        if ($(window).width() < 765) {
            stickyTop = 46;
        } else {
            stickyTop = 32;
        }
    } else {
		stickyTop = 0;
    }
	return stickyTop;
	}
	
	var is_rtl = false;
	var stickyTop;
	if( onetone_params.is_rtl === '1' || onetone_params.is_rtl === 'on' )
		is_rtl = true;
	stickyTop = adminbarHeight();
	
	// page height
	var page_min_height = $(window).height() - $('footer').outerHeight()- stickyTop;
		
	if($('header').length)
		page_min_height = page_min_height - $('header').outerHeight();
		
	if($('.page-title-bar').length)
		page_min_height = page_min_height - $('.page-title-bar').outerHeight();
		
	$('.page-wrap,.post-wrap').css({'min-height':page_min_height});

	//slider
	if($("section.homepage-slider .item").length >1 ){
	if( (onetone_params.slide_fullheight === '1' || onetone_params.slide_fullheight === 'on') && $(window).width() > 1024 ){
		$('section.homepage-slider').height($(window).height()-stickyTop);
		$('section.homepage-slider .item').height($(window).height()-stickyTop);
	}

	$("#onetone-owl-slider").owlCarousel({
		nav:(onetone_params.slider_control === '1' || onetone_params.slider_control === 'on')?true:false,
		dots:(onetone_params.slider_pagination === '1' || onetone_params.slider_pagination === 'on')?true:false,
		slideSpeed : 300,
		items:1,
		autoplay:(onetone_params.slide_autoplay === '1'|| onetone_params.slide_autoplay === 'on')?true:false,
		margin:0,
		rtl: is_rtl,
		loop:true,
		paginationSpeed : 400,
		singleItem:true,
		autoplayTimeout:parseInt(onetone_params.slideSpeed)
	});
	}

	if($("section.homepage-slider .item").length ==1 ){
		$("section.homepage-slider .owl-carousel").show();
	}

	$(".site-nav-toggle").click(function(){
		$(".site-nav").toggle();
	});

 // retina logo
	if( window.devicePixelRatio > 1 ){
		if($('.normal_logo').length && $('.retina_logo').length){
			$('.normal_logo').hide();
			$('.retina_logo').show();
		}
	$('.page-title-bar').addClass('page-title-bar-retina');
	}

	//video background
	var myPlayer;
	$(function () {
		myPlayer = $("#onetone-youtube-video").YTPlayer();
		$("#onetone-youtube-video").on("YTPReady",function(e){
			$(".video-section,.video-section section").css('background', 'none');
			$(".video-section").parent('section.section').css('background', 'none');
			$("#video-controls").show();
		});
	});

// BACK TO TOP
	$(window).scroll(function(){
		if($(window).scrollTop() > 200){
			$("#back-to-top").fadeIn(200);
		} else{
			$("#back-to-top").fadeOut(200);
		}
	});

	$('#back-to-top, .back-to-top').click(function() {
		$('html, body').animate({ scrollTop:0 }, '800');
		return false;
	});
	// parallax background image
	$('.onetone-parallax').parallax("50%", 0.1);
	// parallax scrolling
	if( $('.parallax-scrolling').length ){
		$('.parallax-scrolling').parallax({speed : 0.15});
	}
	
	// Counter
	// Counter
	$('.js-counter').counterUp({
    	delay: 20,
    	time: 2000
	});
	
//woocommerce
	$(document).on('click','.onetone-quantity .minus',function(){
		var qtyWrap  = $(this).parent('.quantity');
		var quantity =  parseInt(qtyWrap.find('.qty').val());
		var min_num  =  parseInt(qtyWrap.find('.qty').attr('min'));
		var max_num  =  parseInt(qtyWrap.find('.qty').attr('max'));
		var step     =  parseInt(qtyWrap.find('.qty').attr('step'));
		$('input[name="update_cart"]').removeAttr("disabled");

		if( quantity > min_num){
			quantity = quantity - step;
			if( quantity > 0 )
				qtyWrap.find('.qty').val(quantity);
			}
		});

	$(document).on('click','.onetone-quantity .plus',function(){
		var qtyWrap  = $(this).parent('.quantity');
		var quantity =  parseInt(qtyWrap.find('.qty').val());
		var min_num  =  parseInt(qtyWrap.find('.qty').attr('min'));
		var max_num  =  parseInt(qtyWrap.find('.qty').attr('max'));
		var step     =  parseInt(qtyWrap.find('.qty').attr('step'));
		$('input[name="update_cart"]').removeAttr("disabled");

	if( max_num ){
		if( quantity < max_num ){
			quantity = quantity + step;
			qtyWrap.find('.qty').val(quantity);
		}
	}else{
		quantity = quantity + step;
		qtyWrap.find('.qty').val(quantity); 
	}
	});

	$('.variations_form .single_add_to_cart_button').prepend('<i class="fa fa-shopping-cart"></i> ');
	//sticky header
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop(); 
		if( $('div.fxd-header').length ){
		if (scrollTop > 0 ) { 
			$('.fxd-header').css({'top':stickyTop}).show();
			$('header').addClass('fixed-header');
		}else{
			$('.fxd-header').hide();
			$('header').removeClass('fixed-header');
			}
		}
	 });
	
	//sticky header
	$(document).on('click',"a.scroll,.onetone-nav a[href^='#']", function(e){
		var selectorHeight = 0;
		if( $('.fxd-header').length )
			var selectorHeight = $('.fxd-header').height();  
			if($(window).width() <= 919) {
				$(".site-nav").hide();
			}
	
		var scrollTop = $(window).scrollTop(); 
		e.preventDefault();
		var id = $(this).attr('href');
	
		if(typeof $(id).offset() !== 'undefined'){
			var goTo = $(id).offset().top - selectorHeight - stickyTop  + 1;
			$("html, body").animate({ scrollTop: goTo }, 1000);
		}
		});
	
	$('header .site-nav ul,ul.onetone-dots').onePageNav({filter: 'a[href^="#"]',scrollThreshold:0.3});
	$('.menu-item-has-children > ul').before('<span class="menu-item-toggle"></span>');
	$(document).on('click', "span.menu-item-toggle",function(e){
		$(this).siblings('ul').toggle();
	});
	
	//  smooth scrolling  btn
	$("div.page a[href^='#'],div.post a[href^='#'],div.home-wrapper a[href^='#'],.banner-scroll a[href^='#'],a.banner-scroll[href^='#']").on('click', function(e){
		var selectorHeight = $('header').height();
		var scrollTop = $(window).scrollTop(); 
		e.preventDefault();
		var id = $(this).attr('href');
		if(typeof $(id).offset() !== 'undefined'){
			var goTo = $(id).offset().top - selectorHeight;
			$("html, body").animate({ scrollTop: goTo }, 1000);
		}
	});	
	
		//related posts
	if($(".onetone-related-posts").length){
		$(".onetone-related-posts").owlCarousel({
				navigation : false, // Show next and prev buttons
				pagination: false,
				loop:false,
				items:4,
				slideSpeed : 300,
				paginationSpeed : 400,
				margin:15,
				rtl: is_rtl,
				singleItem:false,
				responsive:{
				320:{
					items:1,
					nav:false
				},
				768:{
					items:2,
					nav:false
				},
				992:{
					items:3,
					nav:false
				},
				1200:{
					items:4,
					nav:false,
			}
		}
		});
	
	}
	
	// portfolio filter
	jQuery(function ($) {
		var filterList = {
		init: function () {
			// http://mixitup.io
			$('.portfolio-list-filter .portfolio-list-items').mixitup({
				targetSelector: '.portfolio-box-wrap',
				filterSelector: '.filter',
				effects: ['fade'],
				easing: 'snap',
				// call the hover effect
				onMixEnd: filterList.hoverEffect()
				});
			},
			hoverEffect: function () {             
			}
		};
		// Run the show!
		filterList.init();
	
	});
		$('iframe').each(function(){
		if( typeof $(this).attr('width') !=='undefined' && typeof $(this).attr('height') !=='undefined'){
			if( $(this).attr('width') > $(this).outerWidth() ){
				var iframe_height =  $(this).attr('height')*$(this).outerWidth()/$(this).attr('width');
				$(this).css({'height':iframe_height});
			}
		}
		});
	
	//shop carousel
	if($(".woocommerce.single-product .thumbnails").length){
	  $(".woocommerce.single-product .thumbnails").owlCarousel({
		  navigation : true, // Show next and prev buttons
		  pagination: false,
		  rtl: is_rtl,
		  items:4,
		  navigationText : ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
		  slideSpeed : 300,
		  paginationSpeed : 400,
		  singleItem:false
		  });
	}
	//woo
	$(".product-image").each(function() {
		$(this).hover(function() {
			if($(this).find('.product-image-back img').length){
				$(this).find('.product-image-front').css({'opacity':'0'});
			}
		},
		function() {
			$(this).find('.product-image-front').css({'opacity':'1'});
		});
	});
	
	//masonry
	// portfolio
	$('.onetone-masonry').masonry({
		itemSelector : '.portfolio-box-wrap'
	});
	// blog
	$('.blog-grid').masonry({
		itemSelector : '.entry-box-wrap'
	});
	
	//prettyPhoto
	if(onetone_params.enable_image_lightbox == '1' || onetone_params.enable_image_lightbox == 'on' )
		{
		$('.section-gallery').magnificPopup({
		  delegate: 'a.onetone-portfolio-image',
		  type: 'image',
		  gallery: {
      		enabled: true
    		},
		});
		
	}
	
	$("a[rel='prettyPhoto']").magnificPopup({type:'image'});
	
	
	// parallax background image
	$('.onetone-parallax').parallax("50%", 0.1);
	
	// Section Heading Color   
	$('section').each(function(){
		var headingcolor = $(this).data("headingcolor");
		if(headingcolor != ""){
			$(this).find("h1,h2,h3,h4,h5,h6").css("color",headingcolor);
		}
		});
	
	$(".section-banner").each(function(){
		var videoHeight =$(window).height();
		if( typeof onetone_params.header_cover_video_background !== 'undefined' && onetone_params.header_cover_video_background == '0'){
			var videoHeight = videoHeight-$('.sticky-header').height();
		}
	
		if( typeof onetone_video !== 'undefined' && typeof onetone_video.header_cover_video_background_html5 !== 'undefined' && onetone_video.header_cover_video_background_html5 == '0'){
		
			var videoHeight = videoHeight-$('.sticky-header').height();
			$(this).find("#big-video-wrap").css({"position":"absolute"});
		}
	
		$(this).css({"min-height":videoHeight});
		$(this).find("#tubular-container,#big-video-vid").css({"height":videoHeight});
	
		});
	
	if($(window).width() <1200){	
		newPercentage = (($(window).width() / 1200) * 100) + "%";
		$(".home-banner .heading-inner").css({"font-size": newPercentage});
		}
	
	$(window).on("resize", function (){
		if($(window).width() <1200){
			newPercentage = (($(window).width() / 1200) * 100) + "%";
			$(".home-banner .heading-inner").css({"font-size": newPercentage});
		}else{
			$(".home-banner .heading-inner").css({"font-size": "100%"});
		}
	});
	
	 // section fullheight
	var win_height = $(window).height();
	$("section.fullheight").each(function(){
		var section_height = $(this).height();
		$(this).css({'height':section_height,'min-height':win_height});
	});
	
	// onetone contact form
	function IsEmail(email) {
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(!regex.test(email)) {
			return false;
		}else{
			return true;
		}
		}
	
	
	// free version
	$('.contact-form').on('click','#submit',function(){
	
		var contactForm = $( this ).parents('form.contact-form');
		if( !contactForm.hasClass( "onetone-shortcode" )){
	
			var obj     = contactForm;
			var Name    = obj.find("input#name").val();
			var Email   = obj.find("input#email").val();
			var Message = obj.find("textarea#message").val();
			var sendto  = obj.find("input#sendto").val();
			var notice  = obj.find(".noticefailed");
			
			if( !notice.length ){
				obj.append('<div class="noticefailed"></div>');
				notice  = obj.find(".noticefailed");
			}
		
			notice.text("");
			if(Name ===''){
				notice.html(onetone_params.i18n.i3);
				return false;
			}
			if( !IsEmail( Email ) ) {
				notice.html(onetone_params.i18n.i2);
				return false;
			}
			if(Message === ''){
				notice.html(onetone_params.i18n.i4);
				return false;
			}
		
			notice.html("");
			notice.append("<img alt='loading' class='loading' src='"+onetone_params.themeurl+"/images/loading.gif' />");
			$.ajax({
				type:"POST",
				dataType:"json",
				url:onetone_params.ajaxurl,
				data:{'Name':Name,'Email':Email,'Message':Message,'sendto':sendto,'action':'onetone_contact'},
				success:function(data){ 
					if(data.error==0){
						notice.addClass("noticesuccess").removeClass("noticefailed");
						obj.find(".noticesuccess").html(data.msg);
					}else{
						notice.html(data.msg);	
					}
					$('.loading').remove();obj[0].reset();
					},
				error:function(){
					notice.html("Error.");
					obj.find('.loading').remove();
					}
				});
		}
	});
	// pro
	$(document).on("click", ".onetone-shortcode.contact-form #submit",function(){
		
		var obj = jQuery(this).parents(".contact-form");
		obj.find(".noticefailed").text("");
		var sendto  = obj.find("input#sendto").val();
		var ver     = obj.find(".contact-form-ver").val();
	
		if( typeof ver !== 'undefined' && ver == '2'){
			var values = new Array();
			var error  = 0;
			obj.find("fieldset").find('input, select, textarea').each(
			function(index){
				values[index] = new Array(); 
				var field = jQuery(this);
				values[index]['name'] = field.data('name');
				values[index]['value'] = field.val();
				if(typeof field.data('required') !=='undefined' && field.data('required') =='1' ){
					if( values[index]['value'] == '' ){
						obj.find(".noticefailed").text( onetone_params.i18n.i1 );
						error = 1;
						return false;
					}
			}
				
				if( field.attr('type') == 'email' ){
					if( !IsEmail( values[index]['value'] ) ) {
						obj.find(".noticefailed").text(onetone_params.i18n.i2);
						error = 1;
						return false;
					}
				}
		});
	
			if( error == 1) return false;
				obj.find(".noticefailed").html("");
				obj.find(".noticefailed").append("<img alt='loading' class='loading' src='"+onetone_params.themeurl+"/images/loading.gif' />");
				jQuery.ajax({
					type:"POST",
					dataType:"json",
					url:onetone_params.ajaxurl,
					data: {
						'values': jQuery.param(values),
						'action':'onetone_contact_advanced',
						'sendto':sendto
					},
		success:function(data){
			if(data.error==0){
				obj.find(".noticefailed").addClass("noticesuccess").removeClass("noticefailed");
				obj.find(".noticesuccess").html(data.msg);
			}else{
				obj.find(".noticefailed").html(data.msg);	
		}
	
		jQuery('.loading').remove();
		obj[0].reset(); 
		return false;
		},error:function(){
			obj.find(".noticefailed").html("Error.");
			obj.find('.loading').remove();
			return false;
		}
		});
		return false;
		}
	
		var Name    = obj.find("input#name").val();
		var Email   = obj.find("input#email").val();
		var Message = obj.find("textarea#message").val();
	
		if( !IsEmail( Email ) ) {
			obj.find(".noticefailed").text(onetone_params.i18n.i2);
			return false;
		}
		if(Name ===""){
			obj.find(".noticefailed").text(onetone_params.i18n.i3);
			return false;
		}
		if(Message === ""){
			obj.find(".noticefailed").text(onetone_params.i18n.i4);
			return false;
		}
		obj.find(".noticefailed").html("");
		obj.find(".noticefailed").append("<img alt='loading' class='loading' src='"+onetone_params.themeurl+"/images/loading.gif' />");
	
		jQuery.ajax({
			type:"POST",
			dataType:"json",
			url:onetone_params.ajaxurl,
			data:{'Name':Name,'Email':Email,'Message':Message,'sendto':sendto,'action':'onetone_contact'},
			success:function(data){
				if(data.error==0){
					obj.find(".noticefailed").addClass("noticesuccess").removeClass("noticefailed");
					obj.find(".noticesuccess").html(data.msg);
				}else{
					obj.find(".noticefailed").html(data.msg);	
				}
			jQuery('.loading').remove();obj[0].reset();
				return false;
			},error:function(){
				obj.find(".noticefailed").html("Error.");
				obj.find('.loading').remove();
				return false;
				}
			});
		});
	
	// hide animation items
	if(jQuery().waypoint && jQuery(window).width() > 919 ) {
		jQuery('.onetone-animated').each(function(){
			if(jQuery(this).data('imageanimation')==="yes"){
				jQuery(this).find("img,i.fa").css("visibility","hidden");
			}else{
				jQuery(this).css("visibility","hidden");
			}
		});
	}
	// section one animation
	if( jQuery('.onetone-animated').length && jQuery(window).height() > jQuery('.onetone-animated:first').offset().top  ){
		onetone_animation(jQuery('.onetone-animated:first'));
	}
	
	
	// home page animation
	function onetone_animation(e){
	
		e.css({'visibility':'visible'});
		e.find("img,i.fa").css({'visibility':'visible'});
	
		// this code is executed for each appeared element
		var animation_type       = e.data('animationtype');
		var animation_duration   = e.data('animationduration');
		var image_animation      = e.data('imageanimation');
		if(image_animation === "yes"){
							 
		e.find("img,i.fa").addClass("animated "+animation_type);
	
		if(animation_duration) {
			e.find("img,i.fa").css('-moz-animation-duration', animation_duration+'s');
			e.find("img,i.fa").css('-webkit-animation-duration', animation_duration+'s');
			e.find("img,i.fa").css('-ms-animation-duration', animation_duration+'s');
			e.find("img,i.fa").css('-o-animation-duration', animation_duration+'s');
			e.find("img,i.fa").css('animation-duration', animation_duration+'s');
			}
	
		}else{
			e.addClass("animated "+animation_type);
	
			if(animation_duration) {
				e.css('-moz-animation-duration', animation_duration+'s');
				e.css('-webkit-animation-duration', animation_duration+'s');
				e.css('-ms-animation-duration', animation_duration+'s');
				e.css('-o-animation-duration', animation_duration+'s');
				e.css('animation-duration', animation_duration+'s');
				}
			}
		}
		jQuery('.onetone-animated').each(function(index, element) {
			var el = jQuery(this);
			el.waypoint(function() {onetone_animation(el);},{ triggerOnce: true, offset: '90%' });
		});
	});
	
	jQuery(window).load(function ($){
	// blog timeline
		var timeline_row_width = 0 ;
		jQuery('.magee-blog .blog-timeline .entry-box-wrap').each(function(){
	
			var wrap_width     = jQuery(this).parent('.blog-timeline').innerWidth();
			timeline_row_width = timeline_row_width + jQuery(this).outerWidth();
	
		if( timeline_row_width >= wrap_width ){
			jQuery(this).removeClass('timeline-left').addClass('timeline-right');
			timeline_row_width = 0;
		}else{
			jQuery(this).removeClass('timeline-right').addClass('timeline-left');
		}
	});

});


/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
		    firstTop = $this.offset().top;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();				

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};
		
})(jQuery);