<%@page import="com.jg.util.JGStringUtils"%><%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	String misId_ = (String)request.getAttribute("misId");
	String misTitle_ = (String)request.getAttribute("misTitle");
	String eduId_ = (String)request.getAttribute("eduId");
	String eduNm_ = (String)request.getAttribute("eduNm");
	String eduDid_ = (String)request.getAttribute("eduDid");
	String eduDnm_ = (String)request.getAttribute("eduDnm");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="E05001" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page" id="e05001" class="e05001" rk-mis-id="<%=misId_%>" rk-mis-title="<%=misTitle_ %>" 
	rk-edu-id="<%=eduId_%>" rk-edu-nm="<%=eduNm_%>" rk-edu-did="<%=eduDid_%>" rk-edu-dnm="<%=eduDnm_%>">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<div class="top-search-nav rk-responsive-p" jg-dataset="e05001CondData">
			<div>
				<h3 class="rk-color-gray8">##fx:isBlank(##mis_id##) ? "선택사역없음" : ##mis_title##</h3>
				<h4 class="rk-color-gray6">##fx:(isBlank(##edu_id##) ? "선택교육없음" : ##edu_nm##)+" / "+(isBlank(##edu_did##) ? "선택세부교육없음" : ##edu_dnm##)</h4>
				<div class="ui-grid-a total-search-bar">
					<div class="ui-block-a"><input type="text" placeholder="이름,연락처으로 검색" data-wrapper-class="search-bar" jg-column="SEARCH_TEXT" rk-onenter="atFuncE05001_search();"></div>
					<div class="ui-block-b"><a href="javascript:atFuncE05001_search();" class="ui-btn">검색</a></div>
				</div>
				<div class="ui-grid-b ui-responsive belong-bar">
					<div class="ui-block-a">
						<select jg-column="belong_ctg1" jg-bind-dataset="e05001BelongCtg1" jg-display-column="BELONG_NM" jg-value-column="BELONG_ID"></select>
					</div>
					<div class="ui-block-b">
						<select jg-column="belong_ctg2" jg-bind-dataset="e05001BelongCtg2" jg-display-column="BELONG_NM" jg-value-column="BELONG_ID"></select>
					</div>
					<div class="ui-block-c">
						<select jg-column="belong_ctg3" jg-bind-dataset="e05001BelongCtg3" jg-display-column="BELONG_NM" jg-value-column="BELONG_ID"></select>
					</div>
				</div>
			</div>
		</div>
		<div class="no-row rk-responsive-p"><h4 jg-dataset-count="e05001AttendData" jg-dataset-count-pattern="총 #명" jg-dataset-count-zero="검색된 회원이 없습니다"></h4></div>
		<div class="ui-content" jg-dataset="e05001AttendData">
			<div class="attend-list ui-grid-e rk-color-white-back-cursor rk-color-gray2-border-b-last-child rk-color-gray2-border-t">
				<div class="ui-block-a">
					<div rk-photo rk-photo-id="##fx:##photo_id##" rk-photo-readonly="readonly"></div>
				</div>
				<div class="ui-block-b">
					<span class="rk-label rk-label-small-l3 rk-label-bold rk-color-gray7">##fx:BLK(##name##,"이름없음")+" "+##apply_ctg_nm##</span>
					<span class="rk-label rk-label-small-l3 rk-color-gray5">
						##fx:"  "+##apply_status_nm##
					</span><br/>
					<!--<span rk-belong-label="##fx:##belong_ctg1##" rk-belong-column="BELONG_NM" rk-belong-blk="소속2없음"></span>-->
					<span class="rk-label rk-label-small-l4 rk-color-gray6">##fx:NVL2(##belong_ctg2##,##belong_ctg2_nm##,'소속2없음')</span>
					<span class="rk-label rk-label-small-l4 rk-color-gray6">/</span>
					<span class="rk-label rk-label-small-l4 rk-color-gray6">##fx:NVL2(##belong_ctg3##,##belong_ctg3_nm##,'소속3없음')</span>
				</div>
				<div class="ui-block-c">
					<span class="rk-label rk-label-small-l4 rk-color-gray9">##fx:BLK(##phone1##,"개인연락처없음")</span><br/>
					<span class="rk-label rk-label-small-l4 rk-color-gray9">##fx:BLK(##phone2##,"비상연락처없음")</span>
				</div>
				<div class="ui-block-d">
					<a href="javascript:void(0);" onclick="##fx:'atFuncE05001_switchFee(this, ##dataset.rowIndex##);'" class="##fx:'ui-btn ui-mini' + (##fee_yn## === 'Y' ? ' ui-btn-c' : '');">
						##fx:##fee_yn## === "Y" ? "사역비O" : "사역비X"
					</a>
				</div>
				<div class="ui-block-e">
					<a href="javascript:void(0);" onclick="##fx:'atFuncE05001_switchReport(this, ##dataset.rowIndex##);'" class="##fx:'ui-btn ui-mini' + (##bookreport_yn## === 'Y' ? ' ui-btn-b' : '');">
						##fx:##bookreport_yn## === "Y" ? "독서O" : "독서X"
					</a>
				</div>
				<div class="ui-block-f">
					<a href="javascript:void(0);" onclick="##fx:'atFuncE05001_switchAttend(this, ##dataset.rowIndex##);'" class="##fx:'ui-btn ui-mini' + (BLK(##attend_status##,'00001') === '00001' ? '' : (##attend_status## === '00003' ? ' ui-btn-c' : ' ui-btn-d'));">
						##fx:BLK(##attend_status##,"00001") === "00001" ? "출석X" : (##attend_status## === "00003" ? "출석O" : "지각")
					</a>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>