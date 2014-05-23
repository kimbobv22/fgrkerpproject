<%@page import="rk.common.RKConfigKeyword"%><%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@page import="com.jg.util.JGServletUtils"%><%@page import="com.jg.main.JGMainConfig"%><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><%
	String serviceUrl_ = JGServletUtils.getServerURL(request);
	String actingAPIUrl_ = JGMainConfig.sharedConfig().getCustomData(RKConfigKeyword.KEY_URL_ACTING_API);
	String churchInfoUrl_ = JGMainConfig.sharedConfig().getCustomData(RKConfigKeyword.KEY_URL_CHURCHINFO);
%><!--[if lt IE 9]><script src="jsp/common/js/html5Shiv.js"></script><![endif]-->
<!--<link rel="stylesheet" href="<%=serviceUrl_ %>jsp/common/css/jquery/jquery-ui-1.10.3.custom.min.css" />-->
<link rel="stylesheet" href="<%=serviceUrl_ %>jsp/common/css/jquery/_m/jquery.mobile.structure-1.4.0.min.css" />
<link rel="stylesheet" href="<%=serviceUrl_ %>jsp/common/css/jquery/_m/master.min.css" />
<link rel="stylesheet" href="<%=serviceUrl_ %>jsp/common/css/jquery/_m/jquery.mobile.icons.min.css" />
<script src="<%=serviceUrl_ %>jsp/common/js/sprintf.min.js"></script>
<script src="<%=serviceUrl_ %>jsp/common/js/jquery/jquery-2.1.0.min.js"></script>
<script src="<%=serviceUrl_ %>jsp/common/js/jquery/jquery-ui-1.10.3.custom.min.js"></script>
<script src="<%=serviceUrl_ %>jsp/common/js/jquery/jquery.mobile-1.4.0.min.js"></script>
<script src="<%=serviceUrl_ %>jsp/common/js/jg.library/JGDataset.2.0.2.min.js"></script>
<script src="<%=serviceUrl_ %>jsp/common/js/jg.library/JGDatasetUI.2.0.2.min.js"></script>
<script src="<%=serviceUrl_ %>jsp/common/js/jg.library/JGDatasetUI.validator.2.0.2.min.js"></script>
<script src="<%=serviceUrl_ %>jsp/common/js/jg.library/JGService.2.1.1.min.js"></script>
<script type="text/javascript">
JGService.requestURL("root","<%=serviceUrl_%>");
JGService.requestURL("churchinfo","<%=churchInfoUrl_%>belong/");
</script>
<script src="<%=serviceUrl_ %>jsp/common/js/rk.library/RKCommon.js"></script>
<script src="<%=actingAPIUrl_ %>api?srvMap=api&srvID=api.js&appId=201403070000001&apiKey=13c4c587-a5c7-11e3-b689-cafe6701c043"></script>
