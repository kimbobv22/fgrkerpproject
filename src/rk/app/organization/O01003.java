package rk.app.organization;

import java.util.Date;
import java.util.HashMap;

import org.json.simple.JSONObject;

import rk.common.session.cryption.RKCryptionKeyManager;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;
import com.jg.vo.JGDatasetRow;

public class O01003 extends JGAction{
	
	static public final String _querysetName = "app.organization.O01003";
	
	public void getOrganizationInfo(JGServiceBox serviceBox_) throws Exception{
		String orgId_ = serviceBox_.getParameter("orgId");
		JGDBQuery query1_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetName, "getOrganizationInfo"
				,new Object[]{"orgId",orgId_});
		JGDBQuery query2_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetName, "getOrganizationBscInfo"
				,new Object[]{"orgId",orgId_});
		JGDataset primary_ = getDBConnection().executeQuery(query1_);
		JGDataset basic_ = getDBConnection().executeQuery(query2_);
		
		HashMap<String, Object> result_ = new HashMap<String, Object>();
		result_.put("primary", primary_.toJSON(false));
		result_.put("basic", basic_.toJSON(false));
		
		serviceBox_.writer().printResultJSON(0, new JSONObject(result_));
	}
	
	public void addOrganizationInfo(JGServiceBox serviceBox_) throws Exception{
		JGDataset orgData_ = serviceBox_.getParameterAsDataset("orgData");
		JGDataset orgBscData_ = serviceBox_.getParameterAsDataset("orgBscData");
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetName, "addOrganization"
				,orgData_);
		String orgId_ = (String)getDBConnection().executeQueryAndGetFirst(query_);
		
		orgData_.setColumnValue("ORG_ID", 0, orgId_, true);
		query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetName, "updateAfterAddOrganization"
				,orgData_);
		getDBConnection().executeUpdate(query_);
		
		orgBscData_.setColumnValue("ORG_ID", 0, orgId_, true);
		query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetName, "addOrganizationBsc"
				,orgBscData_);
		getDBConnection().executeUpdate(query_);
		
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0,orgId_);
	}
	public void updateOrganizationInfo(JGServiceBox serviceBox_) throws Exception{
		JGDataset orgData_ = serviceBox_.getParameterAsDataset("orgData");
		JGDataset orgBscData_ = serviceBox_.getParameterAsDataset("orgBscData");
		
		orgData_.setKeyColumn("ORG_ID", true);
		orgData_.setRowStatus(0, JGDatasetRow.ROWSTATUS_UPDATE);
		orgBscData_.setKeyColumn("ORG_ID", true);
		orgBscData_.setRowStatus(0, JGDatasetRow.ROWSTATUS_UPDATE);
		orgData_.setColumnValue("REG_DATE", 0, new Date(), true);
		getDBConnection().executeUpdate(orgData_, "AT_ORGANIZATION");
		getDBConnection().executeUpdate(orgBscData_, "AT_ORGANIZATION_BSC");
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0);
	}
	
	public void removeOrganizationInfo(JGServiceBox serviceBox_) throws Exception{
		String orgId_ = RKCryptionKeyManager.sharedManager().decryptRSA(serviceBox_, serviceBox_.getParameter("orgId"))[0];
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetName, "removeOrganizationInfo"
				,new Object[]{"orgId",orgId_});
		getDBConnection().executeUpdate(query_);
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0);
	}

}
