<%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	boolean isAdmin_ = RKSessionData.isAdmin(request);
	String misId_ = (String)request.getAttribute("misId");
	String memSid_ = (String)request.getAttribute("memSid");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="A01009" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<script type="text/javascript">
<%if(isAdmin_){%>
		$(document).on("pagebeforecreate",function(){
			var rejectDataView_ = $("[jg-dataset='a01009ApplyRejectData']");
			rejectDataView_.JGDatasetUI();
			var rejectData_ = rejectDataView_.JGDatasetUI("dataset");
			rejectData_.addRow();
			rejectData_.setColumnValues({
				misId : "<%=misId_%>"
				,memSid : "<%=memSid_%>"
				,rmk : ""
			},0,true);
			rejectDataView_.JGValidator();
			rejectDataView_.JGValidator("failedMessages",{
				rmk : {
					required : "반려사유를 입력하여 주세요"
				}
			});
			rejectDataView_.JGValidator("refresh");
		});
		function atFuncA01009_reject(){
			var rejectDataView_ = $("[jg-dataset='a01009ApplyRejectData']");
			rejectDataView_.JGDatasetUI();
			var rejectData_ = rejectDataView_.JGDatasetUI("dataset");
			
			rejectDataView_.JGValidator("validate",function(result_){
				if(!result_) return;
				
				$.blockUI();
				JGService.ajax(RKCommon.apply.requestURLKey,{
					data : {
						srvID : "rejectLeaderApply"
						,rejectData : rejectData_.toJSONString(true)
					},success : function(data_){
						$.unblockUI();
						$("#a01009RejectPopup").popup("close");
						location.href = JGService.requestURL(RKCommon.apply.requestURLKey)+"/leader/<%=misId_%>/<%=memSid_%>";
					},error : function(response_, errorStr_){
						alert("에러발생");
						$.unblockUI();
					}
				});
			});
		}
<%}%>
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
<%if(isAdmin_){ %>
						<tr>
							<td colspan="2" style="##fx:##status## !== '00003' ? 'display:none;' : ''">
								<a href="#a01009RejectPopup" data-rel="popup" class="ui-btn ui-btn-d rk-responsive-r">반려</a>
							</td>
						</tr>
<%}%>
					</tbody>
				</table>
			</div>
			<div data-role="tabs" class="apply-tabs">
				<div data-role="navbar">
					<ul>
						<li><a href="#a01009BasicView" data-ajax="false">기본정보</a></li>
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
											<div rk-photo rk-photo-id="##fx:##photo_id##" rk-photo-readonly="readonly" style="height: 150px;"></div>
										</div>
										<div class="ui-block-b"></div>
										<div class="ui-block-c">
											<span class="rk-label rk-label-normal-l1 rk-label-bold">##fx:BLK(##name##,'이름없음')</span><br>
											<span class="rk-label rk-label-small-l1">##fx:BLK(##birth_Date##,'생일없음')</span><br>
											<span class="rk-label rk-label-small-l1">##fx:BLK(##phone1##,'개인연락처없음')</span><br>
											<span class="rk-label rk-label-small-l1">##fx:BLK(##phone2##,'비상연락처없음')</span>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">주소</th>
								<td class="rk-label rk-label-small-l1">##fx:BLK(##address##,'주소없음')</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">소속</th>
								<td class="rk-label rk-label-small-l1">
									<div class="ui-grid-b ui-responsive">
										<div class="ui-block-a">
											<span rk-belong-label="##fx:##belong_ctg1##" rk-belong-column="BELONG_NM" rk-belong-blk="소속1없음"></span>
										</div>
										<div class="ui-block-b">
											<span rk-belong-label="##fx:##belong_ctg2##" rk-belong-column="BELONG_NM" rk-belong-blk="소속2없음"></span>
										</div>
										<div class="ui-block-c">
											<span rk-belong-label="##fx:##belong_ctg3##" rk-belong-column="BELONG_NM" rk-belong-blk="소속3없음"></span>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">상세소속</th>
								<td class="rk-label rk-label-small-l1">##fx:BLK(##belong_dtl##,'상세소속없음')</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">선호사역지</th>
								<td class="rk-label rk-label-small-l1">
									<span>##fx:BLK(##favor_team_nm1##,'선호사역지1없음')</span><span style="##fx:((!isBlank(##favor_team_nm1##) && !isBlank(##favor_team_nm2##)) ? '' : 'display:none;')">##fx:"/"+BLK(##favor_team_nm2##,'선호사역지2없음')</span>
								</td>
							</tr>
							<tr>
								<th class="rk-label rk-label-small-l1 rk-color-gray5">기타선호사역지</th>
								<td class="rk-label rk-label-small-l1">
									<span>##fx:BLK(##favor_team_etc##,'기타선호사역지없음')</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="qna-view rk-content-view" jg-dataset="a01009QnaData" id="a01009QnaView">
					<table class="rk-content-data-view">
						<tbody>
							<tr style="##fx:(isBlank(##col1_q##) ? 'display:none;' : '')">
								<th class="rk-label rk-label-small-l1 rk-color-gray5" jg-column="col1_q" colspan="2"></th>
							</tr>
							<tr style="##fx:(isBlank(##col1_q##) ? 'display:none;' : '')">
								<td colspan="2">
									<pre class="rk-label rk-label-word-break">##fx:BLK(##col1##,'문답없음')</pre>
								</td>
							</tr>
							
							<tr style="##fx:(isBlank(##col2_q##) ? 'display:none;' : '')">
								<th class="rk-label rk-label-small-l1 rk-color-gray5" jg-column="col2_q" colspan="2"></th>
							</tr>
							<tr style="##fx:(isBlank(##col2_q##) ? 'display:none;' : '')">
								<td colspan="2">
									<pre class="rk-label rk-label-word-break">##fx:BLK(##col2##,'문답없음')</pre>
								</td>
							</tr>
							
							<tr style="##fx:(isBlank(##col3_q##) ? 'display:none;' : '')">
								<th class="rk-label rk-label-small-l1 rk-color-gray5" jg-column="col3_q" colspan="2"></th>
							</tr>
							<tr style="##fx:(isBlank(##col3_q##) ? 'display:none;' : '')">
								<td colspan="2">
									<pre class="rk-label rk-label-word-break">##fx:BLK(##col3##,'문답없음')</pre>
								</td>
							</tr>
							
							<tr style="##fx:(isBlank(##col4_q##) ? 'display:none;' : '')">
								<th class="rk-label rk-label-small-l1 rk-color-gray5" jg-column="col4_q" colspan="2"></th>
							</tr>
							<tr style="##fx:(isBlank(##col4_q##) ? 'display:none;' : '')">
								<td colspan="2">
									<pre class="rk-label rk-label-word-break">##fx:BLK(##col4##,'문답없음')</pre>
								</td>
							</tr>
							
							<tr style="##fx:(isBlank(##col5_q##) ? 'display:none;' : '')">
								<th class="rk-label rk-label-small-l1 rk-color-gray5" jg-column="col5_q" colspan="2"></th>
							</tr>
							<tr style="##fx:(isBlank(##col5_q##) ? 'display:none;' : '')">
								<td colspan="2">
									<pre class="rk-label rk-label-word-break">##fx:BLK(##col5##,'문답없음')</pre>
								</td>
							</tr>
							
						</tbody>
					</table>
				</div>
			</div>
<%if(isAdmin_){%>
			<div data-role="popup" id="a01009RejectPopup" class="reject-popup rk-responsive-size" data-position-to="window">
				<div class="ui-content">
					<h3>반려사유</h3>
					<div class="rk-content-view">
						<table class="rk-content-data-view" jg-dataset="a01009ApplyRejectData">
							<tbody>
								<tr>
									<th class="rk-label rk-label-small-l1 rk-color-gray5">반려사유</th>
									<td>
										<input type="text" jg-column="rmk" placeholder="반려사유를 입력하세요" required>
										<label jg-error-column="rmk"></label>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="btn-handle">
							<a href="javascript:atFuncA01009_reject();" class="ui-btn ui-btn-c rk-responsive-r">반려</a>
							<a class="ui-btn rk-responsive-r" data-rel="back">닫기</a>
						</div>
					</div>
				</div>
			</div>
<%}%>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>