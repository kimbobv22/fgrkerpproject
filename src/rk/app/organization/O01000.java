package rk.app.organization;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class O01000 extends JGAction{
	
	static public final String _querysetName = "app.organization.O01000";
	
	public void getOrgArea1(JGServiceBox serviceBox_) throws Exception{
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetName, "getOrgArea1");
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, result_.toJSON(false));
	}
	public void getOrgArea2(JGServiceBox serviceBox_) throws Exception{
		String orgArea1_ = serviceBox_.getParameter("orgArea1");
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetName, "getOrgArea2"
				,new Object[]{"orgArea1", orgArea1_});
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, result_.toJSON(false));
	}

}
