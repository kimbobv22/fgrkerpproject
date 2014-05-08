package rk.app.member;

import rk.common.session.RKSessionData;
import rk.common.session.cryption.RKCryptionKeyManager;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class B01001 extends JGAction {
	
	protected final String _queryXMLSetKey = "app.member.B01001";

	public int isExistSession(JGServiceBox serviceBox_) throws Exception{
		return (RKSessionData.isExistSession(serviceBox_) ? 0 : -1);
	}
	
	public int _doLogin(JGServiceBox serviceBox_, String userSid_) throws Exception{
		if(userSid_ == null) return -1;
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "checkMemberData"
				,new Object[]{"userSid",userSid_});
		JGDataset result_ = getDBConnection().executeQuery(query_);
		if(result_.getRowCount() == 0){
			query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "addMemberData"
					,new Object[]{"userSid",userSid_});
			result_ = getDBConnection().executeQuery(query_);
			getDBConnection().commit();
			if(result_.getRowCount() == 0) return -1;
		}
		
		RKSessionData sessionData_ = RKSessionData.makeSessionData(result_);
		RKSessionData.setRKSessionData(serviceBox_, sessionData_);
		
		return 0;
	}
	public void doLogin(JGServiceBox serviceBox_) throws Exception{
		String cryptedUserSid_ = serviceBox_.getParameter("userSid");
		if(cryptedUserSid_ == null){
			serviceBox_.writer().printResultJSON(-1);
			return;
		}
		
		String userSid_ = RKCryptionKeyManager.sharedManager().decryptRSA(serviceBox_, cryptedUserSid_)[0];
		serviceBox_.writer().printResultJSON(_doLogin(serviceBox_, userSid_));
	}
	
	
	public int _doTempLogin(JGServiceBox serviceBox_, JGDataset loginData_) throws Exception{
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "temp_checkACTingUser"
				,loginData_);
		
		JGDataset checkData_ = getDBConnection().executeQuery(query_);
		if(checkData_.getRowCount() == 0){
			return -1;
		}else if(checkData_.getColumnValue("CHECK_PASS", 0).equals("N")){
			return -2;
		}
		
		String userSid_ = (String)checkData_.getColumnValue("USER_SID", 0);
		
		query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "checkMemberData"
				,new String[]{"userSid",userSid_});
		JGDataset result_ = getDBConnection().executeQuery(query_);
		if(result_.getRowCount() == 0){
			query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "addMemberData"
					,new String[]{"userSid",userSid_});
			result_ = getDBConnection().executeQuery(query_);
			getDBConnection().commit();
			if(result_.getRowCount() == 0) return -1;
		}
		
		RKSessionData sessionData_ = RKSessionData.makeSessionData(result_);
		RKSessionData.setRKSessionData(serviceBox_, sessionData_);
		
		return 0;
	}
	public void doTempLogin(JGServiceBox serviceBox_) throws Exception{
		String loginStr_ = RKCryptionKeyManager.sharedManager().decryptRSA(serviceBox_, serviceBox_.getParameter("loginData"))[0];
		JGDataset loginData_ = new JGDataset(loginStr_);
		serviceBox_.writer().printResultJSON(_doTempLogin(serviceBox_, loginData_));
	}
	
	public void doLogout(JGServiceBox serviceBox_) throws Exception{
		RKSessionData.setRKSessionData(serviceBox_, null);
		serviceBox_.writer().printResultJSON(0);
	}
}
