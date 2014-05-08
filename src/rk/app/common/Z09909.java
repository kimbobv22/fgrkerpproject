package rk.app.common;

import javax.servlet.http.HttpServletResponse;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;

public class Z09909 extends JGAction{
	
	public void error(JGServiceBox serviceBox_) throws Exception{
		serviceBox_.getResponse().sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	}
	public void reject(JGServiceBox serviceBox_) throws Exception{
		serviceBox_.getResponse().sendError(HttpServletResponse.SC_UNAUTHORIZED);
	}
	public void notFound(JGServiceBox serviceBox_) throws Exception{
		serviceBox_.getResponse().sendError(HttpServletResponse.SC_NOT_FOUND);
	}
}
