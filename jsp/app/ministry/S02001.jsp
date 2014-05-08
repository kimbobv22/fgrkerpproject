<%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	boolean isAdmin_ = RKSessionData.isAdmin(request);
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="S02001" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<div id="s02001" class="s02001 rk-responsive-p" rk-content-list-count="0">
			<h2>사역 검색</h2>
			<div class="top-search-nav" jg-dataset="s02001CondData">
				<div>
					<div class="ui-grid-a total-search-bar">
						<div class="ui-block-a"><input type="text" placeholder="사역명,사역소개로 검색" data-wrapper-class="search-bar" jg-column="searchText" rk-onenter="atFuncS02001_search();"></div>
						<div class="ui-block-b"><a href="javascript:atFuncS02001_search();" class="ui-btn">검색</a></div>
					</div>
					<div class="ui-grid-a ui-responsive">
						<div class="ui-block-a"><select jg-column="status" jg-bind-dataset="s02001StatusData" jg-value-column="ID" jg-display-column="NM"></select></div>
						<div class="ui-block-b"><select jg-column="year" jg-bind-dataset="s02001YearData" jg-value-column="ID" jg-display-column="NM"></select></div>
					</div>
				</div>
			</div>
<%if(isAdmin_){%>
			<script type="text/javascript">
			function atFuncS02001_addMinistry(){
				location.href = JGService.requestURL(RKCommon.ministry.requestURLKey,{
					srvID : "newMinistry"
				});
			}
			function atFuncS02001_ministryView(rowIndex_){
				var misData_ = JGDS("dataset","s02001MinistryList");
				location.href = JGService.requestURL(RKCommon.ministry.requestURLKey,{
					srvID : "ministryView"
					,misId : misData_.getColumnValue("MIS_ID",0)
				});
			}
			</script>
			<div class="ministry-handle">
				<a href="javascript:atFuncS02001_addMinistry();" class="ui-btn rk-responsive-r">사역 추가</a>
			</div>
<%}%>
			<div class="ministry-list" jg-dataset="s02001MinistryList">
				<div class="ministry-list-row rk-color-white-back-cursor rk-color-gray2-border-b-last-child rk-color-gray2-border-t">
					<h3><a href="javascript:void(0);" onClick="atFuncS02001_goMinistryTeamList(this);" jg-column="MIS_TITLE" rk-team-id="##fx:##MIS_ID##"></a></h3>
					<h4><span class="rk-color-gray5" jg-column="STATUS_NM"></span>/<span class="rk-color-gray7" jg-column="START_DATE"></span>~<span class="rk-color-gray7" jg-column="END_DATE"></span></h4>
					<p jg-column="MIS_DESC" class="rk-label rk-label-small-l1"></p>
					<%if(isAdmin_){%><a href="##fx:'javascript:atFuncS02001_ministryView(##dataset.rowIndex##);'" class="ui-btn rk-responsive-r">수정</a><%}%>
				</div>
			</div>
			<div class="no-row"><h4>검색된 사역이 없습니다</h4></div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>