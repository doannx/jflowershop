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

<title>Shop Flower</title>
</head>
<body class="computer" data-sid="" data-shopping_url="shopping">
<%-- 	<img src="${sessionScope.LOGOHEADER}" alt="38 Degree Flowers" /> --%>

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
							<li><a href="" class="">${category.name}</a></li>
						</c:forEach>
					</ul>
				</div>
			</div>
		</div>
	</div>
	</br>
	</br>
	</br>
	</br>
	</br>
	</br>

	<%-- </br> FLOWER:
	<br />
	<c:forEach var="flower" items="${sessionScope.FLOWER}">
		<c:out value="${flower.name}" />
		<c:out value="${flower.description}" />
		<img src="${flower.image}" alt="flower"
			style="width: 304px; height: 228px;">
		<c:out value="${flower.price}"></c:out>
		<br />
	</c:forEach> --%>
	<div class="padding-top-100"></div>
	<div class="wrapper" style="margin-bottom: 20px;">
		<div class="list-items items row">
			<c:forEach var="flower" items="${sessionScope.FLOWER}">
				<div class="col-sm-4">
					<div class="item img-rounded" data-id="" data-url="">
						<a target="_blank" href=""> <img alt="${flower.name}"
							src="${flower.image}" class="img-responsive">
							<div class="code" title="Click để xem chi tiết">${flower.name}</div>
						</a> <a target="_blank" href="#"> <i class="fa fa-plus-circle"></i>
						</a>
						<div class="des">
							<div class="row">
								<div class="col-xs-6">
									<div class="price">${flower.price}</div>
									<div class="promotion-price">${flower.price}</div>
								</div>
								<div class="col-xs-6 text-right">
									<a target="_blank" class="btn btn-primary btn-sm" href="#">Chi
										tiết</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</c:forEach>
			<div class="clearfix"></div>
		</div>
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
						<c:out value="${sessionScope.FOOTER }"></c:out>
						<br> Hotline: 1900 63 60 89<br> Viber phục vụ khách gọi
						từ nước ngoài: +84 128 656 6335<br> + <strong>TP Hồ
							Chí Minh</strong>: 108 Hai Bà Trưng, Phường ĐaKao, Quận 1, Hồ Chí Minh<br />
						&nbsp;&nbsp;&nbsp; * Điện thoại: (08) 3521 0864 <br /> + <strong>TP
							Hà Nội</strong>: 79E Hai Bà Trưng, P. Cửa Nam, Q. Hoàn Kiếm, Hà Nội<br />
						&nbsp;&nbsp;&nbsp; * Điện thoại: (04) 3942 3315 - (04) 3942 2675 -
						0963 582 974<br /> + <strong>TP Thượng Hải</strong>: 310 đường
						Madang, Quận HuangPu, Thượng Hải, Trung Quốc.<br />
						&nbsp;&nbsp;&nbsp; * Điện thoại: (+86) (021) 6313 1887<br />

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
</body>
</html>