<%@page import="com.jg.util.JGServletUtils"%>
<%@page import="com.jg.action.handler.JGServiceBox"%>
<%@page import="rk.common.utils.RKServletUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>리바이벌코리아 대체영상</title>
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.css" />
<script type="text/javascript" src="http://code.jquery.com/jquery-2.0.0.min.js" ></script>
<script src="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js"></script>
</head>
<body>
	<div data-role="header" data-position="fixed" data-tap-toggle="false">
		<a href="<%=JGServletUtils.getServerURL(request) %>/guide" class="ui-btn-right">홈으로</a>
		<h1 id="header-title">대체영상</h1>
	</div>
	<div data-role="content" class="ui-body">
		<div data-role="collapsible" data-content-theme="c"  data-collapsed="false">
			<h3>강의 1차 대체영상</h3>
			<div>
				<h3>개척교회가 왜 필요한가? - 배진철 목사님</h3>
				<iframe style="max-width:400px; width:100%; height:300px;" src="http://www.youtube.com/embed/FWBVzCiOT5k?feature=player_detailpage" frameborder="0" allowfullscreen></iframe>
			</div>
		</div>
		<div data-role="collapsible" data-content-theme="c"  data-collapsed="false">
			<h3>강의 2차 대체영상</h3>
			<div>
				<h3>나의 필요에 따라 예수님을 변형시키고 있나 - 김길 목사님</h3>
				<iframe src="http://player.vimeo.com/video/60999859?title=0&amp;byline=0&amp;portrait=0" style="max-width:400px; width:100%; height:300px;" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
			</div>
		</div>
		<div data-role="collapsible" data-content-theme="c"  data-collapsed="false">
			<h3>강의 3차 대체영상</h3>
			<div>
				<h3>주님이면 충분합니까? - 김용의 선교사</h3>
				<iframe src="http://player.vimeo.com/video/50966162?title=0&amp;byline=0&amp;portrait=0" style="max-width:400px; width:100%; height:300px;" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
			</div>
		</div>
		<div data-role="collapsible" data-content-theme="c"  data-collapsed="false">
			<h3>강의 4차 대체영상</h3>
			<div>
				<h3>사랑의 관계를 지켜야합니다! - 김길 목사님</h3>
				<iframe src="http://player.vimeo.com/video/56218735?title=0&amp;byline=0&amp;portrait=0" style="max-width:400px; width:100%; height:300px;" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
			</div>
		</div>
	</div>
</body>
</html>