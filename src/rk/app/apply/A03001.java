package rk.app.apply;

import rk.app.ministry.S01001;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class A03001 extends JGAction{
	
	protected final String _querysetKeyName = "app.apply.A03001";
	
	public int _decodeMinistryId(JGServiceBox serviceBox_, String misId_) throws Exception{
		return new S01001().decodeMinistryID(serviceBox_, misId_);
	}
	public int decodeMinistryId(JGServiceBox serviceBox_, String virtualMap_) throws Exception{
		String misId_ = null;
		if(virtualMap_.indexOf("/") >= 0){
			misId_ = virtualMap_.split("/")[1];
		}
		
		return _decodeMinistryId(serviceBox_, misId_);
	}
	public int decodeMinistryId(JGServiceBox serviceBox_) throws Exception{
		return _decodeMinistryId(serviceBox_, serviceBox_.getParameter("misId"));
	}
	
	public void getMemberApplyList(JGServiceBox serviceBox_) throws Exception{
		JGDataset condData_ = serviceBox_.getParameterAsDataset("condData");
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "getMemberApplyList", condData_);
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, result_.toJSON(false));
	}
}
