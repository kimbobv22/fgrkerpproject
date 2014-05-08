package rk.app.recommender;

import rk.common.session.RKSessionData;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;

public class R01001 extends JGAction {
	
	protected final String _queryXMLSetKey = "app.recommender.U01001";

	public int isRecommender(JGServiceBox serviceBox_) throws Exception{
		String misId_ = serviceBox_.getParameter("misId");
		String memSid_ = RKSessionData.currentMemSid(serviceBox_);
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "isRecommender"
				, new Object[]{"misId",misId_,"memSid",memSid_});
		
		return (getDBConnection().executeQueryAndGetFirst(query_).equals("Y") ? 0 : -1);
	}

}
