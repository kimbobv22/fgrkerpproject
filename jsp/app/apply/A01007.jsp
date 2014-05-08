<%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	boolean isAdmin_ = RKSessionData.isAdmin(request);
	String misId_ = (String)request.getAttribute("misId");
	String misTitle_ = (String)request.getAttribute("misTitle");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="A01007" name="pageName"/>
</jsp:include>
<script type="text/javascript">
$(document).ready(function(){
	atFuncA01007_search();
});
</script>
</head>
<body>
<div data-role="page">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<div id="a01007" class="a01007 rk-responsive-p" rk-content-list-count="0">
			<h3>팀장 지원가능사역 및 이전지원사역 검색</h3>
			<div class="top-search-nav" jg-dataset="a01007CondData">
				<div>
					<div class="ui-grid-a total-search-bar">
						<div class="ui-block-a"><input type="text" placeholder="사역명,사역소개로 검색" data-wrapper-class="search-bar" jg-column="searchText" rk-onenter="atFuncA01007_search();"></div>
						<div class="ui-block-b"><a href="javascript:atFuncA01007_search();" class="ui-btn">검색</a></div>
					</div>
				</div>
			</div>
			<div class="ministry-list" jg-dataset="a01007MinistryList">
				<div class="ministry-list-row rk-color-white-back-cursor rk-color-gray2-border-b-last-child rk-color-gray2-border-t">
					<div>
						<h3 jg-column="MIS_TITLE"></h3>
						<h4><span class="rk-color-gray5" jg-column="STATUS_NM"></span>/<span class="rk-color-gray7" jg-column="START_DATE"></span>~<span class="rk-color-gray7" jg-column="END_DATE"></span></h4>
						<p jg-column="MIS_DESC" class="rk-label rk-label-small-l1"></p>
						<a href="##fx:'javascript:atFuncA01007_applyHandle(##dataset.rowIndex##);'" class="ui-btn">##fx:(##can_modify## === 'N' ? (##did_write## === 'Y' ? '지원서 확인하기' : '지원서 작성하기') : '지원서 작성중')</a>
					</div>
				</div>
			</div>
			<div class="no-row"><h4>검색된 사역이 없습니다</h4></div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>