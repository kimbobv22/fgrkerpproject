package rk.app.ministry;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class S02001 extends JGAction {
	
	protected final String _queryXMLSetKey = "app.ministry.S02001";
	
	public void getMinistryYearList(JGServiceBox serviceBox_) throws Exception{
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getMinistryYearList");
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, result_.toJSON(false));
	}
	public void getMinistryStatusList(JGServiceBox serviceBox_) throws Exception{
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getMinistryStatusList");
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, result_.toJSON(false));
	}
	
	public void getMinistryList(JGServiceBox serviceBox_) throws Exception{
		JGDataset condData_ = serviceBox_.getParameterAsDataset("condData");
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getMinistryList",condData_);
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, result_.toJSON(false));
	}
}
