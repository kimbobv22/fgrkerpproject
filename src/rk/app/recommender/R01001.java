package rk.app.recommender;

import rk.common.session.RKSessionData;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;

public class R01001 extends JGAction {
	
	protected final String _queryXMLSetKey = "app.recommender.U01001";

	@Override
	protected void initAction(JGServiceBox arg0){}

	public int isRecommender(JGServiceBox serviceBox_) throws Exception{
		String applyId_ = RKSessionData.currentApplyID(serviceBox_);
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "isRecommender"
				, new Object[]{"applyId",applyId_});
		
		return (getDBConnection().executeQueryAndGetFirst(query_).equals("Y") ? 0 : -1);
	}

}
