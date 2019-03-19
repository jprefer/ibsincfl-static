(function($){
    $.fn.OnetoneSerializeObject = function(){

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }

                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);

jQuery(document).ready(function($){

$('.onetone_shortcodes,.onetone_shortcodes_textarea').magnificPopup({
  items: {
      src: '#onetone_shortcodes_container',
      type: 'inline'
  }
});

$(document).on('click','.onetone_shortcodes,.onetone_shortcodes_textarea',function(){
		 $("#onetone_shortcodes_container").show();
	});

$('.onetone_shortcodes_textarea').on("click",function(){
			var id = $(this).next().find("textarea").attr("id");
			$('#onetone-shortcode-textarea').val(id);
		});

$('.onetone_shortcodes_list li a.onetone_shortcode_item').on("click",function(){

	var obj       = $(this);
	var shortcode = obj.data("shortcode");
	var form      = obj.parents("div#onetone_shortcodes_container form");

	$.ajax({
		type: "POST",
		url: onetone_params.ajaxurl,
		dataType: "html",
		data: { shortcode: shortcode, action: "onetone_shortcode_form" },
		success:function(data){
	
			form.find(".onetone_shortcodes_list").hide();
			form.find("#onetone-shortcodes-settings").show();
			form.find("#onetone-shortcodes-settings .current_shortcode").text(shortcode);
			form.find("#onetone-shortcodes-settings-inner").html(data);
		}
		});
	
});

$(".onetone-shortcodes-home").bind("click",function(){

		$("#onetone-shortcodes-settings").hide();
		$("#onetone-shortcodes-settings-innter").html("");
		$(".onetone_shortcodes_list").show();

	});

// insert shortcode into editor
$(".onetone-shortcode-insert").bind("click",function(e){

	var obj       = $(this);
	var form      = obj.parents("div#onetone_shortcodes_container form");
	var shortcode = form.find("input#onetone-curr-shortcode").val();

	$.ajax({
		type: "POST",
		url: onetone_params.ajaxurl,
		dataType: "html",
		data: { shortcode: shortcode, action: "onetone_get_shortcode",attr:form.serializeArray()},
		
		success:function(data){
		
		$.magnificPopup.close();
		form.find("#onetone-shortcodes-settings").hide();
		form.find("#onetone-shortcodes-settings-innter").html("");
		form.find(".onetone_shortcodes_list").show();
		form.find(".onetone-shortcode").val(data);
		if($('#onetone-shortcode-textarea').val() !="" ){
			
			var textarea = $('#onetone-shortcode-textarea').val();
			if(textarea !== "undefined"){
			var position = $("#"+textarea).getCursorPosition();
			var content = $("#"+textarea).val();
			var newContent = content.substr(0, position) + data + content.substr(position);
			$("#"+textarea).val(newContent);
			
			}
			}else{
				
			window.onetone_wpActiveEditor = window.wpActiveEditor;
			// Insert shortcode
			window.wp.media.editor.insert(data);
			// Restore previous editor
			window.wpActiveEditor = window.onetone_wpActiveEditor;
		}
		},
		error:function(){
			$.magnificPopup.close();
		// return false;
		}
		});
		// return false;
	});

//preview shortcode

$(".onetone-shortcode-preview").bind("click",function(e){

	var obj       = $(this);
	var form      = obj.parents("div#onetone_shortcodes_container form");
	var shortcode = form.find("input#onetone-curr-shortcode").val();

	$.ajax({
		type: "POST",
		url: onetone_params.ajaxurl,
		dataType: "html",
		data: { shortcode: shortcode, action: "onetone_get_shortcode",attr:form.serializeArray()},
		
		success:function(data){

		$.ajax({type: "POST",url: onetone_params.ajaxurl,dataType: "html",data: { shortcode: data, action: "onetone_shortcode_preview"},
		success:function(content){
			$("#onetone-shortcode-preview").html(content);
			tb_show(shortcode + " preview","#TB_inline?width=600&amp;inlineId=onetone-shortcode-preview",null);
			}
		});
	
		},
		error:function(){
			
		// return false;
		}
		});
		// return false;
   });

/* ------------------------------------------------------------------------ */
/*  section accordion         	  								  	    */
/* ------------------------------------------------------------------------ */
								
$(document).on( 'click','.section-accordion',function(){
	var accordion_item = $(this).find('.heading span').attr('id');
	//$('.'+accordion_item).slideToggle();
	if( $(this).hasClass('close')){
		$(this).removeClass('close').addClass('open');
		$(this).find('.heading span.fa').removeClass('fa-plus').addClass('fa-minus');
	}else{
		$(this).removeClass('open').addClass('close'); 
		$(this).find('.heading span.fa').removeClass('fa-minus').addClass('fa-plus');
	}
	$(this).parent('.section').find('.section_wrapper').slideToggle();
});

// select section content model
$('.section-content-model').each(function(){

	var model = $(this).find('input[type="radio"]:checked').val();
	if( model == 0 ){
		$(this).parents('.home-section').find('.content-model-0').show();
		$(this).parents('.home-section').find('.content-model-1').hide();
	}else{
	$(this).parents('.home-section').find('.content-model-0').hide();
		$(this).parents('.home-section').find('.content-model-1').show();
	}

});

$( '.section-content-model input[type="radio"]' ).change(function() {
	var model = $(this).val();
	if( model == 0 ){
		$(this).parents('.home-section').find('.content-model-0').show();
		$(this).parents('.home-section').find('.content-model-1').hide();
	}else{
		$(this).parents('.home-section').find('.content-model-0').hide();
		$(this).parents('.home-section').find('.content-model-1').show();
		}
	});
$('.section_wrapper').each(function(){
		$(this).children(".content-model-0:first").addClass('model-item-first');
		$(this).children(".content-model-0:last").addClass('model-item-last');
	});

  // save options
  
  $(function(){
          //Keep track of last scroll
          var lastScroll = 0;
          $(window).scroll(function(event){
              //Sets the current scroll position
              var st = $(this).scrollTop();

              //Determines up-or-down scrolling
              if (st > lastScroll){
                $(".onetone-admin-footer").css("display",'inline')
              } 
              if(st == 0){
                $(".onetone-admin-footer").css("display",'none')
              }
              //Updates scroll position
              lastScroll = st;
          });
        });
  
$(function(){


function getDiff(obj1, obj2) {
  var diff = false;

  // Iterate over obj1 looking for removals and differences in existing values
  for (var key in obj1) {
    if(obj1.hasOwnProperty(key) && typeof obj1[key] !== "function") {
      var obj1Val	= obj1[key],
          obj2Val	= obj2[key];

	//if( obj2Val === false ) obj2Val = '';

      // If property exists in obj1 and not in obj2 then it has been removed
      if (!(key in obj2)) {
        if(!diff) { diff = {}; }
        diff[key] = ''; // using false to specify that the value is empty in obj2
      }

      // If property is an object then we need to recursively go down the rabbit hole
      else if(typeof obj1Val === "object") {
        var tempDiff = getDiff(obj1Val, obj2Val);
        if(tempDiff) {
          if(!diff) { diff = {}; }
          diff[key] = tempDiff;
        }
      }

      // If property is in both obj1 and obj2 and is different
      else if (obj1Val !== obj2Val) {
        if(!diff) { diff = {}; }
        diff[key] = obj2Val;
      }
    }
  }

  // Iterate over obj2 looking for any new additions
  for (key in obj2) {
    if(obj2.hasOwnProperty(key) && typeof obj2[key] !== "function") {
      var obj1Val	= obj1[key],
          obj2Val	= obj2[key];
          
      if (!(key in obj1)) {
        if(!diff) { diff = {}; }
        diff[key] = obj2Val;
      }
    }
  }

  return diff;
};

var theme_options = $("#optionsframework > form").OnetoneSerializeObject(),themeOptions = theme_options[onetone_params.option_name];

$(document).on('click','#onetone-save-options,#optionsframework-submit input[name="update"]',function(e){

			e.preventDefault();
			 var formOptions  = $("#optionsframework > form").OnetoneSerializeObject();
			 var result       = getDiff( themeOptions,formOptions[onetone_params.option_name] );

			$('.options-saving').fadeIn("fast");
			
			var option_page      = $('[name="option_page"]').val();
			var _wpnonce         = $('[name="_wpnonce"]').val();
			var _wp_http_referer = $('[name="_wp_http_referer"]').val();
			var action           = "onetone_save_options";

			var diffOptions = {'option_page':option_page,'_wpnonce':_wpnonce,'_wp_http_referer':_wp_http_referer,'action':action};

			diffOptions[onetone_params.option_name] = result;

			$.post( onetone_params.ajaxurl,diffOptions,function(msg){
				$('.options-saving').fadeOut("fast");
				$('.options-saved').fadeIn("fast", function() {
				$(this).delay(2000).fadeOut("slow");

				});

				themeOptions = formOptions[onetone_params.option_name];

				return false;
			});
			return false;
		});

   });
   
   // backup theme options
 $(document).on('click','#onetone-backup-btn',function(){

		$('.onetone-backup-complete').hide();
		$.ajax({type: "POST",url: onetone_params.ajaxurl,dataType: "html",data: { action: "onetone_options_backup"},
		success:function(content){
			$('.onetone-backup-complete').show();
			$('#onetone-backup-lists').append(content);
			return false;
			}
		});
		return false;
   });
 
 // delete theme options backup
 $(document).on('click','#onetone-delete-btn',function(){

		if(confirm(onetone_params.l18n_01)){
		var key = $(this).data('key');
		$.ajax({type: "POST",url: onetone_params.ajaxurl,dataType: "html",data: { key:key,action: "onetone_options_backup_delete"},
		success:function(content){
			$('#tr-'+key).remove();
			return false;
			}
		});
		return false;
		 }
   });

 // restore theme options backup
 $(document).on('click','#onetone-restore-btn',function(){
	if(confirm(onetone_params.l18n_01)){
		var restore_icon = $(this).find('.fa');
		restore_icon.addClass('fa-spin');
		var key = $(this).data('key');
		$.ajax({type: "POST",url: onetone_params.ajaxurl,dataType: "html",data: { key:key,action: "onetone_options_backup_restore"},
		success:function(content){
			restore_icon.removeClass('fa-spin');
			alert(content);
			window.location.reload();
			return false;
			}
		});
		return false;
		}
   });

// dismiss notice
$(document).on('click','.options-to-customise .notice-dismiss',function(){
	$.ajax({type: "POST",url: onetone_params.ajaxurl,dataType: "html",data: { action: "onetone_close_notice"}});
});

$('#customize-control-onetone_pro-section_order .repeater-fields li').each(function(index, element) {
		var idInput   = $(this).find('input[data-field="id"]');
		idInput.attr('readonly','true');
    });
	
 });