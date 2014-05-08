package rk.common.utils;

import javax.servlet.http.HttpServletRequest;

public class RKServletUtils {

	public static final String getRequestPath(HttpServletRequest request_) throws Exception{
		return RKStringUtils.getFilePath(request_.getServletPath());
	}
}
