package rk.common.session;

import javax.servlet.http.HttpServletRequest;

import com.jg.action.handler.JGServiceBox;
import com.jg.vo.JGDataset;

public class RKSessionData extends JGDataset{
	
	protected static final String KEY_RKSESSIONDATA = "_rkSessionData_";
	protected static final String KEY_COLUMN_MEM_SID = "mem_sid";

	public static final RKSessionData sessionData(HttpServletRequest request_){
		return (RKSessionData)request_.getSession().getAttribute(KEY_RKSESSIONDATA);
	}
	
	public static final RKSessionData sessionData(JGServiceBox serviceBox_){
		return sessionData(serviceBox_.getRequest());
	}
	
	public static final void setRKSessionData(JGServiceBox serviceBox_, RKSessionData sessionData_){
		serviceBox_.getSession().setAttribute(KEY_RKSESSIONDATA, sessionData_);
	}
	
	public static final boolean isExistSession(HttpServletRequest request_){
		return (sessionData(request_) != null);
	}
	
	public static final boolean isExistSession(JGServiceBox serviceBox_){
		return isExistSession(serviceBox_.getRequest());
	}
	
	public static final String currentMemSid(HttpServletRequest request_) throws Exception{
		RKSessionData sessionData_ = sessionData(request_);
		if(sessionData_ != null){
			return sessionData_.getMemSid();
		}
		
		return null;
	}
	public static final String currentMemSid(JGServiceBox serviceBox_) throws Exception{
		return currentMemSid(serviceBox_.getRequest());
	}
	
	public final String getMemSid() throws Exception{
		return (String)this.getColumnValue(KEY_COLUMN_MEM_SID, 0);
	}
	
	public static final RKSessionData makeSessionData(JGDataset dataset_) throws Exception{
		RKSessionData sessionData_ = new RKSessionData();
		sessionData_.applyJSON(dataset_.toJSON());
		return sessionData_;
	}
}
