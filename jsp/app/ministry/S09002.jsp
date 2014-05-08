<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="jsp/common/view" name="targetPath"/>
	<jsp:param value="default" name="pageName"/>
</jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="S09002" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page">
	
	<div data-role="content">
		<div data-role="header" data-position="fixed">
			<h3>사역 선택</h3>
		</div>
		<div id="s09002" class="s09002 rk-responsive-p" rk-content-list-count="0">
			<div class="top-search-nav" jg-dataset="s09002CondData">
				<div>
					<div class="ui-grid-a total-search-bar">
						<div class="ui-block-a"><input type="text" placeholder="사역명,사역소개로 검색" data-wrapper-class="search-bar" jg-column="searchText" rk-onenter="atFuncS09002_search();"></div>
						<div class="ui-block-b"><a href="javascript:atFuncS09002_search();" class="ui-btn">검색</a></div>
					</div>
					<div class="ui-grid-a ui-responsive">
						<div class="ui-block-a"><select jg-column="status" jg-bind-dataset="s09002StatusData" jg-value-column="ID" jg-display-column="NM"></select></div>
						<div class="ui-block-b"><select jg-column="year" jg-bind-dataset="s09002YearData" jg-value-column="ID" jg-display-column="NM"></select></div>
					</div>
				</div>
			</div>
			<div class="ministry-list" jg-dataset="s09002MinistryList">
				<div class="ministry-list-row rk-color-white-back-cursor rk-color-gray2-border-b-last-child rk-color-gray2-border-t">
					<div class="ui-grid-a ministry-grid">
						<div class="ui-block-a">
							<h3 jg-column="MIS_TITLE"></h3>
							<h4><span class="rk-color-gray5" jg-column="STATUS_NM"></span>/<span class="rk-color-gray7" jg-column="START_DATE"></span>~<span class="rk-color-gray7" jg-column="END_DATE"></span></h4>
							<p jg-column="MIS_DESC" class="rk-label rk-label-small-l1"></p>
						</div>
						<div class="ui-block-b">
							<a href="##fx:'javascript:atFuncS09002_select(##dataset.rowIndex##);'" class="ui-btn ui-btn-c">선택</a>
						</div>
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