package rk.app.ministry;

import rk.common.session.cryption.RKCryptionKeyManager;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class S02003 extends JGAction {
	
	protected final String _queryXMLSetKey = "app.ministry.S02003";
	
	public int handleMinistryInfo(JGServiceBox serviceBox_) throws Exception{
		String misId_ = serviceBox_.getParameter("misId");
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "checkMinistryInfo"
				,new Object[]{"misId",misId_});
		JGDataset result_ = getDBConnection().executeQuery(query_);
		if(result_.getRowCount() == 0) return -1;
		
		serviceBox_.setAttribute("misId", misId_);
		return 0;
	}
	
	public void getMinistryData(JGServiceBox serviceBox_) throws Exception{
		String misId_ = serviceBox_.getParameter("misId");
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getMinistryInfo"
				,new Object[]{"misId",misId_});
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, result_.toJSON(false));
	}
	
	public void addMinistryData(JGServiceBox serviceBox_) throws Exception{
		JGDataset misData_ = serviceBox_.getParameterAsDataset("misData");
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "addMinistryData"
				, misData_);
		
		String misId_ = (String)getDBConnection().executeQueryAndGetFirst(query_);
		misData_.setColumnValue("MIS_ID", 0, misId_, true);
		
		query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "updateAfterAddMinistryData"
				,misData_);
		getDBConnection().executeUpdate(query_);
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0, misId_);
	}
	public void updateMinistryData(JGServiceBox serviceBox_) throws Exception{
		JGDataset misData_ = serviceBox_.getParameterAsDataset("misData");
		misData_.setKeyColumn("MIS_ID", true);
		getDBConnection().executeUpdate(misData_, "AT_MINISTRY");
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0);
	}
	public void removeMinistryData(JGServiceBox serviceBox_) throws Exception{
		String misId_ = RKCryptionKeyManager.sharedManager().decryptRSA(serviceBox_, serviceBox_.getParameter("misId"))[0];
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "removeMinistryData", new Object[]{"misId",misId_});
		
		getDBConnection().executeUpdate(query_);
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0);
	}
}
