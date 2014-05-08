package rk.app.ministry;

import rk.common.session.RKSessionData;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class S01001 extends JGAction {
	
	protected final String _queryXMLSetKey = "app.ministry.S01001";
	
	public int decodeMinistryID(JGServiceBox serviceBox_, String misId_) throws Exception{
		if(misId_ == null){
			JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getCurrentMinistryID");
			JGDataset dataset_ = getDBConnection().executeQuery(query_);
			if(dataset_.getRowCount() > 0)
				misId_ = (String)dataset_.getColumnValue(0, 0);
		}
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getMinistryTitle"
				,new Object[]{"misId",misId_});
		JGDataset dataset_ = getDBConnection().executeQuery(query_);
		if(dataset_.getRowCount() == 0) return -1;
		
		serviceBox_.setAttribute("misId", misId_);
		serviceBox_.setAttribute("misTitle", dataset_.getColumnValue("mis_title", 0));
		return 0;
	}
	public int decodeMinistryID(JGServiceBox serviceBox_) throws Exception{
		return decodeMinistryID(serviceBox_, serviceBox_.getParameter("misId"));
	}

	public void getMinistryArea1(JGServiceBox serviceBox_) throws Exception{
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getMinistryArea1"
				,new Object[]{"misId",serviceBox_.getParameter("misId"),"isAdmin",RKSessionData.isAdmin(serviceBox_)});
		JGDataset dataset_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, dataset_.toJSON(false));
	}
	
	public void getMinistryArea2(JGServiceBox serviceBox_) throws Exception{
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getMinistryArea2"
				,new Object[]{"misId",serviceBox_.getParameter("misId")
				,"misArea1", serviceBox_.getParameter("misArea1")
				,"isAdmin",RKSessionData.isAdmin(serviceBox_)});
		JGDataset dataset_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, dataset_.toJSON(false));
	}
	
	public void getMinistryCtg1(JGServiceBox serviceBox_) throws Exception{
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getMinistryCtg1"
				,new Object[]{"misId",serviceBox_.getParameter("misId"),"isAdmin",RKSessionData.isAdmin(serviceBox_)});
		JGDataset dataset_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, dataset_.toJSON(false));
	}
	public void getMinistryCtg2(JGServiceBox serviceBox_) throws Exception{
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getMinistryCtg2"
				,new Object[]{"misId",serviceBox_.getParameter("misId"),"misCtg1", serviceBox_.getParameter("misCtg1")
				,"isAdmin",RKSessionData.isAdmin(serviceBox_)});
		JGDataset dataset_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, dataset_.toJSON(false));
	}
	
	public void getMinistryTeamList(JGServiceBox serviceBox_) throws Exception{
		JGDataset condData_ = serviceBox_.getParameterAsDataset("condData");
		condData_.setColumnValue("ISADMIN", 0, RKSessionData.isAdmin(serviceBox_), true);
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getMinistryTeamList"
				,condData_);
		JGDataset dataset_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, dataset_.toJSON(false));
	}
}
