<%@page import="com.jg.util.JGServletUtils"%><%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	String serviceUrl_ = JGServletUtils.getServerURL(request);
%><meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-title" content="RK">
<meta name="title" content="Revival Korea" />
<meta name="description" content="세계가 부흥할 때까지 Revival Korea" />
<meta property="og:type" content="article" />
<meta property="og:url" content="<%=serviceUrl_ %>" />
<meta property="og:image" content="<%=serviceUrl_%>jsp/common/image/ogMainImage.jpg" />
<meta property="og:image:type" content="image/jpeg" />
<link rel="shortcut icon" type="image/png" href="<%=serviceUrl_ %>jsp/common/image/icon/apple-touch-icon-precomposed.png" />
<link rel="apple-touch-icon" href="<%=serviceUrl_ %>jsp/common/image/icon/apple-touch-icon.png" />
<link rel="apple-touch-icon-precomposed" href="<%=serviceUrl_ %>jsp/common/image/icon/apple-touch-icon-precomposed.png" />
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<%=serviceUrl_ %>jsp/common/image/icon/apple-touch-icon-57x57-precomposed.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<%=serviceUrl_ %>jsp/common/image/icon/apple-touch-icon-72x72-precomposed.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<%=serviceUrl_ %>jsp/common/image/icon/apple-touch-icon-114x114-precomposed.png" />
<jsp:include page="/jsp/common/RKInclude.jsp" flush="true"></jsp:include>
<title>Revival Korea</title>