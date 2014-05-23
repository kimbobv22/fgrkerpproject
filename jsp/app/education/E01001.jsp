<%@page import="com.jg.util.JGStringUtils"%><%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	String misId_ = (String)request.getAttribute("misId");
	String misTitle_ = (String)request.getAttribute("misTitle");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="E01001" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page" class="e01001" id="e01001" rk-mis-id="<%=misId_ %>" rk-mis-title="<%=misTitle_%>">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<div class="top-search-nav rk-responsive-p" jg-dataset="e01001CondData">
			<div>
				<a href="javascript:atFuncE01001_selectMinistry();" class="ui-btn">##fx:(isBlank(##mis_id##) ? '사역을 선택하세요' : ##mis_title##)</a>
			</div>
			<div class="ui-grid-a total-search-bar">
				<div class="ui-block-a"><input type="text" placeholder="사역명,사역소개로 검색" data-wrapper-class="search-bar" jg-column="searchText" rk-onenter="atFuncE05401_search();"></div>
				<div class="ui-block-b"><a href="javascript:atFuncE05401_search();" class="ui-btn">검색</a></div>
			</div>
		</div>
		<div class="rk-responsive-p">
			<div class="ministry-list ui-grid-a">
				<div class="ui-block-a">
					<span class="rk-label rk-label-small-l1 rk-color-gray8">##fx:##mis_title##</span><br/>
					<span class="rk-label rk-label-small-l2 rk-color-gray6">##fx:##mis_desc##</span>
				</div>
				<div class="ui-block-a">
					<a href="##fx:'javascript:atFuncE05401_select(##dataset.rowIndex##);'" class="ui-btn">선택</a>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>