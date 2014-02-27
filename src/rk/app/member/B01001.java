package rk.app.member;

import rk.common.session.RKSessionData;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;

public class B01001 extends JGAction {
	
	protected final String _queryXMLSetKey = "app.member.B01001";

	@Override
	protected void initAction(JGServiceBox arg0){}

	public int isExistSession(JGServiceBox serviceBox_) throws Exception{
		return (RKSessionData.isExistSession(serviceBox_) ? 0 : -1);
	}
	
	protected boolean _isAdmin(JGServiceBox serviceBox_) throws Exception{
		String memSid_ = RKSessionData.currentMemSid(serviceBox_);
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "isAdmin"
				, new Object[]{"memSid",memSid_});
		
		return (getDBConnection().executeQueryAndGetFirst(query_).equals("Y"));
	}
	public int isAdmin(JGServiceBox serviceBox_) throws Exception{
		return (_isAdmin(serviceBox_) ? 0 : -1);
	}
}
