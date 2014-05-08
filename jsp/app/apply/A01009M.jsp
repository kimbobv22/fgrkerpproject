<%@page import="com.jg.util.JGStringUtils"%><%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	String misId_ = (String)request.getAttribute("misId");
	String memSid_ = (String)request.getAttribute("memSid");
	String applyCtg_ = (String)request.getAttribute("applyCtg");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="A01009" name="pageName"/>
</jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="A01009M" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<script type="text/javascript">
		$(document).ready(function(){
			atFuncA01009_refresh(function(){
				atFuncA01009_loadBelongCtg2();
				atFuncA01009_loadBelongCtg3();
			});
		});
		</script>
		<div id="a01009" class="a01009 rk-responsive-p" rk-mis-id="<%=misId_%>" rk-mem-sid="<%=memSid_%>">
			<div class="ministry-info-frame rk-content-view" jg-dataset="a01009MisData">
				<table class="rk-content-data-view">
					<tbody>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">사역명</th>
							<td jg-column="mis_title" class="rk-label rk-label-small-l1 rk-label-bold"></td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">사역일정</th>
							<td class="rk-label rk-label-small-l1">
								<span jg-column="start_date"></span>&nbsp;~&nbsp;<span jg-column="end_date"></span>
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">지원구분</th>
							<td jg-column="apply_ctg_nm" class="rk-label rk-label-small-l1"></td>
						</tr>
						<tr style="##fx:##status## === '00005' ? '' : 'display:none;'">
							<th class="rk-label rk-label-small-l1 rk-color-gray5">지원상태</th>
							<td class="rk-label rk-label-small-l1 rk-label-word-break" jg-column="rmk"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div data-role="tabs" class="apply-tabs">
				<div data-role="navbar">
					<ul>
						<li><a href="#a01009BasicView" data-ajax="false" class="ui-btn-active">기본정보</a></li>
						<li><a href="#a01009QnaView" data-ajax="false">문답지</a></li>
					</ul>
				</div>
				<div class="basic-view rk-content-view" jg-dataset="a01009BasicData" id="a01009BasicView">
					<table class="rk-content-data-view">
						<tbody>
							<tr>
								<td colspan="2">
									<div class="ui-grid-b picture-frame">
										<div class="ui-block-a">
											<div rk-photo rk-photo-id="##fx:##photo_id##" style="height: 150px;"></div>
											<a href="javascript:atFuncA01009_removePhoto();" class="ui-btn ui-mini">사진삭제</a>
											<input type="hidden" jg-column="photo_id" required>
										</div>
										<div class="ui-block-b"></div>
										<div class="ui-block-c">
											<input type="text" jg-column="name" placeholder="지원자명" required>
											<label jg-error-column="name"></label>
											<input type="date" jg-column="birth_date" placeholder="생일" required>
											<label jg-error-column="birth_date"></label>
											<input type="text" jg-column="phone1" placeholder="개인 연락처" custom-validator-or-required="phone1,phone2">
											<input type="text" jg-column="phone2" placeholder="비상 연락처">
											<label jg-error-column="phone1"></label>
											<label jg-error-column="photo_id"></label>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">주소</th>
								<td class="rk-label rk-label-small-l1">
									<input type="text" jg-column="address" required>
									<label jg-error-column="address"></label>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">선호사역지1</th>
								<td>
									<span class="rk-label rk-label-small-l1">##fx:(isBlank(##favor_team_id1##) ? '선택된 사역지 없음' : ##favor_team_nm1##)</span>
									<a class="ui-btn ui-btn-inline" href="javascript:atFuncA01009_selectFavorTeam('favor_team_id1','favor_team_nm1');">선택</a>
									<a class="##fx:'ui-btn ui-btn-inline '+(isBlank(##favor_team_id1##) ? 'ui-disabled' : '')" href="javascript:atFuncA01009_clearFavorTeam('favor_team_id1','favor_team_nm1');">비우기</a>
									<input type="hidden" jg-column="favor_team_id1" custom-validator-or-required="favor_team_id1,favor_team_id2,favor_team_etc">
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">선호사역지2</th>
								<td>
									<span class="rk-label rk-label-small-l1">##fx:(isBlank(##favor_team_id2##) ? '선택된 사역지 없음' : ##favor_team_nm2##)</span>
									<a class="ui-btn ui-btn-inline" href="javascript:atFuncA01009_selectFavorTeam('favor_team_id2','favor_team_nm2');">선택</a>
									<a class="##fx:'ui-btn ui-btn-inline '+(isBlank(##favor_team_id2##) ? 'ui-disabled' : '')" href="javascript:atFuncA01009_clearFavorTeam('favor_team_id2','favor_team_nm2');">비우기</a>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">소속상세</th>
								<td class="rk-label rk-label-small-l1">
									<input type="text" jg-column="belong_dtl" required>
									<label jg-error-column="belong_dtl"></label>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">선호사역지1</th>
								<td>
									<a class="ui-btn ui-btn-inline" href="javascript:atFuncA01009_selectFavorTeam('favor_team_id1','favor_team_nm1');">##fx:(isBlank(##favor_team_nm1##) ? '선택' : ##favor_team_nm1##)</a>
									<a class="##fx:'ui-btn ui-btn-inline '+(isBlank(##favor_team_id1##) ? 'ui-disabled' : '')" href="javascript:atFuncA01009_clearFavorTeam('favor_team_id1','favor_team_nm1');">비우기</a>
									<input type="hidden" jg-column="favor_team_id1" custom-validator-or-required="favor_team_id1,favor_team_id2,favor_team_etc">
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">선호사역지2</th>
								<td>
									<a class="ui-btn ui-btn-inline" href="javascript:atFuncA01009_selectFavorTeam('favor_team_id2','favor_team_nm2');">##fx:(isBlank(##favor_team_nm2##) ? '선택' : ##favor_team_nm2##)</a>
									<a class="##fx:'ui-btn ui-btn-inline '+(isBlank(##favor_team_id2##) ? 'ui-disabled' : '')" href="javascript:atFuncA01009_clearFavorTeam('favor_team_id2','favor_team_nm2');">비우기</a>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">기타선호사역지</th>
								<td>
									<input type="text" jg-column="favor_team_etc">
									<label jg-error-column="favor_team_id1"></label>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="qna-view rk-content-view" jg-dataset="a01009QnaData" id="a01009QnaView">
					<table class="rk-content-data-view">
						<tbody>
							<tr style="##fx:(isBlank(##col1_q##) ? 'display:none;' : '')">
								<th class="rk-label rk-label-small-l1 rk-color-gray5" jg-column="col1_q"></th>
							</tr>
							<tr style="##fx:(isBlank(##col1_q##) ? 'display:none;' : '')">
								<td>
									<textarea jg-column="col1"></textarea>
									<label jg-error-column="col1"></label>
								</td>
							</tr>
							
							<tr style="##fx:(isBlank(##col2_q##) ? 'display:none;' : '')">
								<th class="rk-label rk-label-small-l1 rk-color-gray5" jg-column="col2_q"></th>
							</tr>
							<tr style="##fx:(isBlank(##col2_q##) ? 'display:none;' : '')">
								<td>
									<textarea jg-column="col2"></textarea>
									<label jg-error-column="col2"></label>
								</td>
							</tr>
							
							<tr style="##fx:(isBlank(##col3_q##) ? 'display:none;' : '')">
								<th class="rk-label rk-label-small-l1 rk-color-gray5" jg-column="col3_q"></th>
							</tr>
							<tr style="##fx:(isBlank(##col3_q##) ? 'display:none;' : '')">
								<td>
									<textarea jg-column="col3"></textarea>
									<label jg-error-column="col3"></label>
								</td>
							</tr>
							
							<tr style="##fx:(isBlank(##col4_q##) ? 'display:none;' : '')">
								<th class="rk-label rk-label-small-l1 rk-color-gray5" jg-column="col4_q"></th>
							</tr>
							<tr style="##fx:(isBlank(##col4_q##) ? 'display:none;' : '')">
								<td>
									<textarea jg-column="col4"></textarea>
									<label jg-error-column="col4"></label>
								</td>
							</tr>
							
							<tr style="##fx:(isBlank(##col5_q##) ? 'display:none;' : '')">
								<th class="rk-label rk-label-small-l1 rk-color-gray5" jg-column="col5_q"></th>
							</tr>
							<tr style="##fx:(isBlank(##col5_q##) ? 'display:none;' : '')">
								<td>
									<textarea jg-column="col5"></textarea>
									<label jg-error-column="col5"></label>
								</td>
							</tr>
							
						</tbody>
					</table>
				</div>
				<div class="apply-handle">
					<a href="javascript:atFuncA01009_update();" class="ui-btn ui-btn-c rk-responsive-r">지원서 저장</a>
					<a href="javascript:atFuncA01009_submit();" class="ui-btn ui-btn-d rk-responsive-r">제출하기</a>
					<a href="javascript:atFuncA01009_remove();" class="ui-btn ui-btn-d rk-responsive-r">삭제하기</a>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>