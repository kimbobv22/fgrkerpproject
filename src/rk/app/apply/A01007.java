package rk.app.apply;

import rk.common.session.RKSessionData;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class A01007 extends JGAction{
	
	protected final String _querysetKeyName = "app.apply.A01007";

	public void getLeaderApplyTargetList(JGServiceBox serviceBox_) throws Exception{
		JGDataset condData_ = serviceBox_.getParameterAsDataset("condData");
		String memSid_ = RKSessionData.currentMemSid(serviceBox_);
		condData_.setColumnValue("memSid", 0, memSid_, true);
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "getLeaderApplyTargetList", condData_);
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, result_.toJSON(false));
	}
}
