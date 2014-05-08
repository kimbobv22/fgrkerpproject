<%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	boolean isAdmin_ = RKSessionData.isAdmin(request);
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="O01001" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<div id="o01001" class="o01001 rk-responsive-p" rk-content-list-count="0">
			<div class="top-search-nav" jg-dataset="o01001CondData">
				<div>
					<div class="ui-grid-a total-search-bar">
						<div class="ui-block-a"><input type="text" placeholder="단체명,주소로 검색" data-wrapper-class="search-bar" jg-column="searchText" rk-onenter="atFuncO01001_search();"></div>
						<div class="ui-block-b"><a href="javascript:atFuncO01001_search();" class="ui-btn ui-btn-c">검색</a></div>
					</div>
					<div class="ui-grid-a ui-responsive">
						<div class="ui-block-a">
							<select jg-column="orgArea1" jg-bind-dataset="o01001Area1Data" jg-value-column="ID" jg-display-column="NM"><option>지역1</option></select>
						</div>
						<div class="ui-block-b">
							<select jg-column="orgArea2" jg-bind-dataset="o01001Area2Data" jg-value-column="ID" jg-display-column="NM"><option>지역2</option></select>
						</div>
					</div>
				</div>
			</div>
			<div class="org-handle-btn"><a href="javascript:atFuncO01001_newOrganizationInfo();" class="ui-btn rk-responsive-r">새로운 단체 추가</a></div>
			<div class="org-list" jg-dataset="o01001OraganizationData">
				<div class="org-list-row rk-color-white-back-cursor rk-color-gray2-border-b-last-child rk-color-gray2-border-t">
					<h3><a href="javascript:void(0);" onClick="atFuncO01001_organizationDetailView(this);" jg-column="ORG_NM" rk-org-id="##fx:##ORG_ID##"></a></h3>
					<h4 class="rk-color-gray5"><span jg-column="STUFF_NM1"></span>/<span jg-column="STUFF_PHONE1"></span></h4>
					<p jg-column="ADDRESS" class="rk-label rk-label-small-l1"></p>
				</div>
			</div>
			<div class="no-row"><h4>검색된 단체가 없습니다</h4></div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>