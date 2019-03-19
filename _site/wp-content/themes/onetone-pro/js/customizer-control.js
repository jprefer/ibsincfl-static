( function( $ ) {

var api = wp.customize, ids, sectionChanged = false;
$(document).on('click','#sub-accordion-section-onetone_sections_order .repeater-row-remove',function(){
	var listParent = $(this).parents('ul.repeater-fields');
	var id    = $(this).parents('li.repeater-row').find('input[data-field="id"]').val();
	var type  = $(this).parents('li.repeater-row').find('select[data-field="type"]').val();
	var removedIds = listParent.data('removed');
	ids = id+':'+type;
	if(removedIds!=='' && removedIds!==undefined){
		ids = removedIds+','+ids;
		}
	listParent.attr( 'data-removed',ids );
	sectionChanged = true;
});
		
$('#customize-control-onetone_pro-section_order .repeater-fields li').each(function(index, element) {
		var idInput   = $(this).find('input[data-field="id"]');
		idInput.attr('readonly','true');
    });

$(document).on('click','#sub-accordion-section-onetone_sections_order .repeater-add',function(){
	var sectionIDs = [];
	$('#customize-control-onetone_pro-section_order .repeater-fields li').each(function(index, element) {
		var idInput   = $(this).find('input[data-field="id"]');
		idInput.attr('readonly','true');
		if(idInput.val() !='')
			sectionIDs.push( parseInt(idInput.val()) ); 
    });
	
	 setTimeout(function(){
		  var maxID = Math.max.apply(null, sectionIDs);
		  var inputSection = $('#customize-control-onetone_pro-section_order .repeater-fields li input[data-field="id"]');
		  var newSection = $('#customize-control-onetone_pro-section_order .repeater-fields li:last input[data-field="id"]');
		  
		  maxID = maxID+1;
		  newSection.val(maxID).trigger("change");
		  inputSection.attr('readonly','true');

		 }, 1000);
	sectionChanged = true;
});


wp.customize.bind( 'ready', function() {
    var customize = this;
	$.ajax({
			url: ajaxurl,
			type: 'post',
			dataType: 'html',
			data: {
				action: 'onetone_options_export',
			},success: function(e){
				 $('#onetone_options_export').val(e);
			}
		});
   

} );

$(document).on('click','.options-import',function(){
	
	if(confirm( onetone_customize_params.confirm_import )){
		
	  var new_options = $('#onetone_options_import').val();
  
	  $.ajax({
			  url: ajaxurl,
			  type: 'post',
			  dataType: 'html',
			  data: {
				  action: 'onetone_options_import',
				  options:new_options
			  },success: function(e){
				  $('#onetone_options_import').val('')
				  $('.options-import-result').html(e);
				  window.location.reload();
			  },error:function(){
				  $('.options-import-result').html('Import failed.');
				  }
		  });
	}
});

$(document).on('click','.onetone-create-frontpage',function(){
	
	  $.ajax({
			  url: ajaxurl,
			  type: 'post',
			  dataType: 'html',
			  data: {
				  action: 'onetone_create_frontpage',
			  },success: function(e){
				  window.location.reload();
			  },error:function(){
				}
		  });

});

wp.customize.bind( 'ready', function() {
 setTimeout(function(){
 if ( onetone_customize_params.onetone_homepage_actived === '0' ){

	var html = '<li id="accordion-panel-page_content_panel" data-name="page_content_panel" class="accordion-section control-section control-panel control-panel-mesmerize-customizer-panels-contentpanel" aria-owns="sub-accordion-panel-page_content_panel" style=""><h3 class="accordion-section-title no-chevron" tabindex="0">'+onetone_customize_params.i18n01+'</h3><div class="sections-list-reorder"><div class="reiki-needed-container" data-type="select" style="display: block;"><div class="description customize-section-description"><span>'+onetone_customize_params.i18n02+'</span><a class="button button-primary button-large onetone-create-frontpage">'+onetone_customize_params.i18n03+'</a></div></div></div></li>';
	$('#accordion-section-publish_settings').after(html);
}
}, 1000);

} );


$('#customize-theme-controls > ul').prepend('<li id="accordion-section-importer" class="accordion-section control-section control-section-importer" style="display: list-item;padding: 15px 10px 15px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;background: #fff;"><a href="#" id="import-theme-options" class="button">'+onetone_customize_params.import_options+'</a><div class="import-status"></div></li>');



	$(document).on('click','#import-theme-options',function(){
			
		if(confirm( onetone_customize_params.confirm )){
			
		$('#accordion-section-importer .import-status').text(onetone_customize_params.loading);							
		$.ajax({type:"POST",dataType:"html",url:ajaxurl,data:{action:'onetone_otpions_restore'},
			success:function(data){
				$('#accordion-section-importer .import-status').text(onetone_customize_params.complete);
				location.reload() ;
			},error:function(e){
				$('#accordion-section-importer .import-status').text(onetone_customize_params.error);
		}});
		}
	});


	wp.customize.bind( 'saved', function( d ){
	if( ids !=='' ){
		$.ajax({
			url: ajaxurl,
			type: 'post',
			dataType: 'html',
			data: {
				action: 'onetone_remove_sections',
				ids: ids
			},success: function(e){
				$('#customize-control-onetone_pro-section_order ul.repeater-fields').attr('data-removed','');
			}
		});
		
	}
	
	if(sectionChanged == true ){
		var sections =  new Array();
		$('#customize-control-onetone_pro-section_order .repeater-fields li.repeater-row').each(function(index, element) {
			sections[index] = {'id':$(this).find('input[data-field="id"]').val(),'type':$(this).find('select[data-field="type"]').val()};
    	});
		
		$.ajax({
			url: ajaxurl,
			type: 'post',
			dataType: 'html',
			data: {
				action: 'onetone_create_wpml',
				sections: sections
			},success: function(e){
				console.log(e);
				}
    });
		}
});


} )( jQuery );