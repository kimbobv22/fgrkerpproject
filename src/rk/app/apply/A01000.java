package rk.app.apply;

import rk.common.session.RKSessionData;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class A01000 extends JGAction{
	
	protected final String _querysetKeyName = "app.apply.A01000";
	
	static public final String STR_KEY_MEMBER = "member";
	static public final String STR_KEY_LEADER = "leader";
	
	protected int _decodeApply(JGServiceBox serviceBox_, String misId_, String memSid_, String checkQuery_, String applyCtg_) throws Exception{
		if(misId_ == null || memSid_ == null) return -1;
		
		String accessSid_ = RKSessionData.currentMemSid(serviceBox_);
		boolean isMine_ = memSid_.equals(accessSid_);
		boolean isAdmin_ = RKSessionData.isAdmin(serviceBox_);
		if(!isMine_ && !isAdmin_) return -1;
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, checkQuery_
				, new Object[]{"misId",misId_,"memSid",memSid_});
		JGDataset result_ = getDBConnection().executeQuery(query_);
		
		if(result_.getRowCount() == 0) return -2;
		if(!result_.getColumnValue("APPLY_CTG", 0).equals(applyCtg_)) return -2;
		
		boolean canModify_ = result_.getColumnValue("CAN_MODIFY", 0).equals("Y");
		
		serviceBox_.setAttribute("misId", misId_);
		serviceBox_.setAttribute("memSid", memSid_);
		
		if(!canModify_) return 0;
		else return (!isMine_ && isAdmin_ ? 0 : 1);
	}

	public int decodeMemberApply(JGServiceBox serviceBox_, String misId_, String memSid_) throws Exception{
		return _decodeApply(serviceBox_, misId_, memSid_, "checkMemberApply", "00001");
	}
	
	public int decodeMemberApply(JGServiceBox serviceBox_, String virtualMap_) throws Exception{
		String[] splitedStr_ = virtualMap_.split("/");
		return decodeMemberApply(serviceBox_, splitedStr_[1], RKSessionData.currentMemSid(serviceBox_));
	}
	public int decodeMemberApply(JGServiceBox serviceBox_) throws Exception{
		return decodeMemberApply(serviceBox_, serviceBox_.getParameter("misId"));
	}
	public int decodeMemberApplyOther(JGServiceBox serviceBox_, String virtualMap_) throws Exception{
		String[] splitedStr_ = virtualMap_.split("/");
		return decodeMemberApply(serviceBox_, splitedStr_[1],splitedStr_[2]);
	}
	public int decodeMemberApplyOther(JGServiceBox serviceBox_) throws Exception{
		return decodeMemberApply(serviceBox_, serviceBox_.getParameter("misId"), serviceBox_.getParameter("memSid"));
	}
	
	public int decodeLeaderApply(JGServiceBox serviceBox_, String misId_, String memSid_) throws Exception{
		return _decodeApply(serviceBox_, misId_, memSid_, "checkLeaderApply", "00003");
	}
	
	public int decodeLeaderApply(JGServiceBox serviceBox_, String virtualMap_) throws Exception{
		String[] splitedStr_ = virtualMap_.split("/");
		return decodeLeaderApply(serviceBox_, splitedStr_[1], RKSessionData.currentMemSid(serviceBox_));
	}
	public int decodeLeaderApply(JGServiceBox serviceBox_) throws Exception{
		return decodeLeaderApply(serviceBox_, serviceBox_.getParameter("misId"));
	}
	public int decodeLeaderApplyOther(JGServiceBox serviceBox_, String virtualMap_) throws Exception{
		String[] splitedStr_ = virtualMap_.split("/");
		return decodeLeaderApply(serviceBox_, splitedStr_[1],splitedStr_[2]);
	}
	public int decodeLeaderApplyOther(JGServiceBox serviceBox_) throws Exception{
		return decodeLeaderApply(serviceBox_, serviceBox_.getParameter("misId"), serviceBox_.getParameter("memSid"));
	}
	
	public int canAccess(JGServiceBox serviceBox_, String misId_, String memSid_) throws Exception{
		if(!RKSessionData.isExistSession(serviceBox_)) return -1;
		
		//todo
		String accessSid_ = RKSessionData.currentMemSid(serviceBox_);
		
		if(!RKSessionData.isAdmin(serviceBox_) && !accessSid_.equals(memSid_)) return -1;
		return 0;
	}
	public int canAccess(JGServiceBox serviceBox_) throws Exception{
		return canAccess(serviceBox_,serviceBox_.getParameter("misId"), serviceBox_.getParameter("memSid"));
	}
}
