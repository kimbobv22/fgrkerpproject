package rk.common.loader;

import javax.servlet.ServletContextEvent;

import rk.common.log.RKDBLogHandler;
import rk.common.log.RKLogHandler;

import com.jg.db.JGDBConnection;
import com.jg.log.JGLog;
import com.jg.main.loader.JGMainServletContextListener;

public class RKMainServletContextListener extends JGMainServletContextListener {
	
	@Override
	public void contextInitialized(ServletContextEvent contextEvent_){
		super.contextInitialized(contextEvent_);
		JGLog.setLogHandler(new RKLogHandler());
		JGDBConnection.setLoggingDef(new RKDBLogHandler());
	}
	
}
