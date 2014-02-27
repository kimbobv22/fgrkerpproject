<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%

%><!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true"><jsp:param value="M01001" name="pageName"/></jsp:include>
</head>
<body>
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div id="m01001" class="m01001">
		hello world!
		
		<div rk-map-view="경기도 남양주시 별내면 청학리 418-3 금강프라자 502호" class="rk-responsive-p" style="height: 1300px;"></div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</body>
</html>