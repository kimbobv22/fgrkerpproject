package rk.app.main;

import rk.common.session.RKSessionData;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class M03001 extends JGAction {
	
	protected final String _queryXMLSetKey = "app.main.M03001";
	
	public void getMenuList(JGServiceBox serviceBox_) throws Exception{
		String accessSid_ = RKSessionData.currentMemSid(serviceBox_);
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "getMenuList"
				,new Object[]{"accessSid",accessSid_});
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.setAttribute("menuList", result_);
	}
}
