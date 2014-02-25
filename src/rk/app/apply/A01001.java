package rk.app.apply;

import rk.common.session.RKSessionData;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;

public class A01001 extends JGAction {
	
	protected final String _queryXMLSetKey = "app.apply.A01001";

	@Override
	protected void initAction(JGServiceBox arg0){}

	public int isExistSession(JGServiceBox serviceBox_) throws Exception{
		return (RKSessionData.isExistSession(serviceBox_) ? 0 : -1);
	}
	public int isAdmin(JGServiceBox serviceBox_) throws Exception{
		String applyId_ = RKSessionData.currentApplyID(serviceBox_);
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "isAdmin"
				, new Object[]{"applyId",applyId_});
		
		return (getDBConnection().executeQueryAndGetFirst(query_).equals("Y") ? 0 : -1);
	}
}
