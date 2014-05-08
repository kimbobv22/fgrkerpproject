package rk.common.session;

import javax.servlet.http.HttpServletRequest;

import rk.app.main.M01001;

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
	
	public final int getAccessLVL() throws Exception{
		return new M01001().getAccessLVL(getMemSid());
	}
	public final boolean isAdmin() throws Exception{
		return (getAccessLVL() == M01001.ACCESSLVL_ADMIN);
	}
	public final boolean isRecommender() throws Exception{
		return (getAccessLVL() == M01001.ACCESSLVL_RECOMMENDER);
	}
	public final boolean isALeader() throws Exception{
		return (getAccessLVL() == M01001.ACCESSLVL_ALEADER);
	}
	public final boolean isAMember() throws Exception{
		return (getAccessLVL() == M01001.ACCESSLVL_AMEMBER);
	}
	public final boolean isMember() throws Exception{
		return (getAccessLVL() == M01001.ACCESSLVL_MEMBER);
	}
	
	public static final int getAccessLVL(HttpServletRequest request_) throws Exception{
		if(!isExistSession(request_)) return M01001.ACCESSLVL_NONE;
		return sessionData(request_).getAccessLVL();
	}
	public static final int getAccessLVL(JGServiceBox serviceBox_) throws Exception{
		return getAccessLVL(serviceBox_.getRequest());
	}
	
	public static final boolean isAdmin(HttpServletRequest request_) throws Exception{
		if(!isExistSession(request_)) return false;
		return sessionData(request_).isAdmin();
	}
	public static final boolean isAdmin(JGServiceBox serviceBox_) throws Exception{
		return isAdmin(serviceBox_.getRequest());
	}
	
	public static final boolean isRecommender(HttpServletRequest request_) throws Exception{
		if(!isExistSession(request_)) return false;
		return sessionData(request_).isRecommender();
	}
	public static final boolean isRecommender(JGServiceBox serviceBox_) throws Exception{
		return isRecommender(serviceBox_.getRequest());
	}
	
	public static final boolean isALeader(HttpServletRequest request_) throws Exception{
		if(!isExistSession(request_)) return false;
		return sessionData(request_).isALeader();
	}
	public static final boolean isALeader(JGServiceBox serviceBox_) throws Exception{
		return isALeader(serviceBox_.getRequest());
	}
	
	public static final boolean isAMember(HttpServletRequest request_) throws Exception{
		if(!isExistSession(request_)) return false;
		return sessionData(request_).isAMember();
	}
	public static final boolean isAMember(JGServiceBox serviceBox_) throws Exception{
		return isAMember(serviceBox_.getRequest());
	}
	
	public static final boolean isMember(HttpServletRequest request_) throws Exception{
		if(!isExistSession(request_)) return false;
		return sessionData(request_).isMember();
	}
	public static final boolean isMember(JGServiceBox serviceBox_) throws Exception{
		return isMember(serviceBox_.getRequest());
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
		sessionData_.applyJSON(dataset_.toJSONString());
		return sessionData_;
	}
}
