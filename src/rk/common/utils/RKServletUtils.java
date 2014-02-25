package rk.common.utils;

import javax.servlet.http.HttpServletRequest;

public class RKServletUtils {

	public static final String getRequestPath(HttpServletRequest request_) throws Exception{
		String requestURI_ = request_.getRequestURI();
		return RKStringUtils.getFilePath(requestURI_);
	}
}
