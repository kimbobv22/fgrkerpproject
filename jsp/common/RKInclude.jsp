<%@page import="rk.common.RKConfigKeyword"%><%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@page import="com.jg.util.JGServletUtils"%><%@page import="com.jg.main.JGMainConfig"%><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><%
	String serviceUrl_ = JGServletUtils.getServiceUrl(request);
	String servletName_ = JGMainConfig.sharedConfig().getCustomData(RKConfigKeyword.KEY_MAIN_SERVLET); 
%><!--[if lt IE 9]><script src="jsp/common/js/html5Shiv.js"></script><![endif]-->
<link rel="stylesheet" href="jsp/common/css/jquery/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" href="jsp/common/css/jquery/_m/jquery.mobile.structure-1.4.0.min.css" />
<link rel="stylesheet" href="jsp/common/css/jquery/_m/master.min.css" />
<link rel="stylesheet" href="jsp/common/css/jquery/_m/jquery.mobile.icons.min.css" />
<script src="jsp/common/js/sprintf.min.js"></script>
<script src="jsp/common/js/jquery/jquery-2.1.0.min.js"></script>
<script src="jsp/common/js/jquery/jquery-ui-1.10.3.custom.min.js"></script>
<script src="jsp/common/js/jquery/jquery.mobile-1.4.0.min.js"></script>
<script src="jsp/common/js/jg.library/JGDataset.1.0.0.js"></script>
<script src="jsp/common/js/jg.library/JGDataset.validate.1.0.0.js"></script>
<script src="jsp/common/js/jg.library/JGService.1.0.2.js"></script>
<script type="text/javascript">JGModule.putRequestURL("http","<%=serviceUrl_%><%=servletName_%>");</script>
<script src="jsp/common/js/rk.library/RKCommon.js"></script>
<script type="text/javascript">
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-48372659-1', 'rk.youthfg.com');ga('send', 'pageview');
</script>