<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	String misId_ = (String)request.getAttribute("misId");
	String misTitle_ = (String)request.getAttribute("misTitle");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="jsp/common/view" name="targetPath"/>
	<jsp:param value="default" name="pageName"/>
</jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="O09001" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page">
	<div data-role="header" data-position="fixed">
		<h3>단체 선택</h3>
	</div>
	<div data-role="content">
		<div id="o09001" class="o09001 rk-responsive-p" rk-content-list-count="0">
			<div class="top-search-nav" jg-dataset="o09001CondData">
				<div>
					<div class="ui-grid-a total-search-bar">
						<div class="ui-block-a"><input type="text" placeholder="단체명,담당자,주소로 검색" data-wrapper-class="search-bar" jg-column="searchText" rk-onenter="atFuncO09001_search();"></div>
						<div class="ui-block-b"><a href="javascript:atFuncO09001_search();" class="ui-btn">검색</a></div>
					</div>
					<div class="ui-grid-a ui-responsive">
						<div class="ui-block-a">
							<select jg-column="orgArea1" jg-bind-dataset="o09001Area1Data" jg-value-column="ID" jg-display-column="NM"><option>지역1</option></select>
						</div>
						<div class="ui-block-b">
							<select jg-column="orgArea2" jg-bind-dataset="o09001Area2Data" jg-value-column="ID" jg-display-column="NM"><option>지역2</option></select>
						</div>
					</div>
				</div>
			</div>
			<div class="org-list" jg-dataset="o09001OraganizationData">
				<div class="org-list-row rk-color-white-back-cursor rk-color-gray2-border-b-last-child rk-color-gray2-border-t">
					<div class="ui-grid-a popup-org-list">
						<div class="ui-block-a">
							<h3 jg-column="ORG_NM" class="rk-label rk-label-normal-l1"></h3>
							<p jg-column="ADDRESS" class="rk-label rk-label-small-l1"></p>
						</div>
						<div class="ui-block-b"><a href="javascript:void(0);" onClick="##fx:'atFuncO09001_select(##dataset.rowIndex##);'" class="ui-btn">선택</a></div>
					</div>
				</div>
			</div>
			<div class="no-row"><h4>검색된 단체가 없습니다</h4></div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>