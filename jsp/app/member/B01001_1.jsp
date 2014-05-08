<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%

%><!DOCTYPE html>
<html>
<head>
<jsp:include page="/jsp/common/RKHead.jsp" flush="true"></jsp:include>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="B01001_1" name="pageName"/>
</jsp:include>
</head>
<body>
	<jsp:include page="/jsp/common/view/RKDefault.jsp" flush="true" />
	<div id="b01001" class="b01001">
		<div class="rk-responsive-p">
			<div class="header-frame">
				<div class="main-logo rk-image rk-image-main-logo rk-transition rk-transition-size-fast"></div>
			</div>
			<span class="rk-label rk-label-normal-l1">ACTing을 통하여 리바이벌코리아에 로그인합니다.</span>
			<div class="content-frame rk-content-view" jg-dataset="b01001LoginData">
				<table class="rk-content-data-view">
					<tbody>
						<tr>
							<th class="rk-label rk-label-small-l1 rk-color-gray5">아이디/암호</th>
							<td>
								<div class="ui-grid-a ui-responsive">
									<div class="ui-block-a">
										<input type="text" tabindex="1" placeholder="ACTing 아이디,이메일" jg-column="id" rk-onenter="atFuncB01001_doLogin();" required>
									</div>
									<div class="ui-block-b">
										<input type="password" tabindex="2" placeholder="암호" jg-column="password" rk-onenter="atFuncB01001_doLogin();" required>
									</div>
								</div>
								<label jg-error-column="id"></label><label jg-error-column="password"></label>
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<a href="javascript:atFuncB01001_doLogin();" class="ui-btn ui-btn-c rk-responsive-r" tabindex="3">로그인</a>
								<a data-ajax="false" href="http://www.youthfg.com?srvMap=user" target="_blank" class="ui-btn ui-btn-a rk-responsive-r" tabindex="4">ACTing 가입하기</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<jsp:include page="/jsp/common/view/RKFooter.jsp" flush="true" />
</body>
</html>