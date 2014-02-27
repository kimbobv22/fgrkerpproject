<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%

%><!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="B01001" name="pageName"/></jsp:include>
</head>
<body>
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div id="b01001" class="b01001">
		<div class="header-frame rk-responsive-p">
			<div class="main-logo rk-image rk-image-main-logo rk-transition rk-transition-size-fast"></div>
		</div>
		<div class="content-frame rk-responsive-p">
			<div class="button-set">
				<a href="javascript:void(0);" class="ui-btn ui-btn-c rk-responsive rk-responsive-btn rk-label rk-label-normal-l1">ACTing 로그인</a>
			</div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</body>
</html>