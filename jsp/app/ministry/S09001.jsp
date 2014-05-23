<%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	String misId_ = request.getParameter("misId");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="jsp/common/view" name="targetPath"/>
	<jsp:param value="default" name="pageName"/>
</jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="S09001" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page" class="rk-responsive-height">
	<div data-role="header" data-position="fixed">
		<h3>사역팀 선택</h3>
	</div>
	<div data-role="content">
		<div id="s09001" class="s09001 rk-responsive-p" rk-content-list-count="0" rk-mis-id="<%=misId_%>">
			<div class="top-search-nav" jg-dataset="s09001CondData">
				<div>
					<div class="ui-grid-a total-search-bar">
						<div class="ui-block-a"><input type="text" placeholder="팀명,사역구분,주소로 검색" data-wrapper-class="search-bar" jg-column="searchText" rk-onenter="atFuncS09001_search();"></div>
						<div class="ui-block-b"><a href="javascript:atFuncS09001_search();" class="ui-btn">검색</a></div>
					</div>
					<div class="category-bar ui-grid-d">
						<div class="ui-block-a">
							<select jg-column="misArea1" jg-bind-dataset="s09001Area1Data" jg-value-column="ID" jg-display-column="NM"><option>지역1</option></select>
						</div>
						<div class="ui-block-b">
							<select jg-column="misArea2" jg-bind-dataset="s09001Area2Data" jg-value-column="ID" jg-display-column="NM"><option>지역2</option></select>
						</div>
						<div class="ui-block-c"></div>
						<div class="ui-block-d">
							<select jg-column="misCtg1" jg-bind-dataset="s09001Ctg1Data" jg-value-column="ID" jg-display-column="NM"><option>사역구분1</option></select>
						</div>
						<div class="ui-block-e">
							<select jg-column="misCtg2" jg-bind-dataset="s09001Ctg2Data" jg-value-column="ID" jg-display-column="NM"><option>사역구분2</option></select>
						</div>
					</div>
				</div>
			</div>
			<div class="ministry-team-list" jg-dataset="s09001MinistryTeamList">
				<div class="ministry-team-list-row rk-color-white-back-cursor rk-color-gray2-border-b-last-child rk-color-gray2-border-t">
					<div class="ui-grid-a ministry-grid">
						<div class="ui-block-a">
							<h3 jg-column="TEAM_NM" ></h3>
							<h4 class="rk-color-gray5"><span jg-column="MIS_CTG1_NM"></span>/<span jg-column="MIS_CTG2_NM"></span></h4>
							<p jg-column="ADDRESS" class="rk-label rk-label-small-l1"></p>
						</div>
						<div class="ui-block-b">
							<a href="##fx:'javascript:atFuncS09001_select(##dataset.rowIndex##);'" class="ui-btn ui-btn-c">선택</a>
						</div>
					</div>
				</div>
			</div>
			<div class="no-row"><h4>검색된 사역팀이 없습니다</h4></div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>