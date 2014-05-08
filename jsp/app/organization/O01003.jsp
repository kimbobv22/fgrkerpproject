<%@page import="com.jg.util.JGStringUtils"%>
<%@page import="rk.common.session.RKSessionData"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
boolean isNew_ = JGStringUtils.getBoolean(request.getParameter("isNew"), false);
boolean isAdmin_ = RKSessionData.isAdmin(request);
String orgId_ = (String)request.getAttribute("orgId");
%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="O01003" name="pageName"/>
</jsp:include>
</head>
<body>
<div data-role="page">
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div data-role="content">
		<div id="o01003" class="o01003 rk-responsive-p" <%if(!isNew_){%>rk-org-id="<%=orgId_%>"<%}%>>
			<div class="org-detail-view rk-content-view" jg-dataset="o01003OrgData">
				<table class="rk-content-data-view">
					<tbody>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">단체명</th>
							<td>
								<input type="text" jg-column="org_nm" required class="ui-mini">
								<label jg-error-column="org_nm"></label>
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">단체 상태/구분</th>
							<td>
								<div class="ui-grid-a ui-responsive">
									<div class="ui-block-a">
										<select class="ui-mini" jg-column="status" required jg-bind-dataset="GCODE_O0001" jg-value-column="CODE_DID" jg-display-column="CODE_DNM"></select>
										<label jg-error-column="status"></label>
									</div>
									<div class="ui-block-b">
										<select class="ui-mini" jg-column="org_ctg" required jg-bind-dataset="GCODE_O0002" jg-value-column="CODE_DID" jg-display-column="CODE_DNM"></select>
										<label jg-error-column="org_ctg"></label>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">단체소개</th>
							<td>
								<textarea jg-column="org_desc" class="ui-mini"></textarea>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="org-detail-view rk-content-view" jg-dataset="o01003OrgBscData">
				<table class="rk-content-data-view">
					<tbody>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">주소</th>
							<td>
								<input type="text" jg-column="address" required class="ui-mini">
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">이메일</th>
							<td>
								<input type="email" jg-column="email" class="ui-mini" placeholder="이메일" patternEmail>
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">담당자1</th>
							<td>
								<input type="text" jg-column="stuff_nm1" class="ui-mini" placeholder="이름">
								<input type="text" jg-column="stuff_phone1" class="ui-mini" placeholder="연락처">
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">담당자2</th>
							<td>
								<input type="text" jg-column="stuff_nm2" class="ui-mini" placeholder="이름">
								<input type="text" jg-column="stuff_phone2" class="ui-mini" placeholder="연락처">
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">담당자3</th>
							<td>
								<input type="text" jg-column="stuff_nm3" class="ui-mini" placeholder="이름">
								<input type="text" jg-column="stuff_phone3" class="ui-mini" placeholder="연락처">
							</td>
						</tr>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">비고</th>
							<td>
								<textarea jg-column="remark" class="ui-mini"></textarea>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
<%if(isNew_){%>
<a href="javascript:atFuncO01003_add();" class="ui-btn ui-btn-c rk-responsive-r">단체추가</a>
<%}else{%>
<a href="javascript:atFuncO01003_update();" class="ui-btn ui-btn-c rk-responsive-r">정보수정</a>
<a href="javascript:atFuncO01003_remove();" class="ui-btn ui-btn-d rk-responsive-r">단체삭제</a>
<%}%>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</div>
</body>
</html>