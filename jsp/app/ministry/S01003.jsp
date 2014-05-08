<%@page import="com.jg.util.JGStringUtils"%><%@page import="rk.common.session.RKSessionData"%><%@page import="com.jg.vo.JGDataset"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	boolean isNew_ = JGStringUtils.getBoolean(request.getParameter("isNew"), false);
	String misId_ = (String)request.getAttribute("misId");
	String teamId_ = (String)request.getAttribute("teamId");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="S01003" name="pageName"/>
</jsp:include>

<script type="text/javascript">
$(document).ready(function(){
	atFuncS01003_refresh(function(dataset_){});
});
</script>
</head>
<body>
<div data-role="page">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<div id="s01003" class="s01003 rk-responsive-p" rk-mis-id="<%=misId_%>" rk-team-id="<%=teamId_%>">
			<div class="team-detail-view rk-content-view" jg-dataset="s01003TeamData">
				<table class="rk-content-data-view">
					<tbody>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">팀명</th>
							<td jg-column="team_nm" class="rk-label rk-label-small-l1 rk-label-bold rk-color-gray8"></td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">사역구분</th>
							<td class="rk-label rk-label-small-l1 rk-color-gray8">
								<span jg-column="mis_ctg1_nm"></span>/<span jg-column="mis_ctg2_nm"></span>
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">사역내용</th>
							<td jg-column="team_desc" class="rk-label rk-label-small-l1 rk-color-gray8"></td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">사역일자</th>
							<td class="rk-label rk-label-small-l1 rk-color-gray8">
								<span jg-column="start_date"></span> ~ <span jg-column="end_date"></span>
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">사역지</th>
							<td jg-column="org_nm" class="rk-label rk-label-small-l1 rk-color-gray8"></td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5"></th>
							<td jg-column="address" class="rk-label rk-label-small-l1 rk-color-gray6"></td>
						</tr>
						<tr>
							<td colspan="2">
								<div class="map-view rk-color-gray2-back" rk-map-view="##fx:##address##"></div>
							</td>
						</tr>
					</tbody>
					
				</table>
			</div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>