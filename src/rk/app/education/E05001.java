package rk.app.education;

import javax.servlet.http.HttpServletResponse;

import rk.common.session.cryption.RKCryptionKeyManager;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class E05001 extends JGAction {
	
	protected final String _querysetKeyName = "app.education.E05001";
	
	public int _decodeAttend(JGServiceBox serviceBox_, String misId_, String eduId_, String eduDid_) throws Exception{
		return new E01000()._decodeEducationResult(serviceBox_, misId_, eduId_, eduDid_);
	}
	public int decodeAttend(JGServiceBox serviceBox_, String pattern_) throws Exception{
		String[] splitedStr_ = pattern_.split("/");
		return _decodeAttend(serviceBox_, splitedStr_[1], splitedStr_[2], splitedStr_[3]);
	}
	public int decodeAttend(JGServiceBox serviceBox_) throws Exception{
		return _decodeAttend(serviceBox_, serviceBox_.getParameter("misId"), serviceBox_.getParameter("eduId"), serviceBox_.getParameter("eduDid"));
	}
	public void getAttendList(JGServiceBox serviceBox_) throws Exception{
		JGDataset condData_ = serviceBox_.getParameterAsDataset("condData");
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "getAttendList"
				,condData_);
		
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, result_.toJSON(false));
	}
	
	public void updateAttend(JGServiceBox serviceBox_) throws Exception{
		if(serviceBox_.getRequest().getMethod() != "POST"){
			serviceBox_.getResponse().sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		RKCryptionKeyManager cryptManager_ = RKCryptionKeyManager.sharedManager();
		
		String[] decryptedStr_ = cryptManager_.decryptRSA(serviceBox_, serviceBox_.getParameter("misId")
				,serviceBox_.getParameter("eduId")
				,serviceBox_.getParameter("eduDid")
				,serviceBox_.getParameter("memSid")
				,serviceBox_.getParameter("status"));
		
		String misId_ = decryptedStr_[0];
		String eduId_ = decryptedStr_[1];
		String eduDid_ = decryptedStr_[2];
		String memSid_ = decryptedStr_[3];
		String status_ = decryptedStr_[4];
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "updateAttend"
				,new Object[]{"misId",misId_,"eduId",eduId_,"eduDid",eduDid_,"memSid",memSid_,"status",status_});
		getDBConnection().executeUpdate(query_);
		getDBConnection().commit();
		
		serviceBox_.writer().printResultJSON(0);
	}
}
