<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" href="./css/bootstrap.min.css">
<link rel="stylesheet" href="./css/font-awesome.min.css">
<link rel="stylesheet" href="./css/styles.css?v=72">
<link rel="stylesheet"
	href="./css/ui-lightness/jquery-ui-1.8.18.custom.css">

<!--<link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">-->
<script src="./js/js/jquery-1.11.1.min.js"></script>
<script src="./js/js/bootstrap.min.js"></script>
<script src="./js/js/jquery-ui.min.js"></script>
<script src="./js/functions.js"></script>
<script src="./js/js/shopping.js?v=76"></script>
<noscript>
	<meta http-equiv="refresh" content="0; URL=/pages/error">
</noscript>
<script src="https://hoa38do.com/js/tinymce/js/tinymce/tinymce.min.js"></script>
<script>
	var EDITTING_MODE = false;
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>FlowerDetail</title>
</head>
<body class="computer" data-sid="" data-shopping_url="shopping">
	<%--    <img src="${sessionScope.LOGOHEADER}" alt="38 Degree Flowers" /> --%>

	<div class="header">
		<div class="wrapper">
			<div class="row">
				<div class="col-xs-2">
					<div class="logo-38flowers" style="padding: 10px 0 10px 0;">
						<a href="/shopping"> <!--                        <img src="/img/38flower-logo.png" alt="38º Flowers" />-->
							<img src="${sessionScope.LOGOHEADER}" alt="38 Degree Flowers" />
						</a>
					</div>
				</div>

				<div class="col-xs-10">
					<h1 class="alert slogan">
						<c:out value="${sessionScope.SLOGAN }"></c:out>
					</h1>
					<div class="option-right text-right">
						<h2>Chọn thành phố bạn muốn giao hoa:</h2>
						<div class='dropdown'>
							<button class="btn btn-default dropdown-toggle" type="button"
								id="dropdownMenu1" data-toggle="dropdown">
								Hồ Chí Minh <span class="caret"></span>
							</button>
							<ul class="dropdown-menu" role="menu"
								aria-labelledby="dropdownMenu1">
								<li role="presentation"><a role="menuitem" tabindex="-1"
									href="#" data-id="1">Hồ Chí Minh</a></li>
								<li role="presentation"><a role="menuitem" tabindex="-1"
									href="#" data-id="63">Hà Nội</a></li>
							</ul>
						</div>

						<div class="func">
							<a href="/shopping/ordertracking" title="Tra cứu đơn hàng"><i
								class="fa fa-search"></i></a> <a
								href="//www.facebook.com/38degreeflowers" target="_blank"
								title="Like us on Facebook"><i class="fa fa-facebook"></i></a> <a
								id="cart-icon" href="#" title="Giỏ hàng của bạn"><i
								class="fa fa-shopping-cart"></i> <span
								class="shopping-cart-alert" style="display: none;">0</span> </a> | <a
								href="/member/users/login" title="Đăng nhập"><i
								class="fa fa-user"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- top new menu -->
	<div class="top-new-menu">
		<div class="wrapper">
			<div class="row">
				<div class="col-xs-12">
					<ul class="main-menu nav nav-justified">
						<c:forEach var="category" items="${sessionScope.CATEGORY}">
							<li><a href="home.do?categoryid=${category.id}" class="">${category.name}</a></li>
						</c:forEach>
					</ul>
				</div>
			</div>
		</div>
	</div>

	 <%-- <c:forEach var="flowerdetails" items="${sessionScope.FLOWERDETAIL}">
	<c:out value="${flowerdetails.description}" />
	</c:forEach> --%>



	<div class="padding-top-100"></div>
	<div class="wrapper" style="margin-bottom: 20px;">
		<!-- show desc -->
		<div class="desc-type">Để khuyến khích việc đặt hàng online,
			chúng tôi đang có đợt GIẢM GIÁ 30% cho các sản phẩm trong mục này.</div>



		<div class="get-phone">
			<a href="#" class="close"
				onclick="$(this).parent().hide('fast'); return false;">&times;</a>
			<form action="/contacts/add" id="ContactDetailForm" method="post"
				accept-charset="utf-8">
				<div style="display: none;">
					<input type="hidden" name="_method" value="POST" />
				</div>
				<div class="input tel required">
					<label for="ContactPhone">Nếu Quý khách có nhu cầu
						đặt hoa xin vui lòng điền số điện thoại vào bảng sau. 38◦
						Flowers sẽ liên hệ Quý khách trong thời gian sớm nhất. Đối
						với Quý khách đang ở nước ngoài, xin vui lòng liên hệ số Viber:
						+84 165 389 1949</label><input name="data[Contact][phone]"
						required="required" class="form-control" placeholder="0909..."
						maxlength="20" type="tel" id="ContactPhone" />
				</div>
				<button type="button" id="savePhone" class="btn btn-success">Gọi
					cho tôi</button>
			</form>
		</div>
		<script type="text/javascript">
			$(function() {
				setTimeout(function() {
					if (typeof (shopping) != 'undefined') {
						shopping.savePhone();
					}
				}, 1000);
			});
		</script>



		<div class="item-details page-content article">


			<div class="item-img col-xs-6 des">
				<div class="img">
					<center id="img-ctn">
						<img alt="sản phẩm #3778"
							src="https://hoa38do.com/upload/detail/52e/151104044604tulip.jpg"
							class="img-rounded img-responsive">
					</center>
					<!--        <a class="img-zoom"><i class="fa fa-search-plus"></i></a></div>-->
					<div class="thumbs">
						<center>
							<a class="active"
								data-image="https://hoa38do.com/upload/detail/52e/151104044604tulip.jpg"><span
								style="background-image: url('https://hoa38do.com/upload/thumbs/52e/151104044604tulip.jpg')"></span></a>

							<!-- hoa su dung -->


						</center>
					</div>
				</div>

				<form
					action="/shopping/detail/3778/M03-778.html?url=shopping%2Fdetail%2F3778%2FM03-778.html"
					id="ProductDetailForm" method="post" accept-charset="utf-8">
					<div style="display: none;">
						<input type="hidden" name="_method" value="POST" />
					</div>
					<input type="hidden" name="data[Product][id]" value="3778"
						id="ProductId" />
					<!-- Thong tin gia ban-->
					<div class="price-block">
						<div class="row">

							<div class="col-xs-10">
								<p>Chọn kích thước/loại sản phẩm</p>
								<label> <input type="radio" name="data[Product][size]"
									value="2" checked /> Vừa <span class="price">700.000₫</span> <span
									class="original-price">(<s>1.000.000₫</s>)
								</span>
								</label> <label> <input type="radio" name="data[Product][size]"
									value="3" /> Lớn <span class="price">1.120.000₫</span> <span
									class="original-price">(<s>1.600.000₫</s>)
								</span>
								</label>

								<!-- truong hop hoa ban le -->

							</div>

							<div class="col-xs-10 alert-warning">Sản phẩm hiện nay tạm
								hết tại Hồ Chí Minh.</div>
						</div>
					</div>
				</form>
			</div>

			<div class="des col-xs-6">
				<p>
					<span class="hotline"><i class="fa fa-phone"></i> &nbsp;
						Hotline: 1900 63 60 89</span>
				</p>
				<h1>
					Sản phẩm: <strong>M03-778</strong>
				</h1>
				<h2 class="available-list">
					<i class="fa fa-map-marker"></i> Có bán tại: <strong>Hồ
						Chí Minh</strong>
				</h2>
				<div class="des-txt">
					<p class="MsoNormal" style="margin: 6pt 0in;"
						data-mce-style="margin: 6pt 0in;">
						<strong style="color: rgb(255, 0, 0); text-align: justify;"
							data-mce-style="color: #ff0000; text-align: justify;">Trong
							tuần lễ này, chúng tôi đang có đợt GIẢM GIÁ 30% cho các sản phẩm
							trong tab này. Lưu ý: giá giảm chỉ áp dụng khi đặt hàng online,
							không áp dụng khi mua trực tiếp tại cửa hàng.</strong><br>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in;"
						data-mce-style="margin: 6pt 0in;">
						<br>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in;"
						data-mce-style="margin: 6pt 0in;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">Hoa
							Tulip là một trong những biểu tượng đặc trưng của Hà Lan. Với vẻ
							đẹp và sức quyến rũ đặc biệt , hoa Tulip tượng trưng cho sự nổi
							tiếng, giàu có và tình yêu hoàn hảo</span>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in;"
						data-mce-style="margin: 6pt 0in;">
						<strong><span
							style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">Chi
								tiết sản phẩm:</span></strong>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in 6pt 0.25in;"
						data-mce-style="margin: 6pt 0in 6pt 0.25in;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">-
							&nbsp; &nbsp; Hoa chính: Hoa Tulips (nhập khẩu)</span>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in 6pt 0.25in;"
						data-mce-style="margin: 6pt 0in 6pt 0.25in;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">-&nbsp;&nbsp;&nbsp;&nbsp;
							Hoa phụ: Hoa lá phụ có tại shop&nbsp;</span>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in 6pt 0.25in;"
						data-mce-style="margin: 6pt 0in 6pt 0.25in;">
						<br>
					</p>
					<p>
						<strong>Thiết kế có hai size:</strong><br>
					</p>
					<p class="MsoNormal" style="text-indent: -18pt; margin-left: 36pt;"
						data-mce-style="margin-left: 36.0pt; text-indent: -18.0pt; mso-list: l1 level1 lfo3; tab-stops: list 36.0pt;">-
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Size vừa: 7 hoa Tulips (nhập
						khẩu) (như hình)</p>
					<p class="MsoNormal" style="text-indent: -18pt; margin-left: 36pt;"
						data-mce-style="margin-left: 36.0pt; text-indent: -18.0pt; mso-list: l1 level1 lfo3; tab-stops: list 36.0pt;">
						- &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Size lớn:&nbsp;<span
							data-mce-style="text-indent: -24px;">15 hoa Tulips (nhập
							khẩu)&nbsp;</span>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in;"
						data-mce-style="margin: 6pt 0in;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">Hiện
							tại shop có nhiều màu hoa Tulip. Quý khách vui lòng tham khảo
							và chọn loại hoa chính xác hiện có tại link sau:</span>
					</p>
					<p class="MsoNormal"
						style="margin: 6pt 0in 6pt 0.5in; text-indent: -0.25in;"
						data-mce-style="margin: 6pt 0in 6pt 0.5in; text-indent: -0.25in;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>TP.
								Hồ Chí Minh</strong>:&nbsp;<a
							href="http://www.hoa38do.com/pages/blog/29" target="_blank"
							data-mce-href="http://www.hoa38do.com/pages/blog/29"><span
								style="color: blue" data-mce-style="color: blue;">www.hoa38do.com/pages/blog/29</span></a></span>
					</p>
					<p class="MsoNormal"
						style="margin: 6pt 0in 6pt 0.5in; text-indent: -0.25in;"
						data-mce-style="margin: 6pt 0in 6pt 0.5in; text-indent: -0.25in;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Hà
								Nội</strong>:&nbsp;<a href="http://www.hoa38do.com/pages/blog/30"
							target="_blank"
							data-mce-href="http://www.hoa38do.com/pages/blog/30"><span
								style="color: blue" data-mce-style="color: blue;">www.hoa38do.com/pages/blog/30</span></a></span>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in;"
						data-mce-style="margin: 6pt 0in;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">&nbsp;</span>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in;"
						data-mce-style="margin: 6pt 0in;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">Nếu
							Quý khách không chọn màu hoa nào, chúng tôi sẽ tự màu hoa
							đẹp nhất theo thiết kế (nếu có) hoặc màu hoa đẹp nhất hiện có
							tại shop để thực hiện đơn hàng cho Quý khách</span>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in;"
						data-mce-style="margin: 6pt 0in;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">&nbsp;</span>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in;"
						data-mce-style="margin: 6pt 0in;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">&nbsp;</span>
					</p>
					<div
						style="mso-element: para-border-div; border: none; border-top: dashed windowtext 1.0pt; mso-border-top-alt: dash-small-gap windowtext .5pt; padding: 1.0pt 0in 0in 0in"
						data-mce-style="mso-element: para-border-div; border: none; border-top: dashed windowtext 1.0pt; mso-border-top-alt: dash-small-gap windowtext .5pt; padding: 1.0pt 0in 0in 0in;">
						<p class="MsoNormal"
							style="margin: 6pt 0in; border: none; padding: 0in;"
							data-mce-style="margin: 6pt 0in; border: none; padding: 0in;">
							<strong><span
								style="font-size: 8pt; font-family: Verdana, sans-serif;"
								data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">Lưu
									ý:</span></strong>
						</p>
					</div>
					<p class="MsoNormal" style="margin: 6pt 0in 6pt 17.85pt;"
						data-mce-style="margin: 6pt 0in 6pt 17.85pt;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">-
							&nbsp; &nbsp; &nbsp;Tiền thưởng trong tài khoản 38° Flowers&nbsp;<strong>không&nbsp;áp
								dụng</strong>&nbsp;để thanh toán các sản phẩm của danh mục hoa&nbsp;<strong>“Hoa
								Tulip”</strong>.&nbsp;Chi tiết sử dụng tiền thưởng Quý khách vui lòng
							tham khảo tại link:&nbsp;<a
							href="http://hoa38do.com/pages/blog/5"
							data-mce-href="http://hoa38do.com/pages/blog/5"><span
								style="color: blue;" data-mce-style="color: blue;">www.hoa38do.com/pages/blog/5</span></a>
						</span>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in 6pt 17.85pt;"
						data-mce-style="margin: 6pt 0in 6pt 17.85pt;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">-
							&nbsp; &nbsp; &nbsp;Tiền thưởng chỉ được áp dụng với các thiết kế
							của mục&nbsp;<strong>"Điểm Thưởng"</strong>&nbsp;tai link:&nbsp;<span
							style="color: blue;" data-mce-style="color: blue;"><a
								href="http://www.hoa38do.com/shopping/index/1"
								data-mce-href="http://www.hoa38do.com/shopping/index/1">www.hoa38do.com/shopping/index/1</a></span>
						</span>
					</p>
					<p class="MsoNormal"
						style="margin: 6pt 0in 6pt 17.85pt; text-align: justify;"
						data-mce-style="margin: 6pt 0in 6pt 17.85pt; text-align: justify;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							Khi thanh toán, nếu Quý Khách không có thẻ ATM hoặc thẻ Visa có
							đăng ký internet banking. Quý Khách có thể chọn hình thức "<strong>Thanh
								toán trả sau</strong>" (áp dụng cho khách hàng đã đăng ký thành viên) để
							nhận được&nbsp;<strong>Mã số đơn hàng</strong>. Sau đó, Quý Khách
							có thể đến trực tiếp cửa hàng cung cấp Mã số đơn hàng và thanh
							toán số tiền còn lại trong hóa đơn.
						</span>
					</p>
					<p class="MsoNormal"
						style="margin: 6pt 0in 6pt 17.85pt; text-align: justify;"
						data-mce-style="margin: 6pt 0in 6pt 17.85pt; text-align: justify;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;"><span
							style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 11px;"
							data-mce-style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 11px;">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								Nếu Quý khách có nhu cầu tìm các loại hoa và mẫu hoa khác trên
								webshop, xin Quý khách vui lòng liên hệ trực tiếp cửa hàng hoặc
								gọi đến&nbsp;</span><strong
							style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 11px;"
							data-mce-style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 11px;">Hotline
								1900 636 089</strong><span
							style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 11px;"
							data-mce-style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 11px;">&nbsp;để
								nhân viên shop tư vấn cho Quý khách được tốt hơn.</span></span>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in 6pt 0.25in;"
						data-mce-style="margin: 6pt 0in 6pt 0.25in;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							Mọi câu hỏi, đặt hoa hoặc khúc mắc, xin vui lòng gọi trực tiếp
							theo các số điện thoại của link sau:&nbsp;<a
							href="http://www.hoa38do.com/pages/blog/12"
							data-mce-href="http://www.hoa38do.com/pages/blog/12"><span
								style="color: blue;" data-mce-style="color: blue;">www.hoa38do.com/pages/blog/12</span></a>.
						</span>
					</p>
					<p class="MsoNormal"
						style="margin: 6pt 0in 6pt 0.25in; text-align: justify;"
						data-mce-style="margin: 6pt 0in 6pt 0.25in; text-align: justify;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							Tùy theo chất lượng và mùa hoa nên hoa lá phụ sẽ được thay thế
							bằng hoa sẵn có tại shop với giá trị tương đương mà không làm ảnh
							hưởng đến tính thẩm mỹ của sản phẩm.</span>
					</p>
					<p class="MsoNormal" style="margin: 6pt 0in 6pt 0.25in;"
						data-mce-style="margin: 6pt 0in 6pt 0.25in;">
						<span style="font-size: 8pt; font-family: Verdana, sans-serif;"
							data-mce-style="font-size: 8pt; font-family: Verdana, sans-serif;">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							Quý Khách vui lòng tham khảo kĩ "Điều Khoản Sử Dụng" tại&nbsp;<a
							href="http://hoa38do.com/termofuse"
							data-mce-href="http://hoa38do.com/termofuse"><span
								style="color: blue;" data-mce-style="color: blue;">www.hoa38do.com/termofuse</span></a>&nbsp;trước
							khi đặt hoa để đồng ý mọi điều kiện mua hàng bao gồm các trường
							hợp thay đổi do bất khả kháng (điều 4).
						</span>
					</p>
				</div>
				<!-- hien thi lich thong bao het hang -->
				<div class="more-info">

					<div class="row">
						<hr />
						<a href="#" class="btn btn-warning btn-sm pull-left"
							style="margin-right: 15px;" data-toggle="modal"
							data-target="#share-link"><i class="fa fa-link"></i> Chia sẻ
							liên kết</a> &nbsp; <a href="#"
							class="btn btn-success btn-sm pull-left" data-toggle="modal"
							data-target="#share-email"><i class="fa fa-envelope"></i>
							Chia sẻ qua mail</a> &nbsp;
						<div class="pull-left btn btn-sm btn-default" id="btn-fb-share">
							<div class="fb-share-button"
								data-href="https://hoa38do.com/shopping/detail/3778/M03-778.html?uid=&code=7df77ccf8b40f0044c21253561337f8e"
								data-layout="button_count"></div>
						</div>
						<div id="fb-root"></div>
						<script>
							(function(d, s, id) {
								var js, fjs = d.getElementsByTagName(s)[0];
								if (d.getElementById(id))
									return;
								js = d.createElement(s);
								js.id = id;
								js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&appId=1483539915251501&version=v2.0";
								fjs.parentNode.insertBefore(js, fjs);
							}(document, 'script', 'facebook-jssdk'));
						</script>

						<div class="clearfix"></div>
						<p class="help-block">* Khi chia sẻ cho bạn bè qua email hoặc
							Facebook, bạn sẽ được cộng điểm tích lũy khi có người đăng ký từ
							liên kết mà bạn chia sẻ. Số điểm này có thể sử dụng để mua sản
							phẩm của 38º Flowers</p>
					</div>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="share-link" tabindex="-1" role="dialog"
			aria-labelledby="share-link" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Đóng</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">Chia sẻ liên kết</h4>
					</div>
					<div class="modal-body">
						<p class="help-block">Sao chép liên kết bên dưới và chia sẻ
							lên Facebook, gửi qua email, skype, viber...</p>
						<input type="text" style="cursor: default;"
							onclick="shopping.selectAllText(this);" readonly
							class="form-control mt10"
							value="https://hoa38do.com/shopping/detail/3778/M03-778.html?uid=&code=7df77ccf8b40f0044c21253561337f8e">
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="share-email" tabindex="-1" role="dialog"
			aria-labelledby="share-email" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Đóng</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">Chia sẻ liên kết</h4>
					</div>
					<form action="/shopping/mshare" class="form" id="UserDetailForm"
						method="post" accept-charset="utf-8">
						<div style="display: none;">
							<input type="hidden" name="_method" value="POST" />
						</div>
						<div class="modal-body">
							<div class="form-group">
								<input type="hidden" name="data[User][share_url]"
									value="https://hoa38do.com/shopping/detail/3778/M03-778.html?uid=&amp;code=7df77ccf8b40f0044c21253561337f8e"
									id="UserShareUrl" /> <input type="hidden"
									name="data[User][redirect]"
									value="/shopping/detail/3778/M03-778.html" id="UserRedirect" />
								<div class="input textarea">
									<label for="UserEmails">Email bạn muốn chia sẻ</label>
									<textarea name="data[User][emails]" class="form-control"
										required="required"
										placeholder="Nhập địa chỉ email bạn muốn chia sẻ vào đây. Nhập nhiểu email cách nhau bằng dấu (,)."
										cols="30" rows="6" id="UserEmails"></textarea>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">Đóng</button>
							<button type="submit" class="btn btn-primary">Gửi lời
								mời</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<script>
			$(function() {
				shopping.initDetailFormEvent($('body'));
			});
		</script>
	</div>

	<div class="wrapper">
		<div class="dotted-line"></div>
		<div class="footer">
			<div class="row">

				<div class="col-xs-8">
					<p>
						38º Flowers © 2016. &nbsp; <a href="/shopping/contact">Liên hệ</a>
						&nbsp; | &nbsp; <a href="/shopping/termofuse">Điều khoản sử
							dụng</a> &nbsp; | &nbsp; <a href="/pages/archives">Blog</a> &nbsp; |
						&nbsp; <a href="/shopping/shipping">Chi phí giao hàng</a> &nbsp;
					</p>
					<p>
						Công Ty TNHH MTV HOA 38 ĐỘ.<br> Hotline: 1900 63 60 89<br>
						Viber phục vụ khách gọi từ nước ngoài: +84 165 389 1949<br> +
						<strong>TP Hồ Chí Minh</strong>: 108 Hai Bà Trưng, Phường ĐaKao,
						Quận 1, Hồ Chí Minh<br /> &nbsp;&nbsp;&nbsp; * Điện thoại: (08)
						3521 0864 <br /> + <strong>TP Hà Nội</strong>: 79E Hai Bà Trưng,
						P. Cửa Nam, Q. Hoàn Kiếm, Hà Nội<br /> &nbsp;&nbsp;&nbsp; * Điện
						thoại: (04) 3942 3315 - (04) 3942 2675 - 0963 582 974<br />
						Email: <a href="mailto:info@38degreeflowers.com">info@38degreeflowers.com</a>
				</div>
				<div class="col-xs-4 text-right">
					<span class="hotline"><i class="fa fa-phone"></i> &nbsp;
						Hotline: 1900 63 60 89</span>
					<p style="margin-top: 20px; color: #555">
						Các trình duyệt chạy tốt Webshop 38<sup>o</sup> Flowers: <br />
						Chrome 20+, Firefox 16+, Safari 5+, Internet Explorer 9+ <br /> <b>Đề
							xuất:</b> <a href="https://www.google.com/chrome/browser/">Dùng
							trình duyệt Chrome mới nhất</a>
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModal" aria-hidden="true">
		<div class="modal-dialog" style="width: 1000px">
			<div class="modal-content"></div>
		</div>
	</div>

	<!-- Modal -->
	<div id="flash-message">Thong diep ...</div>

	<script>
		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function() {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o), m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script',
				'//www.google-analytics.com/analytics.js', 'ga');

		ga('create', 'UA-5947891-14', 'auto');
		ga('send', 'pageview');
	</script>

	<!-- Google Code dành cho Thẻ tiếp thị lại -->
	<!--------------------------------------------------
Không thể liên kết thẻ tiếp thị lại với thông tin nhận dạng cá nhân hay đặt thẻ tiếp thị lại trên các trang có liên quan đến danh mục nhạy cảm. Xem thêm thông tin và hướng dẫn về cách thiết lập thẻ trên: http://google.com/ads/remarketingsetup
--------------------------------------------------->
	<script type="text/javascript">
		/* <![CDATA[ */
		var google_conversion_id = 961008981;
		var google_custom_params = window.google_tag_params;
		var google_remarketing_only = true;
		/* ]]> */
	</script>
	<script type="text/javascript"
		src="//www.googleadservices.com/pagead/conversion.js">
		
	</script>
	<noscript>
		<div style="display: inline;">
			<img height="1" width="1" style="border-style: none;" alt=""
				src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/961008981/?value=0&amp;guid=ON&amp;script=0" />
		</div>
	</noscript>
	<div id="hot-hours">
		<div class="alert alert-danger">
			<span style="color: #333"><strong>Thông báo:</strong> 38º
				Flowers nhận <font style="color: red">"Thu tiền khi giao hoa"</font>
				khi đặt hàng online. Xin Quý Khách xem thêm chi tiết: <a
				href="//hoa38do.com/pages/blog/31/Chuc-nang-thanh-toan-khi-giao-hang.html">tại
					đây</a></span>
		</div>

		<script>
			$(function() {
				setTimeout(function() {
					$('#hot-hours').animate({
						'right' : '5px'
					});
				}, 1000);
			});
		</script>
	</div>



</body>
</html>
