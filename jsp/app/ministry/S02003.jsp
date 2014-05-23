<%@page import="com.jg.util.JGStringUtils"%>
<%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
boolean isNew_ = JGStringUtils.getBoolean(request.getParameter("isNew"), false);
boolean isAdmin_ = RKSessionData.isAdmin(request);
String misId_ = (String)request.getAttribute("misId");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="S02003" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<div id="s02003" class="s02003 rk-responsive-p" <%if(!isNew_){%>rk-mis-id="<%=misId_%>"<%}%>>
			<div class="org-detail-view rk-content-view" jg-dataset="s02003MisData">
				<table class="rk-content-data-view">
					<tbody>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">사역명</th>
							<td>
								<input type="text" jg-column="mis_title" required class="ui-mini">
								<label jg-error-column="mis_title"></label>
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">사역상태</th>
							<td>
								<select class="ui-mini" jg-column="status" required jg-bind-dataset="GCODE_S0001" jg-value-column="CODE_DID" jg-display-column="CODE_DNM"></select>
								<label jg-error-column="status"></label>
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">사역일정</th>
							<td>
								<div class="ui-grid-b ministy-date">
									<div class="ui-block-a"><input data-role="datebox" type="date" jg-column="start_date" required></div>
									<div class="ui-block-b">~</div>
									<div class="ui-block-c"><input data-role="datebox" type="date" jg-column="end_date" required></div>
								</div>
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">사역소개</th>
							<td>
								<textarea jg-column="mis_desc" class="ui-mini" required></textarea>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
<%if(isNew_){%>
<a href="javascript:atFuncS02003_add();" class="ui-btn ui-btn-c rk-responsive-r">사역추가</a>
<%}else{%>
<a href="javascript:atFuncS02003_update();" class="ui-btn ui-btn-c rk-responsive-r">정보수정</a>
<a href="javascript:atFuncS02003_remove();" class="ui-btn ui-btn-d rk-responsive-r">사역삭제</a>
<%}%>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>