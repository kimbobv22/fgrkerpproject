package rk.app.organization;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class O01001 extends JGAction{
	
	static public final String _querysetName = "app.organization.O01001";
	
	public int decodeOrgId(JGServiceBox serviceBox_, String orgId_) throws Exception{
		if(orgId_ == null) return -1;
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetName, "checkOrganization"
				,new Object[]{"orgId",orgId_});
		JGDataset result_ = getDBConnection().executeQuery(query_);
		if(result_.getRowCount() == 0) return -1;
		
		serviceBox_.setAttribute("orgId", orgId_);
		return 0;
	}
	public int decodeOrgId(JGServiceBox serviceBox_) throws Exception{
		return decodeOrgId(serviceBox_, serviceBox_.getParameter("orgId"));
	}
	
	public void getOrganizationList(JGServiceBox serviceBox_) throws Exception{
		JGDataset condData_ = serviceBox_.getParameterAsDataset("condData");
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetName, "getOrganizationList",condData_);
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, result_.toJSON(false));
	}
}
