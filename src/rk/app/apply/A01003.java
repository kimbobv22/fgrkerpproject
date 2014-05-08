package rk.app.apply;

import java.util.Date;
import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import rk.common.session.RKSessionData;
import rk.common.session.cryption.RKCryptionKeyManager;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class A01003 extends JGAction{
	
	protected final String _querysetKeyName = "app.apply.A01003";
	
	public int canMemberApply(JGServiceBox serviceBox_, String misId_) throws Exception{
		String memSid_ = RKSessionData.currentMemSid(serviceBox_);
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "canMemberApply"
				,new Object[]{"misId",misId_,"memSid",memSid_});
		return (getDBConnection().executeQueryAndGetFirst(query_).equals("Y") ? 0 : -1);
	}
	
	public int decodeNewMemberApply(JGServiceBox serviceBox_) throws Exception{
		String misId_ = serviceBox_.getParameter("misId");
		String memSid_ = RKSessionData.currentMemSid(serviceBox_);
		
		if(misId_ == null) return -2;
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "checkMemberApply"
				,new Object[]{"misId",misId_,"memSid",memSid_});
		JGDataset result_ = getDBConnection().executeQuery(query_);
		
		if(result_.getRowCount() > 0) return -1;
		if(canMemberApply(serviceBox_, misId_) == -1) return -2;
		
		query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "initializeMemberApplyData"
				,new Object[]{"misId",misId_,"memSid",memSid_});
		getDBConnection().executeUpdate(query_);
		getDBConnection().commit();
		
		serviceBox_.setAttribute("misId", misId_);
		serviceBox_.setAttribute("memSid", memSid_);
		
		return 0;
	}

	public void getApplyData(JGServiceBox serviceBox_) throws Exception{
		JGDataset condData_ = serviceBox_.getParameterAsDataset("condData");
		String misId_ = (String)condData_.getColumnValue("misId", 0);
		String memSid_ = (String)condData_.getColumnValue("memSid", 0);
		
		if(new A01000().canAccess(serviceBox_, misId_, memSid_) == -1){
			serviceBox_.getResponse().sendError(HttpServletResponse.SC_UNAUTHORIZED);
			return;
		}
		
		JGDataset misData_, basicData_, qnaData_ = null;
		
		JGDBQuery query1_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "getMinistryData",condData_);
		JGDBQuery query2_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "getBasicData",condData_);
		JGDBQuery query3_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "getQnaData",condData_);
		
		misData_ = getDBConnection().executeQuery(query1_);
		basicData_ = getDBConnection().executeQuery(query2_);
		qnaData_ = getDBConnection().executeQuery(query3_);
		
		HashMap<String, Object> result_ = new HashMap<String, Object>();
		
		result_.put("ministry", misData_.toJSON(false));
		result_.put("basic", basicData_.toJSON(false));
		result_.put("qna", qnaData_.toJSON(false));
		serviceBox_.writer().printResultJSON(0, new JSONObject(result_));
	}
	
	public void updateApplyData(JGServiceBox serviceBox_) throws Exception{
		JGDataset misData_ = serviceBox_.getParameterAsDataset("misData");
		JGDataset basicData_ = serviceBox_.getParameterAsDataset("basicData");
		JGDataset qnaData_ = serviceBox_.getParameterAsDataset("qnaData");
		
		String misId_ = (String)misData_.getColumnValue("MIS_ID", 0);
		String memSid_ = (String)misData_.getColumnValue("MEM_SID", 0);
		
		if(new A01000().canAccess(serviceBox_, misId_, memSid_) == -1){
			serviceBox_.getResponse().sendError(HttpServletResponse.SC_UNAUTHORIZED);
			return;
		}
		
		misData_.setKeyColumn("MIS_ID", true);misData_.setKeyColumn("MEM_SID", true);
		basicData_.setKeyColumn("MIS_ID", true);basicData_.setKeyColumn("MEM_SID", true);
		qnaData_.setKeyColumn("MIS_ID", true);qnaData_.setKeyColumn("MEM_SID", true);
		
		basicData_.removeColumn("FAVOR_TEAM_NM1");basicData_.removeColumn("FAVOR_TEAM_NM2");
		basicData_.removeColumn("DID_CHANGE_PHOTO");basicData_.removeColumn("PHOTO_PATH");
		
		if(misData_.isModified()) misData_.setColumnValue("MOD_DATE", 0, new Date(), true);
		if(basicData_.isModified()) basicData_.setColumnValue("MOD_DATE", 0, new Date(), true);
		if(qnaData_.isModified()) qnaData_.setColumnValue("MOD_DATE", 0, new Date(), true);
		
		getDBConnection().executeUpdate(misData_, "AT_APPLY");
		getDBConnection().executeUpdate(basicData_, "AT_APPLY_M_BSC");
		getDBConnection().executeUpdate(qnaData_, "AT_APPLY_M_QNA");
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0);
	}
	
	public void submitApplyData(JGServiceBox serviceBox_) throws Exception{
		String[] decryptedStr_ = RKCryptionKeyManager.sharedManager().decryptRSA(serviceBox_
				,serviceBox_.getParameter("misId"),serviceBox_.getParameter("memSid"));
		String misId_ = decryptedStr_[0];
		String memSid_ = decryptedStr_[1];
		
		if(new A01000().canAccess(serviceBox_, misId_, memSid_) == -1){
			serviceBox_.getResponse().sendError(HttpServletResponse.SC_UNAUTHORIZED);
			return;
		}
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "submitApplyData"
				,new Object[]{"misId",misId_,"memSid",memSid_});
		getDBConnection().executeUpdate(query_);
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0);
	}
	
	public void removeApplyData(JGServiceBox serviceBox_) throws Exception{
		String[] decryptedStr_ = RKCryptionKeyManager.sharedManager().decryptRSA(serviceBox_
				,serviceBox_.getParameter("misId"),serviceBox_.getParameter("memSid"));
		String misId_ = decryptedStr_[0];
		String memSid_ = decryptedStr_[1];
		
		if(new A01000().canAccess(serviceBox_, misId_, memSid_) == -1){
			serviceBox_.getResponse().sendError(HttpServletResponse.SC_UNAUTHORIZED);
			return;
		}
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "removeApplyData"
				,new Object[]{"misId",misId_,"memSid",memSid_});
		getDBConnection().executeUpdate(query_);
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0);
	}
	
	public void rejectApply(JGServiceBox serviceBox_) throws Exception{
		JGDataset rejectData_ = serviceBox_.getParameterAsDataset("rejectData");
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "rejectApplyData",rejectData_);
		
		getDBConnection().executeUpdate(query_);
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0);
	}
}
