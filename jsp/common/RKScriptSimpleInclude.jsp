<%@page import="rk.common.utils.RKServletUtils"%><%@page import="com.jg.util.JGServletUtils"%><%@page import="com.jg.util.JGCommonUtils"%><%@page import="com.jg.util.JGStringUtils"%><%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	String targetPath_ = (String)JGCommonUtils.NVL(request.getParameter("targetPath"), RKServletUtils.getRequestPath(request));
	String pageName_ = request.getParameter("pageName");
	String target_ = request.getParameter("target");
	if(!JGStringUtils.isBlank(target_)){
		target_ = "'"+target_+"'";
	}
%><script type="text/javascript">(function(b,a){RKCommon.addJS(b+"/js/"+a+".js"<%=","+target_%>);RKCommon.addCSS(b+"/css/"+a+".css"<%=","+target_%>);})("<%=targetPath_%>","<%=pageName_%>");</script>