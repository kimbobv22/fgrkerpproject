<%@page import="rk.common.session.RKSessionData"%>
<%@page import="com.jg.util.JGServletUtils"%><%@page import="com.jg.vo.JGDataset"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	JGDataset menuList_ = (JGDataset)request.getAttribute("menuList"); 
	String serverURL_ = JGServletUtils.getServerURL(request);
	
	boolean isExistSession_ = RKSessionData.isExistSession(request);
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="M03001" name="pageName"/>
</jsp:include>
</head>
<body>
<div>
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div id="m03001" class="m03001" data-role="content">
		<div class="rk-responsive-p">
			<%if(!isExistSession_){ %>
			<div class="login-frame"><a href="<%=serverURL_%>member" class="ui-btn rk-responsive-r" data-ajax="false">로그인</a></div>
			<%}else{ %>
			<div class="login-frame"><a href="javascript:atFuncM03001_logout();" class="ui-btn ui-btn-d rk-responsive-r" data-ajax="false">로그아웃</a></div>
			<%} %>
			<ul data-role="listview" data-inset="true" data-divider-theme="c">
			<%
			int menuCount_ = menuList_.getRowCount();
			for(int rowIndex_= 0; rowIndex_<menuCount_;++rowIndex_){
				String title_ = (String)menuList_.getColumnValue("title", rowIndex_);
				String desc_ = (String)menuList_.getColumnValue("desc", rowIndex_);
				String srvMap_ = (String)menuList_.getColumnValue("srv_map", rowIndex_);
				String srvId_ = (String)menuList_.getColumnValue("srv_id", rowIndex_);
				int lvl_ = (Integer)menuList_.getColumnValue("lvl", rowIndex_);
			%>
			
				<%if(lvl_ == 0){%>
				<li data-role="list-divider"><%=title_ %></li>
				<%}else{%>
				<li><a data-ajax="false" href="<%=serverURL_%><%=srvMap_%><%if(srvId_ != null){%>?srvID=<%=srvId_%><%}%>">
					<h2><%=title_ %></h2>
					<p><%=desc_ %></p>
				</a></li>
				<%}%>
			<%}%>
			</ul>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>