<%@page import="com.jg.util.JGStringUtils"%>
<%@page import="rk.common.session.RKSessionData"%><%@page import="com.jg.vo.JGDataset"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	boolean isNew_ = JGStringUtils.getBoolean(request.getParameter("isNew"), false);
	boolean isAdmin_ = RKSessionData.isAdmin(request);
	String misId_ = (String)request.getAttribute("misId");
	String teamId_ = (String)request.getAttribute("teamId");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="S01003" name="pageName"/>
</jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="S01003M" name="pageName"/>
</jsp:include>
<script type="text/javascript">
$(document).ready(function(){
	atFuncS01003_refresh(
	function(dataset_){
		<%if(isNew_){%>
		dataset_.addRow();
		dataset_.setColumnValue("MIS_ID",0,"<%=request.getParameter("misId")%>",true);
		dataset_.setColumnValue("MIS_CTG1",0,"",true);
		dataset_.setColumnValue("STATUS",0,"",true);
	<%}else{%>atFuncS01003_loadMisCtg2(dataset_.getColumnValue("MIS_CTG1",0));<%}%>});
});
</script>
</head>
<body>
<div data-role="page">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<div id="s01003" class="s01003 rk-responsive-p" rk-mis-id="<%=misId_%>" rk-team-id="<%=teamId_%>">
			<div data-role="tabs" class="apply-tabs">
				<div data-role="navbar">
					<ul>
						<li><a href="#s01003TeamDataView" data-ajax="false" class="ui-btn-active">기본정보</a></li>
						<li><a href="#s01003TeamMemberDataView" data-ajax="false">팀원정보</a></li>
					</ul>
				</div>
				<div class="team-detail-view rk-content-view" jg-dataset="s01003TeamData" id="s01003TeamDataView">
					<table class="rk-content-data-view">
						<tbody>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">팀명</th>
								<td>
									<input type="text" jg-column="team_nm" required class="ui-mini">
									<label jg-error-column="team_nm"></label>
								</td>
							</tr>
							<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">팀장</th>
								<td>
									<div class="ui-grid-b leader-photo">
										<div class="ui-block-a">
											<div rk-photo rk-photo-id="##fx:##leader_photo_id##" rk-photo-readonly="readonly"></div>
										</div>
										<div class="ui-block-b"></div>
										<div class="ui-block-c">
											<span class="rk-label rk-label-small-l2 rk-label-bold">##fx:BLK(##LEADER_NM##,'팀장없음')</span><br>
											<span class="rk-label rk-label-small-l2">##fx:BLK(##LEADER_PHONE1##,'연락처 없음')</span><br>
											<div class="rk-label rk-label-small-l2 rk-color-gray5">
												<span rk-belong-label="##fx:##leader_belong_ctg1##" rk-belong-column="BELONG_NM" rk-belong-blk="소속1없음" rk-temp-belong1></span>
												/<span rk-belong-label="##fx:##leader_belong_ctg2##" rk-belong-column="BELONG_NM" rk-belong-blk="소속2없음" rk-temp-belong2></span>
											</div>
											<%if(isAdmin_){%>
											<a href="javascript:atFuncS01003_selectLeader();" class="rk-responsive-r-fixed" style="margin-left: 10px;">팀장변경</a>
											<a href="javascript:atFuncS01003_emptyLeader();" class="rk-responsive-r-fixed">삭제</a>
											<%}%>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">사역구분</th>
								<td>
									<div class="ui-grid-a ui-responsive">
										<div class="ui-block-a">
											<select jg-column="mis_ctg1" required jg-bind-dataset="GCODE_S0003" jg-display-column="CODE_DNM" jg-value-column="CODE_DID" class="ui-mini"></select>
											<label jg-error-column="mis_ctg1"></label>
										</div>
										<div class="ui-block-b">
											<select jg-column="mis_ctg2" required jg-bind-dataset="GCODE_S0005" jg-display-column="CODE_DNM" jg-value-column="CODE_DID" class="ui-mini"></select>
											<label jg-error-column="mis_ctg2"></label>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">팀상태</th>
								<td>
									<select jg-column="status" required jg-bind-dataset="GCODE_S0007" jg-display-column="CODE_DNM" jg-value-column="CODE_DID" class="ui-mini"></select>
									<label jg-error-column="status"></label>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">사역내용</th>
								<td>
									<textarea type="text" jg-column="team_desc" required class="ui-mini"></textarea>
									<label jg-error-column="team_desc"></label>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">사역일자</th>
								<td>
									<div class="ui-grid-b ministy-date">
										<div class="ui-block-a">
											<input data-role="datebox" type="date" jg-column="start_date">
										</div>
										<div class="ui-block-b">~</div>
										<div class="ui-block-c">
											<input data-role="datebox" type="date" jg-column="end_date">
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">사역지</th>
								<td>
									<span class="rk-label rk-label-small-l1">##fx:(isBlank(##ORG_ID##) ? '선택된 사역지 없음' : ##ORG_NM##)</span>
									<a href="javascript:atFuncS01003_selectOrganization();" class="ui-btn ui-btn-inline" class="ui-mini">선택</a>
									<a href="javascript:atFuncS01003_emptyOrganization();" class="##fx:!isBlank(##ORG_ID##) ? 'ui-btn ui-btn-inline' : 'ui-btn ui-btn-inline ui-disabled'">비우기</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="team-member-view rk-content-view" jg-dataset="s01003TeamMemberData" id="s01003TeamMemberDataView">
					<table class="rk-content-data-view">
						<tbody>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5"></th>
								<td>
									
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		<div class="handle-htn-frame">	
<%if(isNew_){%>
		<a href="javascript:atFuncS01003_add();" class="ui-btn rk-responsive-r ui-btn-c">사역팀 추가</a>
<%}else{%>
		<a href="javascript:atFuncS01003_update();" class="ui-btn rk-responsive-r ui-btn-c">정보수정</a>
		<a href="javascript:atFuncS01003_remove();" class="ui-btn rk-responsive-r ui-btn-d">팀 삭제</a>
<%}%>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>

</body>
</html>