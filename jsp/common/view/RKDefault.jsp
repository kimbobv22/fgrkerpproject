<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/jsp/common/RKScriptSimpleInclude.jsp" flush="true">
	<jsp:param value="jsp/common/view" name="targetPath"/>
	<jsp:param value="default" name="pageName"/>
</jsp:include>
<div data-role="header" data-position="fixed" data-theme="none" class="rk-default-header rk-color-gray9-back rk-opacity-l90" id="rkDefaultTopHeader">
	<div class="rk-default-header-frame">
		<a href="javascript:JGService.forwardService(RKCommon.requestURLKey_root);" class="main-logo rk-icon rk-icon-main-logo rk-image-btn"></a>
	</div>
</div>