package rk.app.common;

import rk.common.session.RKSessionData;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.util.JGCommonUtils;

public class Z01001 extends JGAction{

	@Override
	protected void initAction(JGServiceBox arg0){}
	
	protected static String _queryXMLSetKey_ = "app.common.Z01001";
	
	public int canAccess(JGServiceBox serviceBox_) throws Exception{
		String memSid_ = RKSessionData.currentMemSid(serviceBox_);
		String accessCtg_ = (String)JGCommonUtils.NVL(serviceBox_.getAttribute("accessCtg"), "00000");
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey_, "canAccess"
				,new Object[]{"memSid",memSid_,"accessCtg",accessCtg_});
		return (getDBConnection().executeQueryAndGetFirst(query_).equals("Y") ? 0 : -1);
	}
	
}
