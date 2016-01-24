var Shopping = function () {
    return Shopping.fn.init();
}

var max_hour = 22;

// Declare
Shopping.fn = Shopping.prototype = {
    $modal: null,
    $detail: null,
    $cartNum: null,
    checkoutStep:'payer',
    $flashMessage:null,
    $topMenu: null,
    $header: null,
    timer: null,
    $clock: null,
    // tao su kien cho button dat hang
    initOrderButton:function($html){
        var _this = this;
        $html.find('[data-type="order"]').click(function(event){
            event.preventDefault();
            var $cur = $(this);
            $cur.prop('disabled', true).html('Đang xử lý...');
            var data = $cur.closest('form').serialize();

            // function ajax_post_update(url, data, succ_message, update, callback, is_json){
            ajax_post_update("/" + $('body').data('shopping_url') + "/addorder", data, null, null, function(resp){
                $cur.prop('disabled', false).html('Thêm vào giỏ hàng <i class="fa fa-shopping-cart"></i>');
                if(resp.code == 'ok'){
                    _this.incCartNumber(1);
                    // show flash message
                    _this.showFlashMessage(resp.text, true);
                } else {
                    _this.showFlashMessage(resp.text, false);
                }
            }, true);
        });
    },
    /**
     * Show message
     */
    showFlashMessage:function(msg, code){

        clearTimeout(this.timer);

        var time = 3000;
        if(code == false){
            time = 10000 ;
            this.$flashMessage.attr('class', 'alert alert-danger');
        } else {
            this.$flashMessage.attr('class', 'alert alert-success');
        }

        // show flash message
        this.$flashMessage
                .html(msg)
                .css('margin-left', (- this.$flashMessage.width() / 2) + "px" )
                .fadeIn();

        // set thoi gian an
        this.timer = setTimeout(function(){
            shopping.$flashMessage.fadeOut("fast");
        }, time);
    },
    initDetailFormEvent:function($html){
        this.$detail = $('.item-details');
        var $mainImage = this.$detail.find('.img img');

        // init thumbs image
        this.$detail.find('.thumbs a').click(function(event){
            event.preventDefault();
            var $_cur = $(this);
            $_cur.siblings().removeClass('active');
            $_cur.addClass('active');

            $mainImage.attr('src', $_cur.data('image'));
        });

        this.initOrderButton(this.$detail);
    },

    /**
     * Khi scroll xuong thi cho toolbar nay noi len tren de de thao tac
     */
    fixTopMenu:function(){
        var _this = this;
        window.onscroll = function(event){
            if(document.body.scrollTop > 200){
                _this.$topMenu.addClass('float');
                _this.$clock.css('top', '90px');
                _this.$header.hide();
            } else {
                _this.$topMenu.removeClass('float');
                _this.$clock.css('top', '150px');
                _this.$header.show();
            }
        }
    },

    initChecker:function($html){
        $html.find('.checker').change(function(){
            var _this = $(this);
            _this.prev().val( _this.is(':checked') ? '1': '0');
        });
    },
    //---------------------------------------
    //select all test cua anh phuc
    //---------------------------------------
    selectAllText:function(obj) {
        $(obj).focus().select();
    },

    checkReviewOrder:function(){
        if($('#accept').is(':checked')){
            return true;
        } else {
            alert('Bạn phải chọn chấp nhận điều kiện mua hàng tại trang web của chúng tôi mới có thể tiếp tục tiến hành đặt hàng.')
            return false;
        }
    },
    initItemOfOrderEvent:function($html){
        var _this = this;

        $html.find('[data-id]').click(function(event){
            event.preventDefault();
            var $btn = $(this);
            if(confirm('Bạn có chắc chắn muốn xoá sản phẩm hoa này khỏi đơn hàng không?')){

                var index = null;
                if($btn.data('type') == 'order'){
                    index = $btn.closest('tr').index();
                } else {
                    index = $btn.closest('.panel').index() - 1;
                }

                ajax_post_update('/shopping/rmitem', {id:index}, false, false, function(resp){
                    if(resp.code === 'ok'){
                          $html.find('#total-money strong').html(resp.total);

                          if($btn.closest('.modal-dialog').length > 0 ){
                              $btn.closest('.panel, tr').slideUp('fast', function(){ $(this).remove(); });
                              _this.incCartNumber(-1);
                              return;
                          }

                          // tru tien shipping
                          var $panel = $btn.closest('.panel');
                          var shipping = parseFloat($panel.find('#shipping-fee').data('money'));
                          var money = parseFloat($panel.find('#product-price').data('money'));
                          var $totalShipping = $('#total-shipping-fee');
                          var total = $totalShipping.data('money');
                          total -= shipping;

                          $totalShipping.data('money', total).html(formatMoney(total, 0) + 'đ');

                          // cap nhat tong tien
                          var $totalMoney = $('#total-money');
                          var totalMoney = parseFloat($totalMoney.data('money'));
                          totalMoney -= (shipping + money);
                          $totalMoney.data('money', totalMoney).html(formatMoney(totalMoney, 0) + 'đ');

                          // cap nhat vat
                          var $vat = $('#vat-money');
                          var vat = parseFloat($vat.data('money'));
                          vat = (totalMoney * 0.1);
                          $vat.data('money', vat).html(formatMoney(vat, 0) + 'đ');

                          // cap nhat tong tien phai thanh toan
                          var $summary = $('#summary-money');
                          var summary = parseFloat($summary.data('money'));
                          summary = (vat + totalMoney);
                          $summary.data('money', summary).html(formatMoney(summary, 0) + 'đ');

                          // xoa bo dong du lieu
                          $btn.closest('.panel, tr').slideUp('fast', function(){ $(this).remove(); });
                          _this.incCartNumber(-1);
                    } else {
                        alert('Xoá sản phẩm thất bại. Xin vui lòng thử lại.');
                    }
                }, true);
            }
        });
    },
    opener:null,
    openerContent:null,
    initDialog:function($html){
        var _this = this;
        $html.find('[data-dialog=1]').click(function(){
            var $cur = $(this);
            _this.openerContent = $cur.next();
            _this.opener = window.open($cur.data('url'), "win-sub", "width=900, height=500");

            return false;
        });
    },

    _checkPanelOfCheckout:function(event, obj, checkPrev){
        var $panel = $(obj).closest('.panel');
        if(checkPrev && $panel.prev('.panel').length){
            $panel = $panel.prev('.panel');
        }

        var error = false;
        $panel.find('[required=on]').each(function(){
            var $cur = $(this);
            if($.trim($cur.val()).length == 0 ){
                $cur.css('background', '#FFD5D5');
                error = true;
            } else {
                $cur.css('background', '');
            }
        });

        if(!error){
            $panel.data('passed', 1);
        }

        return error;
    },

    savePhone:function(){
        $('#savePhone').click(function(e){
            e.preventDefault();
            var $form = $(this).closest('form');
            var phone = $form.find('#ContactPhone').val();
            if($.trim(phone).length == 0){
                alert('Bạn chưa nhập số điện thoại.');
                return;
            }

            ajax_post_update("/contacts/add", {phone:phone}, null, null, function(resp){
                alert(resp.msg);
                if(resp.code == 'ok'){
                    $form.find('#ContactPhone').val('')
                }

            }, true);
        });
    },

    /**
     * Cung 1 dia chi nguoi nhan cho tat ca cac don hang
     */
    checkSameDestination:function(obj){
        var $cur = $(obj);
        var $form = $cur.closest('.form-block');
        var $panel = $form.closest('.panel-body');
        var $shipping = $panel.find('#shipping-fee');
        if($cur.is(':checked')){

            // disable address controls
            $form.find('input, select').prop('disabled', true).removeAttr('required');
            $cur.prop('disabled', false);
            $cur.prev().prop('disabled', false);

            // disable date - time
            $panel.find('.date-time .dakepicker, .date-time select').prop('disabled', true).removeAttr('required');

            // set gia tri giao nhan ve 0
            var fee = $shipping.data('money');
            $shipping.data('old-fee', fee).html('Miễn phí');
            this.updateShippingFee(0, fee);
        } else {
            // enable address controls
            $form.find('input, select').prop('disabled', false).attr('required', 'on');
            $form.find('.no-need-delivery, [data-no-required]').removeAttr('required');
            $cur.removeAttr('required');

            // enable date - time
            $panel.find('.date-time .dakepicker, .date-time select').prop('disabled', false).attr('required', 'on');

            // lay phi van chuyen ban dau
            var fee = parseFloat($shipping.data('old-fee'));
            $shipping.data('money', fee).html(formatMoney(fee));
            this.updateShippingFee(fee, 0);
        }
    },
    /**
     * Cap nhat phi van chuyen
     */
    updateShippingFee:function(newFee, currFee){
        var margin = parseFloat(newFee) - parseFloat(currFee);
        var fee = parseFloat(this.checkoutItem.$totalShipping.data('money'));
        fee += margin;

        this.checkoutItem.$totalShipping.data('money', fee).html(formatMoney(fee));
        this.updateSummaryMoney(newFee, currFee);
        this.updateSummaryMoney(newFee, currFee);
    },

    /**
     * khai bao validator cho checkout page
     */
    initValidatorForCheckout:function($html){
        var _this = this;

        $html.find('.panel-title a').first().click(function(event){
            event.preventDefault();
            var error = _this._checkPanelOfCheckout(event, this, true);
            if(error){
                alert('Có lỗi xảy ra ở phần thông tin đang hiển thị. Xin vui lòng nhập thông tin trước khi qua phần kế tiếp.');
                event.stopPropagation();
                return error;
            };
        });

        // change country
        $html.find('.country').change(function(){
            var $cur = $(this);
            if($cur.val() != 'vn' ){
                $cur.closest('.form-group').next().hide().find('select').removeAttr('required');
            } else {
                $cur.closest('.form-group').next().show().find('select').attr('required', 'on');
            }
        });

        // check all panel
        $html.find('.btn-success').click(function(event){

            var error = false;

            $html.find('.panel').each(function(_event){
                var $panel = $(this);
                if(!$panel.data('passed')){
                    $panel.addClass('in');
                    error = _this._checkPanelOfCheckout(event, $panel, false);
                    return;
                }
            });

            if(error){
                alert('Có lỗi xảy ra ở phần thông tin đang hiển thị. Xin vui lòng nhập thông tin trước khi thanh toán.');
                return false;
            } else {
                // go bo nhung disabled
                $('.receiver input[type=text][disabled]').prop('disabled', false);
                return true;
            }

        });
    },

    // chua nhung doi tuong se su dung nhieu trong checkout page
    checkoutItem:{
        $totalShipping:null,
        $totalMoney:null,
        $summary:null,
        $vat:null,
    },

    // chua nhung doi tuong se su dung nhieu trong checkout page
    reviewItem:{
        $totalShipFee:null,
        $totalCredit:null,
        $totalMoney:null,
        $vat:null,
        $totalShipAndMoney:null,
        $panelPayment:null
    },

    /**
     * Khoi tao cac su kien cho trang review
     */
    bindEventForReviewPage:function(){
        var $body = $('body');
        this.reviewItem.$vat = $body.find('#vat-money');
        this.reviewItem.$totalMoney = $body.find('#summary');
        this.reviewItem.$totalCredit = $body.find('#summary_credit');
        this.reviewItem.$totalShipFee = $body.find('#total-shipping-fee');
        this.reviewItem.$totalShipAndMoney = $body.find('#total-money');
        this.reviewItem.$panelPayment = $body.find('#panel-payment');

        this.initUsePromoCode();
        var _this = this;
        var $remain = $body.find('#total-remain');
        var $credit = $body.find('.payment-credit input[type=checkbox]');

        $credit.change(function(){

            var $cur  = $(this);

            // lay cac so tien hien tai
            var credit = parseFloat($cur.data('money'));
            var totalShipAndMoney = parseFloat(_this.reviewItem.$totalShipAndMoney.attr('data-money'));

            var remain = 0;

            if($cur.is(':checked')){
                remain = totalShipAndMoney - credit;
            } else {
                remain = totalShipAndMoney;
            }
            var vat = 0;
            if(_this.reviewItem.$vat.closest('tr').is(':visible')){
                vat = remain * 0.1; // (money + ship_fee)  * 0.1;
            }
            var total = vat + remain;

            $remain.attr('data-money', remain).html(formatMoney(remain) + "đ");
            _this.reviewItem.$vat.attr('data-money', vat).html(formatMoney(vat) + "đ");
            _this.reviewItem.$totalMoney.attr('data-summary', total).html(formatMoney(total) + "đ");
        });

        $credit.change();
    },
    /**
     * Khoi tao cac su kien cho trang checkout
     */
    bindEventForCheckoutPage:function(){
        this.checkoutItem.$summary = $('#summary-money');
        this.checkoutItem.$totalShipping = $('#total-shipping-fee');
        this.checkoutItem.$totalMoney = $('#total-money');
        this.checkoutItem.$vat = $('#vat-money');

        var $html = $('#cart');
        this.initItemOfOrderEvent($html);
        this.initValidatorForCheckout($html);
        this.checkSameAddress(null, true);
        this.initInvoiceInfo($html);
        this.initAutocompleteOrderUser($html);
        this.initDeliveryHours($html);
        this.noNeedDelivery($html);
        this.initAddressExists($html);
        this.initChangeSize($html);
        this.initChecker($html);
        this.initDialog($html);
        this.removeSubProduct($html);

        var _this = this;

        $html.find('[name="data[Bill][district_to_id][]"]').each(function(){
            _this.initDistrict($(this));
        });

        // init check for destinate

        $html.find('.check-same-destination').each(function(){
            var $cur = $(this);
            if($cur.is(':checked')){
                _this.checkSameDestination(this);
            }
        });

    },
    /**
     * Thay doi kich thuoc san pham
     */
    initChangeSize:function($html){
        var _this = this;
        $html.find('.sizes input[type="radio"]').change(function(event){
            var $cur = $(this);
            var $table = $cur.closest('.table');
            var $price = $table.find('#product-price');
            var money = $cur.data('money')
            var current = $price.data('money');

            $price.data('money', money).find('strong').html($cur.data('money-format'));

            _this.updateSummaryMoney(money, current);
        });
    },

    sendSMSVerify:function(){
        var _this = this;
        $('[data-send-code="1"]').click(function(){
            ajax_post_update("/member/users/sendsms", {OK:1}, null, null, function(resp){
                if(resp.code == 'ok'){
                    _this.showFlashMessage(resp.msg, true);
                } else {
                    _this.showFlashMessage(resp.msg, false);
                }
            }, true);

            return false;
        });
    },

    /**
     * Lay thong tin nguoi nhan tu 1 dia chi da luu
     */
    initAddressExists:function($html){
        $html.find('.address-exist').change(function(){
            var $cur = $(this);
            loadAjax("/shopping/address/" + $cur.val(), 'get', null, true, false, function(resp){
                if(resp.code == 'ok'){
                    // fill data
                    var $contain = $cur.closest('.form-block-content');
                    $contain.find('#BillNameTo').val(resp.data.user_name);
                    $contain.find('#BillEmailTo').val(resp.data.email);
                    $contain.find('#BillPhoneTo').val(resp.data.tel);
                    $contain.find('#province-to').val(resp.data.province_id).change();
                    setTimeout(function(){
                        $contain.find('#district_id').val(resp.data.district_id).change();
                    }, 2000);
                    $contain.find('#BillAddressTo').val(resp.data.address);
                } else {
                    // not found
                }
            });
        });
    },

    /**
    * Chi cho phep chon 3 gio lien tiep tinh tu thoi diem bat dau
    */
    initDeliveryHours:function($html){
        $html.find('.start-hour').each(function(){
            $(this).change(function(){
                var $cur = $(this);

                var $next = $cur.next().next();
                // tinh thoi gian
                var arr = $cur.val().split(':');
                var start = parseInt(arr[0], 10);
                var end = max_hour - start;
                var margin = parseInt($cur.data('h-margin'));
                if(!margin){
                    margin = 3;
                }
                $next.html('<option value="">---</option>');
                for( var i = margin; i < end; i++){
                    var value = (start + i) + ':00';
                    $next.append('<option value="' + value + '">' + value + '</option>');
                }

                var value = '22:00';
                $next.append('<option value="' + value + '">' + value + '</option>');
            });
        });
    },

    initAutocompleteOrderUser:function($html){
        $html.find('#BillPhoneFrom').focusout(function(){
            var $form = $html.find('.form-horizontal');

            // find user with phone
            loadAjax('/shopping/findUser/' + $(this).val(), 'get', null, true, false, function(resp){
                if(resp.customer){
                    // set value
                    var $BillNameFrom = $form.find('#BillNameFrom');
                    if($BillNameFrom.val().length == 0 ){
                        $BillNameFrom.val(resp.customer.real_name);
                    }

                    var $BillEmail = $form.find('#BillEmail');
                    if($BillEmail.val().length == 0 ){
                        $BillEmail.val(resp.customer.email);
                    }

                    var $BillAddressFrom = $form.find('#BillAddressFrom');
                    if($BillAddressFrom.val().length == 0 ){
                        $BillAddressFrom.val(resp.customer.address);
                    }

                    var $provice_from = $form.find('#provice-from');

                    $provice_from.val(resp.customer.province_id);
                    $provice_from.change();


                    setTimeout(function(){
                        var $district_from = $form.find('#district_id');
                        //if($district_from.val().length == 0 ){
                            $district_from.val(resp.customer.district_id);
                        //}
                    }, 1500);


                }
            }, true, true);

        });
    },

    initInvoiceInfo:function($html){
        var _this = this;

        var $invoice = $html.find('#invoice');
        $html.find('#BillHasInvoice').change(function(){
            if($(this).is(':checked')){
                $html.find('#invoice').show();
                $invoice.find('[data-required]').attr('required', 'on');
                $('#vat_field').show();
            } else {
                $html.find('#invoice').hide();
                $('#vat_field').hide();
                // change required to off
                $invoice.find('[data-required]').removeAttr('required');
            }

            _this.updateSummaryMoney(0, 0);
        });

        $html.find('#CompanyInfoTaxCode').focusout(function(){
            var $form = $html.find('.form-horizontal');

            // find user with phone
            loadAjax('/shopping/findCompany/' + $(this).val(), 'get', null, true, false, function(resp){
                if(resp.company){
                    // set value
                    var $CompanyInfoCompanyName = $form.find('#CompanyInfoCompanyName');
                    if($CompanyInfoCompanyName.val().length == 0 ){
                        $CompanyInfoCompanyName.val(resp.company.company_name);
                    }

                    var $CompanyInfoAddress = $form.find('#CompanyInfoAddress');
                    if($CompanyInfoAddress.val().length == 0 ){
                        $CompanyInfoAddress.val(resp.company.address);
                    }

                    var $CompanyInfoAddressTo = $form.find('#CompanyInfoAddressTo');
                    if($CompanyInfoAddressTo.val().length == 0 ){
                        $CompanyInfoAddressTo.val(resp.company.address_to);
                    }

                    var $CompanyInfoPhone = $form.find('#CompanyInfoPhone');
                    if($CompanyInfoPhone.val().length == 0 ){
                        $CompanyInfoPhone.val(resp.company.phone);
                    }

                    var $CompanyInfoRealName = $form.find('#CompanyInfoRealName');
                    if($CompanyInfoRealName.val().length == 0 ){
                        $CompanyInfoRealName.val(resp.company.real_name);
                    }


                }
            }, true, true);

        });
    },

    checkSameAddress:function(obj, init){
        if(!obj){
            obj = $('.check-same-address');
        } else {
            obj = $(obj);
        }

        var _this = this;

        obj.each(function(){
            var $chk = $(this);
            var $receive = $chk.closest('.receiver');
            if($chk.is(':checked')){
                $chk.prev().val(1);
                $receive.find('input[type=text], input[type=email], select'); //.prop('disabled', true);

                if(!init){
                    // copy data
                    $('#payer').find('input, select').each(function(){
                        var $cur = $(this);
                        var $target = $receive.find($cur.data('to'));
                        $target.val($cur.val());
                        if($target.attr('id')){
                            if( $target.attr('id').indexOf('province') >= 0 ){
                                $target.change();
                            } else if($target.attr('id').indexOf('district') >= 0 ){
                                setTimeout(function(_$target, _val){
                                    var _$select = _$target.find('select');
                                    _$select.val(_val);
                                    _this.initDistrict(_$select.find('select'));

                                    _$select.change();

                                }, 1500, $target.parent(), $cur.val());
                            }
                        }
                    });
                }

            } else {
                $chk.prev().val(0);
                if(!init){
                    $receive.find('input[type=text], input[type=email], select').val(''); //.prop('disabled', false).val('');
                }
            }
            $chk.prop('disabled', false);
        });

    },

    incCartNumber:function(num){
        var $span = this.$cartNum.find('span');
        var current = parseInt($span.html());
        current += num;

        $span.html(current);
        if(current == 0){
            $span.hide;
        } else {
            $span.show();
        }
    },

    noNeedDelivery:function($html){
        $html.find('.no-need-delivery').change(function(){
            var $cur = $(this);
            var $content = $cur.closest('.form-block').find('.form-block-content');

            // chon nhan hoa tai shop
            if($cur.is(':checked')){

                $content.find('#shop-address').show();
                $cur.prev().val(1);
                // $content.closest('.panel-body').find('.dakepicker').datepicker("option", "minDate", 0);

                $cur.closest('.sub-title').prev().find('input[type="checkbox"]').prop('disabled', true);
                $content.find('input, select').each(function(){
                    if(!$(this).data('min')){
                        $(this).removeAttr('required').closest('.form-group').hide();
                    }
                });
            } else{
                $content.find('#shop-address').hide();
                var $textField = $content.closest('.panel-body').find('.dakepicker');
                var d = $textField.attr('data-newMinDate');
                if(d){
                    d = d.split('/');
                    var minDate = new Date(d[0], d[1] - 1, d[2]);
                    $textField.datepicker("option", "minDate", minDate);
                }

                $cur.prev().val(0);
                $cur.closest('.sub-title').prev().find('input[type="checkbox"]').prop('disabled', false);
                // chuyen hoa den dia chi nguoi nhan
                $content.find('input, select').each(function(){
                    var _cur = $(this);
                    if(!_cur.data('min')){
                        if(!_cur.data('no-required')){
                            _cur.attr('required', 'on');
                        }
                        _cur.closest('.form-group').show();
                    }
                });
            }
        });

        $html.find('.no-need-delivery').each(function(){
            $(this).change();
        });
    },
    /**
     * Tinh lai tien khi co 1 gia san pham nao do bi thay doi
     */
    updateSummaryMoney:function(newMoney, currMoney){
        var margin = parseFloat(newMoney) - parseFloat(currMoney);

        var totalMoney = parseFloat(this.checkoutItem.$totalMoney.data('money'));
        var vat = parseFloat(this.checkoutItem.$vat.data('money'));
        var summary = parseFloat(this.checkoutItem.$summary.data('money'));

        totalMoney += margin;

        // tinh lai tong tien
        this.checkoutItem.$totalMoney.data('money', totalMoney).html(formatMoney(totalMoney, 0) + 'đ');

        if(this.checkoutItem.$vat.closest('tr').is(':visible')){
            // cap nhat vat
            vat = (totalMoney * 0.1);
        } else {
            vat = 0;
        }

        this.checkoutItem.$vat.data('money', vat).html(formatMoney(vat, 0) + 'đ');

        // cap nhat tong tien phai thanh toan
        summary = (vat + totalMoney);
        this.checkoutItem.$summary.data('money', summary).html("<strong>" + formatMoney(summary, 0) + 'đ</strong>');
    },

    districtId:null,
    initDistrict:function($select){
        var _this = this;
        var $contain = $select.closest('.panel-body');

        $select.unbind().change(function(){
            // load phi van chuyen
            var v = $select.val();
            if(!v || v.length == 0 ){
                return;
            }

            var productPrice = parseFloat($contain.find('#product-price').attr('data-money'));
            var $date = $contain.find('[name="data[Bill][date_to][]"]');

            _this.districtId = $select.val();
            loadAjax('/shopping/getprice/' + $select.val() + '/' + productPrice + '/' + $date.data('menu') + '?idx=' + $contain.data('index') , 'get', null, true, false, function(resp){
                if(resp.money == null || resp.money == undefined){
                    $select.css('background', '#FFD5D5');
                    alert('Hệ thống không hỗ trợ vận chuyển đến quận/huyện này.');
                    return;
                }

                if(!resp.allow_delivery){
                    $select.css('background', '#FFD5D5').val('');
                    alert(resp.msg);
                    return;
                }

                $select.css('background', '');
                resp.money = parseFloat(resp.money);
                var $shippingFee = $contain.find('#shipping-fee');
                var shippingFee = parseFloat($shippingFee.attr('data-money'));
                $shippingFee.attr('data-money', resp.money).html(formatMoney(resp.money, 0) + 'đ');

                // cap nhat tien cho san pham hien tai
                var $subP = $contain.find('#sub-p');

                var s = resp.money + parseFloat($subP.prev().data('money'));
                $subP.html("<strong>" + formatMoney(s, 0) + "đ</strong>");

                // cap nhat lai tong phi van chuyen
                var money = parseFloat(_this.checkoutItem.$totalShipping.attr('data-money'));
                var margin = (resp.money - shippingFee);
                money += margin;

                _this.checkoutItem.$totalShipping.attr('data-money', money).html(formatMoney(money, 0) + 'đ');

                _this.updateSummaryMoney(margin, 0);

                // neu so tien > 120 K thi chi duoc giao hang tu 11:00AM tro di
                var $hour = $contain.find('.start-hour').first();

                if(resp.money >= 120000){
                    var start = 11;
                    var end = max_hour - start;
                    $hour.html('<option value="">---</option>');
                    for( var i = 0; i < end; i++){
                        var value = (start + i) + ':00';
                        $hour.append('<option value="' + value + '">' + value + '</option>');
                    }

                    $hour.parent().next().show();
                } else {
                    var start = $hour.data('start');
                    var end = max_hour - start;
                    $hour.html('<option value="">---</option>');
                    for( var i = 0; i < end; i++){
                        var value = (start + i) + ':00';
                        $hour.append('<option value="' + value + '">' + value + '</option>');
                    }

                    $hour.parent().next().hide();
                }

                $hour.data('h', start);

                // set min - max date for .datepicker
                if(resp.campain && resp.campain.date_min){
                    var $date = $hour.closest('.form-block-content').find('input[name="data[Bill][date_to][]"]');

                    var d = resp.campain.date_min.split('/');
                    var minDate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]));

                    // get max date
                    d = resp.campain.date_max.split('/');
                    var maxDate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]));

                    $date.datepicker("option", 'minDate' , minDate);
                    $date.datepicker("option", 'maxDate' , maxDate);
                    $date.attr('data-newMinDate', resp.campain.date_min);
                }

            }, true, true);
        });
    },
    loadDistrict:function(provinceID, $update, name, query){
        if(!query){
            query = '';
        }

        var _this = this;

        // loadAjax(url, type, update, async, append, callback, loading, rem_code )
        loadAjax('/floweradmin/shippings/districts/' + provinceID + '/' + name + '?' + query , 'get', $update, true, false, function(){
            _this.initDistrict($update.find('select'));
        }, true, true);
    },

    cancelBill:function($cur){
        var _this = this;
        if(confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')){
            ajax_post_update("/shopping/cancelBill", {id:$cur.data('id')}, null, null, function(resp){
                if(resp.code == 'ok'){
                    $cur.closest('tr').remove();
                    _this.showFlashMessage(resp.msg, true);
                } else {
                    _this.showFlashMessage(resp.msg, false);
                }
            }, true);
        }
    },

    /**
     * Khoi tao su kien cho trang san pham mua kem
     */
    initRelatedPage:function(){
        var $html = $('.grid-items');
        this.relatedSelection($html);

    },

    /**
     * Xoa bo san pham kem theo
     */
    removeSubProduct:function($html){
        $html.find('.close.sub').click(function(){
            var $tr = $(this).closest('tr');
            $tr.remove();
            return false;
        });
    },
    /**
     * Them san pham kem theo vao don hang
     */
    addSubProduct:function($item){
        var $tr = $('<tr></tr>');
        var price = parseFloat($item.data('price'));
        $tr.data('money', price);
        $tr.append("<td><img style='width:35px;' src='" + $item.data('path') + $item.data('img') + "'></td>")
        $tr.append("<td>" + $item.data('name') + "</td>")
        $tr.append("<td>" + formatMoney(price, 0) + "đ</td>")

        var $td = $('<td><button class="close sub">&times;</button></td>');
        //var index = this.openerContent.data('index');

        // append hidden field
        $td.append('<input type="hidden" name="data[Product][sub_id][]" value="' + $item.data('id') + '" />');
        $td.append('<input type="hidden" name="data[Product][sub_img][]" value="' + $item.data('img') + '" />');
        $td.append('<input type="hidden" name="data[Product][sub_price][]" value="' + price + '" />');

        // append to tr
        $tr.append($td);

        this.removeSubProduct($td);

        // cap nhat lai gia tien
        //this.updateSummaryMoney(price, 0)
        this.openerContent.append($tr);
    },

    /**
     * Chọn sản phẩm
     */
    relatedSelection:function($html){
        $html.find('.btn-primary').click(function(){
            window.opener.shopping.addSubProduct($(this).closest('.item'));
            window.close();
        });
    },
    /**
     * Su dung hoac ko su dung promotion code
     */
    initUsePromoCode:function(){
        var _this = this;
        var $check = $('#use_promo_code');
        var $text = $('#promo_value');
        var remain = parseFloat($('#remain_value').data('money'));
        var promo_value = $check.data('money');
        $check.change(function(){
            if($check.is(':checked')){
                var m = Math.max(0, remain - promo_value);
                _this.reviewItem.$totalMoney.html( formatMoney(m) + "đ");
                if(m == 0){
                    _this.reviewItem.$panelPayment.hide();
                }

                $text.html($text.attr('data-text'));
            } else {
                _this.reviewItem.$totalMoney.html( formatMoney(remain) + "đ");
                $text.html('0đ');
                _this.reviewItem.$panelPayment.show();
            }
        });
    },

    init:function(){
        this.$modal = $('#myModal');
        var _this = this;
        this.$topMenu = $('.top-new-menu');
        this.$clock = $('#hot-hours');
        this.$header = this.$topMenu.prev();

        this.$cartNum = $('#cart-icon');
        this.$flashMessage = $('#flash-message');
        this.$cartNum.click(function(event){
            event.preventDefault();
            loadAjax("/" + $('body').data('shopping_url') + "/order/", 'get', false, true, false, function(_html){
                _this.$modal.find('.modal-content').html(_html).parent().width(600);
                _this.$modal.modal('show');

                // init event for order
                _this.initItemOfOrderEvent(_this.$modal.find('.modal-content'));
            });
        });

        $('.option-right .dropdown a').click(function(event){
            event.preventDefault();
            if(confirm('Khi bạn chuyển cửa hàng thì những sản phẩm đã chọn sẽ bị xóa khỏi giỏ hàng của bạn. Bạn có muốn chuyển cửa hàng không?')){
                if(window.location.href.indexOf('?')){
                    var arr = window.location.href.split('?');
                    window.location.href = arr[0] + '?prv=' + $(this).data('id');
                } else {
                    window.location.href += '?prv=' + $(this).data('id');
                }
            }
        });

        this.fixTopMenu();
    },


}

var shopping = null;


$(function(){
    shopping = new Shopping();

    $('.progress-des .fa-question-circle').popover();

    $('.dakepicker').each(function(){
        var $date = $(this);
        $date.keypress(function(){
            return false;
        });

       var minDate = 0;
       var maxDate = 25;

       // get min date
       if($date.data('min')){
           var d = $date.data('min').split('/');
           minDate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]));
       }

       // get max date
       if($date.data('max')){
           var d = $date.data('max').split('/');
           maxDate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]));
       }

       var index = $date.closest('.panel-body').data('index');

       $date.datepicker({dateFormat: "dd/mm/yy", minDate:minDate, maxDate:maxDate});
       $date.change(function(){
           var _this = $(this);

            // kiem tra ngay duoc chon co phai la ngay le hay ko
            loadAjax("/shopping/isvacation?date=" + $date.val() + "&district=" + shopping.districtId + "&index=" + index, 'get', null, true, false, function(resp){
                var $p = _this.closest('.panel-body');
                if(resp.code == 'vacation'){
                    if(resp.promotion){
                        if(resp.promotion.allow_order == "0"){
                            // show modal de thong bao cho khach hang
                            alert('Rất tiếc! chúng tôi không hỗ trợ đặt hàng Online trong ngày này. Xin vui lòng chọn ngày khác.');
                            $date.val('');
                            return;
                        }
                    }
                }

                if(resp.promotion){
                    if(resp.promotion.allow_delivery == "0"){
                        alert('Trong ngày này, chúng tôi không hỗ trợ giao hàng. Nếu cần giao hàng, xin vui lòng chọn ngày khác.');
                        var $a = $p.find('.no-need-delivery');
                        if(!$a.is(':checked')){
                            $a.click();
                        }

                        $a.attr('disabled', 'disabled');
                    } else {
                        $p.find('.no-need-delivery').prop('disabled', false);
                    }
                } else {
                    $p.find('.no-need-delivery').prop('disabled', false);
                }

                if(resp.freeShip){
                    resp.money = 0;
                    var $contain = _this.closest('.row').first();
                    var $shippingFee = $contain.find('#shipping-fee');
                    var shippingFee = parseFloat($shippingFee.attr('data-money'));
                    $shippingFee.attr('data-money', 0).html('Miễn phí');

                    // cap nhat tien cho san pham hien tai
                    var $subP = $contain.find('#sub-p');

                    var s = resp.money + parseFloat($subP.prev().data('money'));
                    $subP.html("<strong>" + formatMoney(s, 0) + "đ</strong>");

                    // cap nhat lai tong phi van chuyen
                    var money = parseFloat(shopping.checkoutItem.$totalShipping.attr('data-money'));
                    var margin = (resp.money - shippingFee);
                    money += margin;

                    shopping.checkoutItem.$totalShipping.attr('data-money', money).html(formatMoney(money, 0) + 'đ');

                    shopping.updateSummaryMoney(margin, 0);
                }

                // truong hop co the dat hang duoc
                if(_this.data('update-hour')){
                    // cap nhat lai thoi gian
                    var $hour = $("#start-hour-" + $date.data('update-hour'));
                    var dd = new Date(resp.now);

                    var start = $hour.data('h');
                    if(!start){
                        start = 7;
                    }

                    if(resp.start_time){
                        start = parseInt(resp.start_time);

                        // init start
                        $hour.html('<option value="">---</option>');
                        var value = start + ":00";
                        $hour.append('<option value="' + value + '">' + value + '</option>');
                        return;
                    }

                    if(_this.data('date') == _this.val()){
                        // ngay hien tai, thi phai lai tu thoi gian hien tai + 2 gio
                        var start = parseInt($date.data('h'), 10) + _this.data('prehour');
                        if(start <= 7){
                            start  = 10;
                        }
                    } else if($date.data('next') == $date.val() && dd.getHours() > 19){
                        // ngay tiep theo
                        var start = 10;
                    }
    //                else {
    //                    // hon 2 ngay
    //                    var start = 7;
    //                }

                    $hour.data('start', start);
                    var end = max_hour - start;
                    $hour.html('<option value="">---</option>');
                    for( var i = 0; i < end; i++){
                        var value = (start + i) + ':00';
                        $hour.append('<option value="' + value + '">' + value + '</option>');
                    }

                    // chinh lai giá bán đã giảm giá
                    if(resp.price){
                        var $price = $p.find('#product-price');
                        var $ship = $p.find('#shipping-fee');

                        var old = $price.data('money');
                        var ship = $ship.data('money');

                        // cap nhat gia
                        $price.data('money', resp.price).html("<strong>" + formatMoney(parseFloat(resp.price)) + "đ</strong>");

                        // cap nhat tong tien theo san pham
                        $price.next().html("<strong>" + formatMoney(parseFloat(resp.price) + ship) + "đ</strong>");

                        // cap nhat lai toan bo chi phi don hang
                        shopping.updateSummaryMoney(resp.price, old);
                    }
                }
            }, false, false );
       });
    });
});
