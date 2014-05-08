package filters;


import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CrossDomainFilter implements Filter {

	@Override
	public void destroy(){}

	@Override
	public void doFilter(ServletRequest request_, ServletResponse response_, FilterChain filterChain_) throws IOException, ServletException{
		if(request_ instanceof HttpServletRequest){
			HttpServletResponse hResponse_ = (HttpServletResponse)response_;
			hResponse_.addHeader("Access-Control-Allow-Origin", "*");
			hResponse_.setHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type, accept");
		}
		
		filterChain_.doFilter(request_, response_);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException{}

}
