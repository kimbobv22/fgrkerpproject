package rk.app.main;

import rk.common.session.RKSessionData;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;

public class M01001 extends JGAction {
	
	protected final String _queryXMLSetKey = "app.main.M01001";
	
	static public final int ACCESSLVL_NONE = 0;
	static public final int ACCESSLVL_MEMBER = 1;
	static public final int ACCESSLVL_AMEMBER = 2;
	static public final int ACCESSLVL_ALEADER = 3;
	static public final int ACCESSLVL_RECOMMENDER = 4;
	static public final int ACCESSLVL_ADMIN = 5;
	
	public int getAccessLVL(String memSid_) throws Exception{
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getAccessLVL"
				,new Object[]{"memSid",memSid_});
		int accessLvl_ = (Integer)getDBConnection().executeQueryAndGetFirst(query_);
		return accessLvl_;
	}
	
	public int isOverMember(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) >= ACCESSLVL_MEMBER ? 0 : -1);
	}
	public int isLessMember(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) < ACCESSLVL_MEMBER ? 0 : -1);
	}
	public int isEqualsMember(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) == ACCESSLVL_MEMBER ? 0 : -1);
	}
	
	public int isOverAMember(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) >= ACCESSLVL_AMEMBER ? 0 : -1);
	}
	public int isLessAMember(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) < ACCESSLVL_AMEMBER ? 0 : -1);
	}
	public int isEqualsAMember(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) == ACCESSLVL_AMEMBER ? 0 : -1);
	}
	
	public int isOverALeader(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) >= ACCESSLVL_ALEADER? 0 : -1);
	}
	public int isLessALeader(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) < ACCESSLVL_ALEADER ? 0 : -1);
	}
	public int isEqualsALeader(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) == ACCESSLVL_ALEADER ? 0 : -1);
	}
	
	public int isOverRecommender(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) >= ACCESSLVL_RECOMMENDER? 0 : -1);
	}
	public int isLessRecommender(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) < ACCESSLVL_RECOMMENDER ? 0 : -1);
	}
	public int isEqualsRecommender(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) == ACCESSLVL_RECOMMENDER ? 0 : -1);
	}
	
	public int isOverAdmin(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) >= ACCESSLVL_ADMIN? 0 : -1);
	}
	public int isLessAdmin(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) < ACCESSLVL_ADMIN ? 0 : -1);
	}
	public int isEqualsAdmin(JGServiceBox serviceBox_) throws Exception{
		return (getAccessLVL(RKSessionData.currentMemSid(serviceBox_)) == ACCESSLVL_ADMIN ? 0 : -1);
	}
}
