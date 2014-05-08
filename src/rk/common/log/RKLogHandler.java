package rk.common.log;

import java.io.File;

import org.apache.log4j.ConsoleAppender;
import org.apache.log4j.DailyRollingFileAppender;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;

import com.jg.log.JGLogHandlerDef;
import com.jg.main.JGMainConfig;


public class RKLogHandler extends JGLogHandlerDef{
	
	Logger _rootLogger = null;
	
	public RKLogHandler(){
		try{
			_rootLogger = org.apache.log4j.Logger.getRootLogger();
			
			String logFilePath_ = JGMainConfig.sharedConfig().getCustomData("log4j-filepath");
			String logLayout_ = JGMainConfig.sharedConfig().getCustomData("log4j-layout");
			
			File logFileDir_ = new File(logFilePath_);
			new File(logFileDir_.getParent()).mkdirs();
			logFileDir_.createNewFile();
			
			//console log
			ConsoleAppender consoleAppender_ = new ConsoleAppender(new PatternLayout(logLayout_));
			_rootLogger.addAppender(consoleAppender_);

			//log file
			DailyRollingFileAppender fileAppender_ = new DailyRollingFileAppender(new PatternLayout(logLayout_)
			,logFilePath_, "'.'yyyy-MM-dd");
			fileAppender_.setAppend(true);
			_rootLogger.addAppender(fileAppender_);
		}catch(Exception ex_){
			System.err.println("Can't initialize RKLogHandler");
			ex_.printStackTrace();
			_rootLogger = null;
		}
	}

	@Override
	protected void didCaughtLog(Object log_){
		_rootLogger.debug(log_);
	}
	
	@Override
	protected void didCaughtWarn(Object log_){
		_rootLogger.warn(log_);
	}
	
	@Override
	protected void didCaughtError(String log_, Throwable throw_){
		_rootLogger.error(log_, throw_);
	}
}
