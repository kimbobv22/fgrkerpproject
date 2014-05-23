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
	<jsp:param value="A09001" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page" class="rk-responsive-height">
	<div data-role="header" data-position="fixed">
		<h3>팀장 선택</h3>
	</div>
	<div data-role="content">
		<div id="a09001" class="a09001 rk-responsive-p" rk-content-list-count="0" rk-mis-id="<%=misId_%>">
			<div class="top-search-nav" jg-dataset="a09001CondData">
				<div>
					<div class="ui-grid-c total-search-bar">
						<div class="ui-block-a">
							<select jg-column="order_ctg" jg-bind-dataset="GCODE_A0009" jg-display-column="CODE_DNM" jg-value-column="CODE_DID">
							</select>
						</div>
						<div class="ui-block-b"><select jg-column="status" jg-bind-dataset="GCODE_A0003" jg-display-column="CODE_DNM" jg-value-column="CODE_DID"></select></div>
						<div class="ui-block-c"><input type="text" placeholder="지원자명,연락처로 검색" data-wrapper-class="search-bar" jg-column="searchText" rk-onenter="atFuncA09001_search();"></div>
						<div class="ui-block-d"><a href="javascript:atFuncA09001_search();" class="ui-btn">검색</a></div>
					</div>
					<div class="ui-grid-b ui-responsive belong-bar">
						<div class="ui-block-a">
							<select jg-column="belong_ctg1" jg-bind-dataset="a09001BelongCtg1" jg-display-column="BELONG_NM" jg-value-column="BELONG_ID"></select>
						</div>
						<div class="ui-block-b">
							<select jg-column="belong_ctg2" jg-bind-dataset="a09001BelongCtg2" jg-display-column="BELONG_NM" jg-value-column="BELONG_ID"></select>
						</div>
						<div class="ui-block-c">
							<select jg-column="belong_ctg3" jg-bind-dataset="a09001BelongCtg3" jg-display-column="BELONG_NM" jg-value-column="BELONG_ID"></select>
						</div>
					</div>
				</div>
			</div>
			<div class="no-row"><h4></h4></div>
			<div class="apply-list" jg-dataset="a09001LeaderData">
				<div class="apply-list-row rk-color-white-back-cursor rk-color-gray2-border-b-last-child rk-color-gray2-border-t ui-grid-a">
					<div class="ui-block-a">
						<div class="ui-grid-b basic-grid">
							<div class="ui-block-a">
								<div rk-photo rk-photo-id="##fx:##photo_id##" rk-photo-readonly="readonly"></div>
							</div>
							<div class="ui-block-b"></div>
							<div class="ui-block-c">
								<div class="apply-list-row-item">
									<span class="rk-label rk-label-normal-l1 rk-label-bold">##fx:BLK(##name##,"이름없음")</span>
									<span class="rk-label rk-label-small-l2 rk-color-gray5">/</span>
									<span jg-column="status_nm" class="rk-label rk-label-small-l2 rk-color-gray6"></span>
								</div>
								<label class="rk-label rk-label-small-l2 rk-color-gray5">##fx:BLK(##phone1##,"개인연락처없음")+'/'+BLK(##phone2##,"비상연락처없음")</label>
							</div>
						</div>
						<div class="ui-grid-b rk-label rk-label rk-label-small-l1 apply-list-row-item">
							<div class="ui-block-a"><span rk-belong-label="##fx:##belong_ctg1##" rk-belong-column="BELONG_NM" rk-belong-blk="소속1없음"></span></div>
							<div class="ui-block-b"><span rk-belong-label="##fx:##belong_ctg2##" rk-belong-column="BELONG_NM" rk-belong-blk="소속2없음"></span></div>
							<div class="ui-block-c"><span rk-belong-label="##fx:##belong_ctg3##" rk-belong-column="BELONG_NM" rk-belong-blk="소속3없음"></span></div>
						</div>
					</div>
					<div class="ui-block-b">
						<a href="##fx:'javascript:atFuncA09001_select(##dataset.rowIndex##);'" class="ui-btn ui-btn-c">선택</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>