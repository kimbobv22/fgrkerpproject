<%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	boolean isAdmin_ = RKSessionData.isAdmin(request);
	String misId_ = (String)request.getAttribute("misId");
	String misTitle_ = (String)request.getAttribute("misTitle");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="S01001" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<div id="s01001" class="s01001 rk-responsive-p" rk-mis-id="<%=misId_%>" rk-content-list-count="0">
			<h2><%=misTitle_ %> 사역팀 검색</h2>
			<div class="top-search-nav" jg-dataset="s01001CondData">
				<div>
					<div class="ui-grid-a total-search-bar">
						<div class="ui-block-a"><input type="text" placeholder="팀명,사역구분,주소로 검색" data-wrapper-class="search-bar" jg-column="searchText" rk-onenter="atFuncS01001_search();"></div>
						<div class="ui-block-b"><a href="javascript:atFuncS01001_search();" class="ui-btn">검색</a></div>
					</div>
					<div class="category-bar ui-grid-d">
						<div class="ui-block-a">
							<select jg-column="misArea1" jg-bind-dataset="s01001Area1Data" jg-value-column="ID" jg-display-column="NM"><option>지역1</option></select>
						</div>
						<div class="ui-block-b">
							<select jg-column="misArea2" jg-bind-dataset="s01001Area2Data" jg-value-column="ID" jg-display-column="NM"><option>지역2</option></select>
						</div>
						<div class="ui-block-c"></div>
						<div class="ui-block-d">
							<select jg-column="misCtg1" jg-bind-dataset="s01001Ctg1Data" jg-value-column="ID" jg-display-column="NM"><option>사역구분1</option></select>
						</div>
						<div class="ui-block-e">
							<select jg-column="misCtg2" jg-bind-dataset="s01001Ctg2Data" jg-value-column="ID" jg-display-column="NM"><option>사역구분2</option></select>
						</div>
					</div>
				</div>
			</div>
<%if(isAdmin_){%>
			<script type="text/javascript">
			function atFuncS01001_addMinistryTeam(){
				location.href = JGService.requestURL(RKCommon.ministry.requestURLKey,{
					srvID : "newNinistryTeam"
					,misId : <%=misId_%>
				});
			}
			</script>
			<div class="ministry-team-handle">
				<a href="javascript:atFuncS01001_addMinistryTeam();" class="ui-btn rk-responsive-r">사역팀 추가</a>
			</div>
<%}%>
			<div class="ministry-team-list" jg-dataset="s01001MinistryTeamList">
				<div class="ministry-team-list-row rk-color-white-back-cursor rk-color-gray2-border-b-last-child rk-color-gray2-border-t">
					<h3><a href="javascript:void(0);" onClick="atFuncS01001_teamDetailView(this);" jg-column="TEAM_NM" rk-team-id="##fx:##TEAM_ID##"></a></h3>
					<h4 class="rk-color-gray5"><span jg-column="MIS_CTG1_NM"></span>/<span jg-column="MIS_CTG2_NM"></span></h4>
					<p jg-column="ADDRESS" class="rk-label rk-label-small-l1"></p>
				</div>
			</div>
			<div class="no-row"><h4>검색된 사역팀이 없습니다</h4></div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>