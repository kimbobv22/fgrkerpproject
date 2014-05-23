package rk.app.apply;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;

public class A04001 extends JGAction{
	
	protected final String _querysetKeyName = "app.apply.A04001";
	
	public void updateFee(JGServiceBox serviceBox_) throws Exception{
		String misId_ = serviceBox_.getParameter("misId");
		String memSid_ = serviceBox_.getParameter("memSid");
		String boolValue_ = serviceBox_.getParameter("boolValue");
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "updateFee",
				new Object[]{"misId",misId_,"memSid",memSid_,"boolValue",boolValue_});
		getDBConnection().executeUpdate(query_);
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0);
	}
	public void updateBookReport(JGServiceBox serviceBox_) throws Exception{
		String misId_ = serviceBox_.getParameter("misId");
		String memSid_ = serviceBox_.getParameter("memSid");
		String boolValue_ = serviceBox_.getParameter("boolValue");
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "updateBookReport",
				new Object[]{"misId",misId_,"memSid",memSid_,"boolValue",boolValue_});
		getDBConnection().executeUpdate(query_);
		getDBConnection().commit();
		
		serviceBox_.writer().printResultJSON(0);
	}
}
