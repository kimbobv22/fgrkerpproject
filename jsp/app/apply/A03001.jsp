<%@page import="com.jg.util.JGStringUtils"%><%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	String misId_ = (String)request.getAttribute("misId");
	String misTitle_ = (String)request.getAttribute("misTitle");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="A03001" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<div id="a03001" class="a03001 rk-responsive-p" rk-mis-id="<%=misId_%>" rk-mis-title="<%=misTitle_%>">
			<h3>팀원지원 현황</h3>
			<div class="top-search-nav" jg-dataset="a03001CondData">
				<div>
					<div class="ui-grid-a ministry-select-grid">
						<div class="ui-block-a"><a href="javascript:atFuncA03001_selectMinistry();" class="ui-btn">##fx:(isBlank(##mis_id##) ? '사역을 선택하세요' : ##mis_title##)</a></div>
						<div class="ui-block-b"><a href="javascript:atFuncA03001_emptyMinistry();" class="##fx:'ui-btn '+(isBlank(##mis_id##) ? 'ui-disabled' : '')">비우기</a></div>
					</div>
					<div class="ui-grid-c total-search-bar">
						<div class="ui-block-a">
							<select jg-column="order_ctg" jg-bind-dataset="GCODE_A0009" jg-display-column="CODE_DNM" jg-value-column="CODE_DID">
							</select>
						</div>
						<div class="ui-block-b"><select jg-column="status" jg-bind-dataset="GCODE_A0003" jg-display-column="CODE_DNM" jg-value-column="CODE_DID"></select></div>
						<div class="ui-block-c"><input type="text" placeholder="지원자명,연락처로 검색" data-wrapper-class="search-bar" jg-column="searchText" rk-onenter="atFuncA03001_search();"></div>
						<div class="ui-block-d"><a href="javascript:atFuncA03001_search();" class="ui-btn">검색</a></div>
					</div>
					<div class="ui-grid-b ui-responsive belong-bar">
						<div class="ui-block-a">
							<select jg-column="belong_ctg1" jg-bind-dataset="a03001BelongCtg1" jg-display-column="BELONG_NM" jg-value-column="BELONG_ID"></select>
						</div>
						<div class="ui-block-b">
							<select jg-column="belong_ctg2" jg-bind-dataset="a03001BelongCtg2" jg-display-column="BELONG_NM" jg-value-column="BELONG_ID"></select>
						</div>
						<div class="ui-block-c">
							<select jg-column="belong_ctg3" jg-bind-dataset="a03001BelongCtg3" jg-display-column="BELONG_NM" jg-value-column="BELONG_ID"></select>
						</div>
					</div>
				</div>
			</div>
			<div class="no-row"><h4></h4></div>
			<div class="apply-list" jg-dataset="a03001ApplyData">
				<div class="apply-list-row rk-color-white-back-cursor rk-color-gray2-border-b-last-child rk-color-gray2-border-t">
					<a href="##fx:'javascript:atFuncA03001_goApply(##dataset.rowIndex##);'" class="apply-list-row-item">
						<div class="ui-grid-a basic-grid">
							<div class="ui-block-a">
								<div rk-photo rk-photo-id="##fx:##photo_id##" rk-photo-readonly="readonly"></div>
							</div>
							<div class="ui-block-b">
								<span class="rk-label rk-label-normal-l1 rk-label-bold">##fx:BLK(##name##,"이름없음")</span>
								<span class="rk-label rk-label-small-l2 rk-color-gray5">/</span>
								<span jg-column="status_nm" class="rk-label rk-label-small-l2 rk-color-gray6"></span>
							</div>
						</div>
					</a>
					<div class="ui-grid-a ui-responsive rk-label rk-label rk-label-small-l3 rk-color-gray6 apply-list-row-item">
						<div class="ui-block-a"><span>##fx:BLK(##phone1##,"개인연락처없음")</span></div>
						<div class="ui-block-b"><span>##fx:BLK(##phone2##,"비상연락처없음")</span></div>
					</div>
					<div class="ui-grid-b ui-responsive rk-label rk-label rk-label-small-l1 apply-list-row-item">
						<div class="ui-block-a"><span rk-belong-label="##fx:##belong_ctg1##" rk-belong-column="BELONG_NM" rk-belong-blk="소속1없음"></span></div>
						<div class="ui-block-b"><span rk-belong-label="##fx:##belong_ctg2##" rk-belong-column="BELONG_NM" rk-belong-blk="소속2없음"></span></div>
						<div class="ui-block-c"><span rk-belong-label="##fx:##belong_ctg3##" rk-belong-column="BELONG_NM" rk-belong-blk="소속3없음"></span></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>