var _loading = null;

// form so sau khi lost focus
function formatNumber(obj)
{
    obj = $(obj);
    var fix = 0;

    if( obj.attr('fix') )
        fix = parseInt( obj.attr('fix') );

    obj.blur(function(){
        var v = obj.val( );

        if( v.length == 0 ) return false;

        if( v.indexOf( ',' ) > 0 ) return;

        v = v.replaceAll( '.', '').replaceAll( ',', '.');

        obj.val( formatMoney( parseFloat( v  ), fix ) );
    });
}


function formatMoney(num, fix) {

    if( num == 0 ) return num;

    var p = num.toFixed(fix);

    if( p < 1000 )  return (p + "").replace(".", ",");

    return  p.split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "." : "") + acc;
    }, "");
}


function formatDollar(num) {

    var p = num.toFixed(2).split(".");

    return  p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "," : "") + acc;
    }, "");
}

/**
* show loading
*/
function showLoading()
{
    if( _loading == null ||  _loading.length == 0  )
    {
        _loading = jQuery('#loading');
    }

    _loading.show();
}

function removeOrderItem(index, obj)
{
    loadAjax( '/orders/rem/' + index, 'get', null, true, false, function(msg){
        $(obj).closest('tr').remove( );
    });

    return false;
}

function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

/**
* Hide loading
*/
function hideLoading()
{
    _loading.hide();
}

/**
* Hide Hover
*/
function hide_hover()
{
    clearTimeout(start_hover);
    clearTimeout(hover_timer);
    hover_content.hide();
}


 /**
 * Send private message
 */
 function show_send_message(to, obj)
 {
     var url='/Messages/sendmessage/receive:'+ to;
     return show_window_float(url, Lang.Send_Privacy_Message, obj)
 }

/*
*  ajax_post_update : Update data to server with post method
*  @param
*  url: Url to post data
*  data: Data - use  serialize : var data = $('form_id').serialize()
*  succ_message: String - message content show after post success
*  update: Container update response data after success
*          - sample: #contain, jQuery('#contain')
*
*  use : ajax_post_update('/locations/update', 'id=10&text=Michael', 'updated success', jQuery('#update'))
*/

function ajax_post_update(url, data, succ_message, update, callback, is_json){

    var responseType = 'html';
    if (is_json == true) {
        responseType = 'json';
    }

    return $.ajax({
        url: url,
        data: data,
        dataType: responseType,
        async: true,
        type: 'POST',

        complete: function(){
        },
        success: function(msg){
            if (succ_message != null && succ_message.length > 0) {
            }
            if (update != null) {
                if (typeof(update) == "string") {
                    $(update).html(msg);
                }
                else
                    if (typeof(update) == "object") {
                        update.html(msg);
                    }
            }

            if (typeof(callback) === "function") {
                callback(msg);
            }
        },
        statusCode: {
            401: function(){
            }
        },
        error: function(xhr, status, err){
        }
    });
}

function closeFloatWindow(obj, selector, remove )
{

    var target = selector;
    if( target == null )
    {
        target = $(obj);
    }
    else if( typeof(target) !== 'object' )
        target = $(obj).closest(selector);

    if( target != null  )
    {
        // target.fadeOut("fast", function(){ if( remove ) target.remove(); } );
        if( remove )
            target.remove();
        else
            target.hide();
        //isClicked = true;
        //timerResetClick = setTimeout( resetClick, 300 );

    }
    return false;
}

var _center = null;
var _left = null;
var _right = null;

function fixHeight()
{
    if( _center == null )
    {
        _center = jQuery('#center');
        _left = jQuery('#left');
        _right = jQuery('#right');

    }
    var h = _center.height();
    var l = _left.height();

    if( h < l ) return;

    var l1 = jQuery('.l-bg', _left).height();
    l1 -= 20;

    _left.height( h - l1 );
    jQuery('#l-bg', _left).height( h - l1 );

    _right.height(h);
}

/**
* Load ajax request: this function use to load content from server
*
* params:
*   - url: url request content
*   - type: GET, POST
*   - update: jQuery object
*   - async : true, false
*   - append: true -> Add more to update
              false -> remove old, add new response
*/

function loadAjax(url, type, update, async, append, callback, loading, rem_code )
{
    if( loading == null || loading == undefined ) loading = true;

    // add key to url

    if( rem_code == null )
    {
        url = url + "?ran=" + Math.random();
    }


    var responseType = 'html';
    if( update == null )
    {
        responseType = 'json';
    }

    return jQuery.ajax(
    {   url: url,
        type: type,
        dataType: responseType,
        cache:true,
        success: function(msg)
        {
            var $msg = jQuery(msg);

            // Init Hover User info
            initHoverInfo($msg);

            if( update != null && typeof(update) == 'object' )
            {
                if( !append )
                {
                    update.html( $msg );

                    /*if( jQuery('input', $msg).length == 0)
                    {
                        jQuery('textarea', $msg).focus();
                    }
                    else
                    {
                        jQuery('input', $msg).focus();
                    }*/
                }
                else
                {
                    update.append( $msg );
                }


            }

            if( typeof( callback ) === "function" )
            {

                callback(msg);


            }

            if( loading )   hideLoading( );

        },

        error: function(xhr, status, err) {
            if (xhr.status == 401)
                window.location.href = '/login';
        },

        beforeSend:function()
        {
            if( loading )  showLoading( );
        },
        async:async,

    });
}

/**
* Load ajax request: this function use to load content from server
*
* params:
*   - url: url request content
*   - type: GET, POST
*   - update: jQuery object
*   - async : true, false
*   - prepend: true -> Add more to update on top
              false -> remove old, add new response
*/

function loadAjax_prepend(url, type, update, async, prepend, callback )
{
    // add key to url
    url = url + "/k:" + userInfo.key;

    var responseType = 'html';
    if( update == null )
    {
        responseType = 'json';
    }


    jQuery.ajax(
    {   url: url,
        type: type,
        dataType: responseType,
        cache:true,
        success: function(msg)
        {
            var $msg = jQuery(msg);

            // Init Hover User info
            initHoverInfo($msg);

            if( update != null && typeof(update) == 'object' )
            {
                if( !prepend )
                {
                    update.html( $msg );
                }
                else
                {
                    update.prepend( $msg );
                }

                jQuery('#loading').remove();
            }

            if( typeof( callback ) === "function" )
            {

                callback(msg);
            }



        },
        error: function(xhr, status, err) {
            if (xhr.status == 401)
                window.location.href = '/login';
        },

        beforeSend:function()
        {
             if( update != null && typeof(update) == 'object' )
             {
                var div = "<div id='loading' style='position: absolute; top:10px; left:0'><?php echo __('Loading...'); ?></div>";
                update.after( div );
            }
        },
        async:async,

    });
}

/**
* Xóa comment
* - Nếu có model thì sẽ làm rỗng comment của model đó, nếu không có model sẽ đánh dấu xóa cho comment đó trong comment colection
*/
function removeComment(id, model)
{
    loadAjax('/comments/r/' + id + '/' + model, 'get', null, true, false, function(msg){
        if( msg.code == 'success')
        {
            jQuery('.ph_button_info').html(Lang.Remove_Comment_Success);
        }
    });

    return false;
}

/**
*  clear_form_elements: Clear data of controls of form
*
*  params: from id - #form1
*/
  function clear_form_elements(ele) {

            $(ele).find(':input').each(function () {
                switch (this.type) {
                    case 'password':
                    case 'select-multiple':
                    case 'select-one':
                    case 'text':
                    case 'textarea':
                        $(this).val('');
                        break;
                    case 'checkbox':
                    case 'radio':
                        this.checked = false;
                }
            });

        }

 /**
 * Select all checkbox
 *
 * params:
 *   flag: true-> check all; false -> uncheck all
 *   parent: element contains all check box
 */
 function select_all(flag, parent)
 {
     if( parent = null )
     {
         parent = jQuery(document);
     }
     if( flag )
     {
         jQuery(':checkbox', parent).attr('checked', 'checked' );
     }
     else
     {
         jQuery(':checkbox', parent).removeAttr('checked' );
     }
 }

 /**
 * Show message for js
 *
 * params:
 *   friend id: string
 */
var _global_message;
var _global_message_timer;

function show_message( text, type )
{
    if( typeof(_global_message) == 'undefined')
        _global_message = $('#global_message');
    if( type == "S" ) return; // ko hien thi nhung message thanh cong
    clearTimeout( _global_message_timer );

    jQuery('.alert', _global_message).html(text);
    _global_message.show();

    _global_message_timer = setTimeout( hide_message, 5000);
}

function hide_message( )
{
    clearTimeout( _global_message_timer );
    _global_message.hide();
}


 /**
 * Add follows
 *
 * params:
 *   friend id: string
 */
function addFollow(fid, obj)
{
    loadAjax( '/users/addfollow/' + fid, 'get', null, true, false, function(s)
    {
        if( s['code'] === 'success' )
        {
            // show success message
            jQuery(obj).remove();

            // show_message( Lang.Add_Follow_Success, 'info' );

        }
        else
        {
            // show error message
            // show_message( Lang.Add_Follow_Error, 'error' );
        }
    });

    return false;
}


 /**
 * Download
 *
 * params:
 *   id: string
 *   degrees : float (90)
 *   $image: object solve
 */
function download(url)
{
debug( url );
    window.location.href = url;
}


/**
* Choise user from auto complte
*/
function choosePerson(li)
{
    if( li == null ) return;

    doSentTag(li);
}



//-------------------------------------------
// select person in auto commple
//-------------------------------------------
function selectPersonItem(li) {
    choosePerson(li);
}

/**
* A simple JavaScript image loaderimage loader
* @author Cuong Tham
* @url
* @usage
* var loader = new ImageLoader('IMAGE_URL');
* //set event handler
* loader.loadEvent = function(url, image){
*   //action to perform when the image is loaded
*   document.body.appendChild(image);
* }
* loader.load();
*/

//source: http://snipplr.com/view.php?codeview&id=561
// Cross-browser implementation of element.addEventListener()
function addListener(element, type, expression, bubbling)
{
  bubbling = bubbling || false;
  if(window.addEventListener)    { // Standard
    element.addEventListener(type, expression, bubbling);
    return true;
  } else if(window.attachEvent) { // IE
    element.attachEvent('on' + type, expression);
    return true;
  } else return false;
}

var ImageLoader = function(url){
  this.url = url;
  this.image = null;
  this.loadEvent = null;
};


ImageLoader.prototype = {
  load:function(){
      this.image = document.createElement('img');
    var url = this.url;
    var image = this.image;
    var loadEvent = this.loadEvent;
    addListener(this.image, 'load', function(e){
      if(loadEvent != null){
        loadEvent(url, image);
      }
    }, false);
    this.image.src = this.url;
  },
  getImage:function(){
    return this.image;
  }
};

/**
* Function load image with url
*/
function loadImage(url, image, callback )
{
    // show loading
    showLoading();

    var loader = new ImageLoader(url);
    //set event handler
    loader.loadEvent = callback;

    loader.load();
}

//--------------------------------------------------------------------------//
// Init chat with friends
//--------------------------------------------------------------------------//
function initChat(username, full_name, avatar ){

    if( chatManager == null )
    {
        chatManager = new FoyuChat( userInfo );
    }

    var a = new Object();
    a.uname = username;
    a.full_name = full_name;
    a.avatar = avatar;
    chatManager.initChatWindow(a);
};

/**
* Show message confirm
*/
function show_message_confirm(id)
{
    var $message = jQuery(id);

    var w = jQuery(window).width();
    w = w - $message.width();
    $message.css('left', (w /2) );
    $message.show();
}

// This is the function.
String.prototype.format = function() {
    var args = arguments;
    args['{'] = '{';
    args['}'] = '}';
    return this.replace(
        /{({|}|-?[0-9]+)}/g,
        function(item) {
            var result = args[item.substring(1, item.length - 1)];
            return typeof result == 'undefined' ? '' : result;
            }
        );
};








/**
*
*/

/**
* Debug
*/
function debug(text)
{
  if( console != null )
  {
    console.log( text );
  }
}

/**
* Like
*/
function like(id, m, obj, p, pm)
{
  var url = '/like';

    var data = 'id=' + id;
    data += '&m=' + m;
    if( p != null )
    {
        data += '&p=' + p;
        data += '&pm=' + pm;
    }

    // add person
    ajax_post_update(url, data, null, null, function(msg){
          var $obj = jQuery(obj);
          var p = $obj.parent();
        var count = $obj.next();

        debug( count.attr('count')  );

        if( count.attr('count') != null )
        {
          count.html( parseInt( count.html()) + 1 );
        }
        $obj.after(Lang.Like_Thank + ' ');

        $obj.remove();

        show_message(Lang.Add_Like_Success, "S");
     });
}





//danh dau chep qua
function selectItem(li) {
    findValue(li);
}

/**
* Format user auto complete
*/
function formatItem(row) {
  var user =  "<input type='hidden' value='" + row[1] + "' /><div class='auto_item'><img class='min-avatar' src='<?php echo FILE_STATIC; ?>" + row[2] + "'/><div class='auto_user_info'><p class='username'>" + row[0] + "</p><br/></div></div>";
    return user;
}

/**
* Show input message
*/
/**
* Hide window
*/
function hideWindow() {

     hide_float_content();
     return false;
}

var notice_message = null;

function isIE()
{
return /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent);
}

var _window ;

function show_window_float( url, title, e )
{
    loadAjax(url,"get", false, true, false, function(res){
    _float_content.html(res);
    _float_content.modal({backdrop:'static'});
  });
}

var fullscreen = null;
var fn_resize_old = null;
var fn_keypress_old = null;
function show_window_fullscreen( url, title, e )
{
    if( fullscreen == null ) fullscreen = jQuery('#full-modal');
    loadAjax(url,"get", false, true, false, function(res){
    fullscreen.html(res);
    fullscreen.modal({backdrop:'static'});
    if( body == null ) body = jQuery('body');
    body.css('overflow', 'hidden');
  });
}

var body = null;
function exit_fullscreen()
{
    body.unbind('keypress').keypress = fn_keypress_old;
    body.css('overflow', 'auto');
    window.onresize = fn_resize_old;
}

function message_confirm(obj)
{
    _float_content.html(jQuery(obj).html());
    _float_content.modal();
}

var _float_content = null;

/**
* Show float content
*/
function show_float_content( url, title, e )
{
  loadAjax(url,"get", false, true, false, function(res){
    _float_content.html(res);
    _float_content.modal();
  });
}

/**
* Init ajax link
*/
function init_ajax_link( limit )
{

    if( limit != null )
    {
        limit = jQuery('#modal');
    }
    else
        limit = $('html');

    $('a', limit ).on('click', function(e){

        var o  = $(this);
        if( o.attr('ajax') != null )
        {
            var href = o.attr('href');
            debug( href );

            loadAjax( href, 'get', jQuery( o.attr('ajax') ), true, false, null, true, 1 );

            e.preventDefault();

            return false;
        }
        else
        {
            return true;
        }
    });
}
/**
* Hide float content
*/
function hide_float_content()
{
  _float_content.modal('hide')
}



var hover_timer = null;
var hover_content = null;

function getXY(e)
{
  if( !hover_content )
  {
    return new Array(0, 0);
  }

  var w = hover_content.width();
  var h = hover_content.height();
  var wnW = jQuery(document).width();
  var wnH = jQuery(document).height();

  debug( 'w:' + w + ', h : ' + h );
  debug( ' e.pageX' +  e.pageX + ', wnW : ' + wnW);

  // Set position
  if( e.pageX + w > wnW )
  {
    debug( '<<< dich qua phai' );
    wnW = e.pageX - (w - 50);
    var icon = jQuery('.ar_down', hover_content);
    icon.css('left', 270);
  }
  else
  {
    wnW = e.pageX;
  }

  debug( 'x:' + e.pageX + ', y:' + e.pageY );
  wnH = e.pageY;
  /*
  if( e.pageY - h < 0)
  {
    wnH = wnH + h;
  }
  else
  {
    wnH = e.pageY;
  }
  */

  w = wnW - 45;
  h = wnH - 40 - h ;

    debug( '=> x:' + w + ', y:' + h );

  return new Array(w, h);
}

/**
* show hover info
*/
function showHover(u, e)
{
  // clear timer
  clearTimeout(start_hover);
  clearTimeout(hover_timer);

  // var pos = getXY(e);
  var pos = jQuery(e).position();

  // show
  //   hover_content.animate({'top': pos[1],'left': pos[0]} ,100);


  loadAjax('/users/hcard/'+ u, 'get', true, true, false, function(msg){

    hover_content.html(msg);
    hover_content.show();

    hover_content.animate({'top': pos.top - hover_content.height() - 6 ,'left': pos.left} ,100);

    hover_content.mouseover(function(e){
      // clear timer
      clearTimeout(hover_timer);
    });

    hover_content.mouseout(function(e){
       clearTimeout(hover_timer);
      // Auto hide after move out is 1s
      hover_timer = setTimeout(function(){ debug('Hide1'); hover_content.hide(); clearTimeout(hover_timer); }, 2000);
    });

    // Auto hide after 2s
    hover_timer = setTimeout(function(){ debug('Hide0'); hover_content.hide(); clearTimeout(hover_timer); }, 2000);
  });
}

/**
* Init hover for user info
*/
var start_hover = null;
function initHoverInfo(parent)
{
  hover_content = jQuery( '.hover_info' );

   // Active hover user info
    jQuery('a.user', parent ).each(function(e){

    jQuery(this).mouseover(function(e){
        clearTimeout( start_hover );
        start_hover = setTimeout( showHover, 1000, jQuery(this).attr('u'), this );
      });

      jQuery(this).mouseout(function(e){
        clearTimeout( start_hover );
        // hover_content.hide();
      });
    });

}
    //------------------------------------------------------------------
    // Show entry window
    //------------------------------------------------------------------
    var $ew_container = null;
    var $arrow = null;
    var $ew_window = null;
    var $ew_window_bg = null;
    var left_min = null;

    function show_entry_window(url, e, obj)
    {
        if( left_min == null )
        {
            left_min = jQuery('#btm-ava').offset().left;
        }
        hide_ewindow();
        loadAjax(url, 'get', true, true, false, function(msg){

            var tempX, tempY;

            var $msg = jQuery(msg);


            $ew_window.html($msg).show();

            tempY = jQuery(window).height();
            tempX = jQuery(window).width();

            var l = e.pageX - 300;

            if( l < left_min ) l = left_min;
            $ew_window.css("left", l );

            /*$arrow.css("bottom", 36);
            $arrow.css("left", e.pageX - 12);
            $arrow.show();*/

            jQuery('textarea', $msg ).focus();

            jQuery(obj).addClass('active');

        });
    }

    function hide_ewindow()
    {
        $ew_window.hide();
        jQuery('.navbottom a' ).removeClass('active');
        return false;
    }

    function init_date_control(format, limit)
    {
        if( limit == null || limit == undefined )
        {
            limit = jQuery('body');
        }
        else if( typeof( limit ) !== 'object' )
        {
            limit = _float_content;
        }


        // init date controll selector
        jQuery('.input-date', limit).each(function(){
             //cai dat lich
            var $start = jQuery(this);
            $start.datepicker({numberOfMonths: 3,
            showButtonPanel: true});

            $start.datepicker( "option", "dateFormat", format );
            $start.val($start.data('value'));
            
        });
    }

    //---------------------------------------
    //more group
    // click vao xem nhieu hon cua chinh sua group
    // ẩn hiện một thẻ object jquery
    //symbol ký tự hiển thị ở đầu, mặt định bằng null
    //---------------------------------------
    function showHideObject(obj,symbol,obj_current)
    {
        var current_obj = jQuery(obj).css('display');
        if( current_obj == 'none' )
        {
            jQuery(obj).css({'display':'block'});

            if(symbol!=null)
            {
             jQuery(obj_current).html(jQuery(obj_current).html().replace('►','▼'));
            }
        }
        else
        {
          jQuery(obj).css({'display':'none'});
          if(symbol!=null)
            {
             jQuery(obj_current).html(jQuery(obj_current).html().replace('▼','►'));
            }
        }
    }

    //-------------------------------------
    // dùng để đặt giá trị cho một đối tượng
    // value: giá trị truyền vào
    // obj đối tượng nhận giá trị value
    //---------------------------------------
    function setValue(value,obj)
    {
        jQuery(obj).val(value);
    }

    function setValueHtml(value,obj)
    {
        jQuery(obj).html(value);
    }

  function checkPhone(phone)
  {
       re=/^[0][1-9][0-9]{8,9}$/;
       if(!re.test(phone))
       {
         return false;
       }
       return true;
  }

  //----------------------------------------------
  //check định dạng email
  //----------------------------------------------
  function IsValidEmail(obj_email)
  {
    var email = jQuery(obj_email).val();
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return filter.test(email);
  }


  //-------------------------------------
  //lightbox div
  // hiển thị như show_window_float nhưng không load lại ajax
  //-------------------------------------
  function showBoxContent(objContent)
  {
    showHideObject(objContent);
    jQuery(objContent).addClass('white_content');
    showHideObject('.black_overlay');
  }


  //-------------------------------------
  //lightbox div
  // hiển thị như show_window_float nhưng không load lại ajax
  //-------------------------------------
  function hideBoxContent(objContent)
  {
    jQuery(objContent).removeClass('white_content');
    showHideObject(objContent);
    showHideObject('.black_overlay');
  }


function autocomplete_focus(obj,text)
{

  var input = jQuery(obj);

  if( input.val() == text )
  {
    input.val('');
  }
}

//-----------------------------------------
//chọn một check box
//parent: class hoặc id cha
//-----------------------------------------
function checkUnique(parent,obj)
{
  var $unique = jQuery(parent+' input.unique');
  $unique.filter(':checked').not(obj).removeAttr('checked');
  jQuery(obj).attr('checked',true);
}

//---------------------------------------
//check date
// không họp lệ trả về true
//họp lệ trả về false
//---------------------------------------
function checkDate(obj_error,obj_date)
{
  var str_date = jQuery(obj_date).val();
  if(isValidateDate(str_date))
  {
    jQuery(obj_error).css({'display':'none'});
    return true;
  }
  else
  {
    jQuery(obj_error).css({'display':'block'});
    return false;
  }
}

//-----------------------------------------
//check format date
//format dd/mm/yyyy or mm/dd/yyyy
//-----------------------------------------

function isValidateDate(dtValue)
{
  var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
  return dtRegex.test(dtValue);
}


//-----------------------------------------
//so sanh 2 chuỗi thời gian định dạng thiếu dd/mm/yyyy H:i:s
//-----------------------------------------
function compareDatetime(str_start,str_end)
{


  var startDate = formatDatetime(str_start).getTime();
    var endDate = formatDatetime(str_end).getTime();

    if (startDate > endDate)
    {
        return 0;
    }
    else
    {
      if(startDate == endDate)
        {
          return 1;
        }
        else
        {
          return 2;
        }
    }
}
//-----------------------------------------------------------------------------
//Chuyển chuỗi kí tự (string) dạng dd/mm/yyyy H:i:s sang đối tượng Date
//-----------------------------------------------------------------------------
function formatDatetime(str) {

    //cắt chuỗi thành ngày tháng và giờ phút giây

    var str = str.split(' ');
    //cắt ngày
    var mdy = str[0].split('/');

    if( str.length > 1)
    {


      var time = str[1].split(':');
      var datetime;

      switch(time.length)
      {
        case 1:
          datetime = new Date(mdy[2], mdy[1], mdy[0] , time[0]);
          break;
        case 2:
          datetime = new Date(mdy[2], mdy[1], mdy[0] , time[0] , time[1]);
          break;
        case 3:
          datetime = new Date(mdy[2], mdy[1], mdy[0] , time[0] , time[1] , time[2]);
          break;
      }
      return datetime;
    }
    else
    {

      return new Date(mdy[2], mdy[1], mdy[0]);
    }
}

// Check Url Format
function isUrl( url )
{
    var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    return RegExp.test(url);
}

//--------------------------------------------
//check url
//obj_url: là id hoặc class của input
//obj_error: là object lỗi cần hiển thị
//--------------------------------------------
function checkUrl(obj_url,obj_error)
{
  //alert("sdf");
  var url = jQuery(obj_url).val();
  if(url.length == 0)
      return true;
  var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  if(isUrl(url))
  {
      if(obj_error != null)
        jQuery(obj_error).css({'display':'none'});
    return true;
  }
  else
  {
        if(obj_error != null)

          jQuery(obj_error).css({'display':'block'});
        else
            alert( Lang.Not_Url);
      return false;
  }
}

//----------------------------------------------
//cập nhật có ảnh
//obj_loading: ảnh hiển thị trong khi load
//path : đường dẫn url upload
//id_image: id ảnh của upload
//----------------------------------------------

function updateImage(path,id_image)
{
  //alert("sdfsdf");
  jQuery("#loading")
  .ajaxStart(function(){
    jQuery(this).show();
  })
  .ajaxComplete(function(){
    jQuery(this).hide();
  });

  jQuery.ajaxFileUpload
  (
    {
      url:path,
      secureuri:false,
      fileElementId:id_image,
      dataType: 'json',
      data:{name:'logan', id:'id'},
      success: function (data, status)
      {
        //jQuery('#test').html(data);
        if(typeof(data.error) != 'undefined')
        {
          if(data.error != '')
          {
            //alert("dfsf");
            //alert(data.error);
          }else
          {
            if( data.msg.length!=0 )
              alert(data.msg);
          }
        }
      },
      error: function (data, status, e)
      {
        //alert(e);
      }
    }
  )

  return false;

}

//---------------------------------------
//click vao text box thi hide text
//text: chuỗi text cần ẩn
//obj: Ẩn text của đối tượng nào.
//---------------------------------------

function hideTextDefault(obj,text)
{
  if(jQuery.trim(text)==jQuery.trim(jQuery(obj).val()))
  {
    jQuery(obj).val('');
  }
}


//---------------------------------------
//click hiên text default
//text: chuỗi text cần hiện
//obj: hiện text của đối tượng nào.
//---------------------------------------

function showTextDefault(obj,text)
{
  if(jQuery.trim(jQuery(obj).val()).length==0)
  {
    jQuery(obj).val(text);
  }
}

//----------------------------------------
//loai bo dau tieng viet
//----------------------------------------
function vi_to_en(str)
{
  str= str.toLowerCase();
  str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
  str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
  str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
  str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
  str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
  str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
  str= str.replace(/đ/g,"d");
  str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
/* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
  str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
  str= str.replace(/^\-+|\-+$/g,"");
//cắt bỏ ký tự - ở đầu và cuối chuỗi
  return str;
  }
//---------------------------------
//show string
//------------------------------------
function showStr( text, max)
{
    if(text.length > max)
        return text.substr(0,max)+'...';
    else
        return text;
}
//-----------------------------------
//check file anh
//-----------------------------------
function checkImage(obj)
{
    var _this = jQuery(obj);
      if(_this.val().length==0)
          return true;
    var name = _this.val().split('.');
    var curr_et = name[(name.length-1)];
    var et = Lang.Expansion_Image;
    et = et.split(',');

    for(i=0;i<et.length;i++)
    {
          if(et[i]==curr_et)
          {
            return true;
          }
    }
    _this.val('');
    alert( Lang.Agree_Image );
    return false
}


//-----------------------------------
//check file anh
//-----------------------------------
function checkUrlImage(obj)
{

  var _this = jQuery(obj);
    if(_this.val().length==0)
      return true;
    var name = _this.val().split('.');
    var curr_et = name[(name.length-1)];
    var et = Lang.Expansion_Image;
    et = et.split(',');

    for(i=0;i<et.length;i++)
    {
      if(et[i]==curr_et)
      {
        return true;
      }
    }
    _this.val('');
    alert(Lang.Url_Image);
    return false
}


//---------------------------------------
//gan thuoc tinh cho mot doi tuong nao do
//----------------------------------------
function setAttr( obj_set , name_attr , value_attr)
{
    jQuery(obj_set).attr(name_attr,value_attr);
}
/*
    //---------------------------------------
    //show link contact google
    //---------------------------------------
    function showContactGmail()
    {
        <?php if( !empty( $urloauth ) ) : ?>
        var w = window.open("https://www.google.com/accounts/OAuthAuthorizeToken?oauth_token=<?php echo $urloauth ?>",'callbackwindow','scrollbars=1, width=450,height=400');
        <?php endif; ?>
        return false;
    }

    //----------------------------
    //callback window gmail
    //----------------------------
    function callbackwindow(){
        userDragger.initSelection();
    }
*/

function cutStr( str , maxleng)
{
    if(str.length > maxleng)
        return '<span title = "'+str+'">'+str.substring(0,maxleng) + '...' + '</span>';
    else
        return  '<span title = "'+str+'">'+str+'</span>';
}

//=============cac hang lien quan den map google=====================
var map;
/*-----------------------------------------------
hien thi ban do
lat:gia tri lat
lng:gia tri lng
obj_lat: doi tuong can cap nhat lat vd: #lat_create
obj_lng: doi tuong can cap nhat lat vd: #lng_create
obj_adr: doi tuong can cap nhat lat vd: #address_create
obj_id: doi tuong id can lam rong
-----------------------------------------------*/

    function showMap(lat,lng,obj_lat,obj_lng,obj_adr,obj_id)
    {

        if(lat.length==0||lng.length==0)
            return false;

        //cap nhat lng, lat hay khong
        if(obj_lat!=null && obj_lng!=null)
        {

            jQuery(obj_lat).val(lat);
            jQuery(obj_lat).val(lng);
        }

        var latlng = new google.maps.LatLng(lat, lng);
        var myOptions = {
             zoom: 15,
             center: latlng,
             mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvasid"), myOptions);

          marker = new google.maps.Marker({
            position: latlng,
            draggable:true,
                map: map,
            title:Lang.Title_Map
        });

        //can cap nhat doi tuong obj_lat, obj_lng hay khong
        if(obj_lat!=null && obj_lng!=null)
        {
            google.maps.event.addListener(marker, 'dragend', function(point) {
                jQuery(obj_lat).val(point.latLng.lat());
                jQuery(obj_lng).val(point.latLng.lng());
                if(obj_id==null)
                    jQuery(obj_id).val('');
            });
        }

    }

    /*--------------------------------------------------------
        lay dia chi tim ban do
        address: dia chi can truyen vao
        obj_lat: doi tuong can cap nhat vd: '#lat_create'
        obj_lng: doi tuong can cap nhat vd: '#lng_create'
        obj_id: doi tuong can cap nhat rong obj_id
    --------------------------------------------------------*/
    function setAddressMap(address , obj_lat, obj_lng,obj_id){

        geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status)
        {

            if (status == google.maps.GeocoderStatus.OK)
            {
                //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
                map.setCenter(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                jQuery(obj_lat).val(results[0].geometry.location.lat());
                jQuery(obj_lng).val(results[0].geometry.location.lng());
                if(obj_id==null)
                    jQuery(obj_id).val('');
            } else {
                alert(Lang.No_Get_Map + status);
            }
        });
    }

    /*-----------------------------------------------------------
        lay vi tri hien tai

    -----------------------------------------------------------*/
    function getPosition()
    {
        if(!navigator.geolocation) {
            alert(Lang.Not_Get_Position);
            return;
        }

        geocoder = new google.maps.Geocoder();

        navigator.geolocation.getCurrentPosition(success_handler, error_handler);
    }


    //-------------------------------------------
    //show map cua anh phuc
    //---------------------------------------------

    function showmap(lat,lng,idmap) {

    var latlng = new google.maps.LatLng(lat, lng);

    var myOptions = {
      zoom: 15,
      scrollwheel: false,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map2 = new google.maps.Map(document.getElementById(idmap),
        myOptions);

    marker = new google.maps.Marker({
        position: latlng,
        //draggable:true,
        map: map2,
        title:Lang.Current_Position,
        });

    }

    //---------------------------------------
    //select all test cua anh phuc
    //---------------------------------------
    function selectAllText(obj) {
        jQuery(obj).focus();
        jQuery(obj).select();
    }

    //check share thoi gian
    function onCheckshare(obj)
    {
        var _this = jQuery(obj);
        if(!_this.attr('checked'))
        {
            setAttr(".spantime","disabled",true);
        }else
            setAttr(".spantime","disabled",false);
    }

    // format to money
    Number.prototype.formatMoney = function(c, d, t){
        var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }

    // Replaces all instances of the given substring.
    String.prototype.replaceAll = function(
        strTarget, // The substring you want to replace
        strSubString // The string you want to replace in.
    ){
        var strText = this;
        var intIndexOfMatch = strText.indexOf( strTarget );

        // Keep looping while an instance of the target string
        // still exists in the string.
        while (intIndexOfMatch != -1){
        // Relace out the current instance.
        strText = strText.replace( strTarget, strSubString )

        // Get the index of any next matching substring.
        intIndexOfMatch = strText.indexOf( strTarget );
        }

        // Return the updated string with ALL the target strings
        // replaced out with the new substring.
        return( strText );
    }

function loadDistrict(provinceID, $update, name, query){
    // loadAjax(url, type, update, async, append, callback, loading, rem_code )
    loadAjax('/floweradmin/shippings/districts/' + provinceID + '/' + name + '?' + query , 'get', $update, true, false, null, true, true);
}
