<%@page import="com.jg.util.JGStringUtils"%><%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
</head>
<body>
<div data-role="page">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<div id="a01003" class="a01003 rk-responsive-p">
			<script type="text/javascript">
			alert("해당 사역에 이미 지원한 이력이 있습니다.");
			location.href = JGService.requestURL(RKCommon.requestURLKey_root);
			</script>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>