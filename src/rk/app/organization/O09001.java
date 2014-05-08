package rk.app.organization;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class O09001 extends JGAction{
	
	static public final String _querysetName = "app.organization.O01003";
	
	public void getOrganizationList(JGServiceBox serviceBox_) throws Exception{
		String orgId_ = serviceBox_.getParameter("orgId");
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetName, "getOrganizationList"
				,new Object[]{"orgId",orgId_});
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, result_.toJSON(false));
	}
}
