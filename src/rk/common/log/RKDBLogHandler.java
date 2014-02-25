package rk.common.log;

import com.jg.db.JGDBLoggingDef;
import com.jg.log.JGLog;
import com.jg.main.JGMainConfig;

public class RKDBLogHandler extends JGDBLoggingDef{
	
	protected boolean doLogging(){
		try{
			return JGMainConfig.sharedConfig().getDebugLevel() >= 9;
		}catch(Exception ex_){return false;}
	}
	
	protected String makeLog(String query_, Object[] parameters_){
		StringBuffer buffer_ = new StringBuffer();
		buffer_.append("[query]\n");
		buffer_.append(query_+"\n");
		
		if(parameters_ != null && parameters_.length > 0){
			buffer_.append("[parameters]\n");
			buffer_.append(parameters_[0]);
			int count_ = parameters_.length; 
			for(int index_=1;index_<count_;++index_){
				buffer_.append(", "+parameters_[index_]);
			}
		}
		return buffer_.toString();
	}

	@Override
	protected void beforeCallProcedure(String arg0, Object[] arg1){
		if(doLogging())
			JGLog.log(makeLog(arg0, arg1));
	}

	@Override
	protected void beforeExecuteQuery(String arg0, Object[] arg1){
		if(doLogging())
			JGLog.log(9, makeLog(arg0, arg1));
	}

	@Override
	protected void beforeExecuteUpdate(String arg0, Object[] arg1){
		if(doLogging())
			JGLog.log(makeLog(arg0, arg1));
	}
}
