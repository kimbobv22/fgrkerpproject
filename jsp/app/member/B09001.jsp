<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	String userSid_ = (String)request.getAttribute("userSid");
%><!DOCTYPE html>
<html>
<body>
<!--<script type="text/javascript">
if(window.opener._atOAuthCallback !== null && window.opener._atOAuthCallback !== undefined)
	window.opener._atOAuthCallback(<%=userSid_ == null ? "undefined" : "'"+userSid_+"'"%>);
this.close();
</script>-->
<%=userSid_ %>
</body>
</html>