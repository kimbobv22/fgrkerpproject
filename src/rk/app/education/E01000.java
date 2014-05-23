package rk.app.education;

import rk.common.session.RKSessionData;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class E01000 extends JGAction {
	
	protected final String _querysetKeyName = "app.education.E01000";

	public int _decodeEducation(JGServiceBox serviceBox_, String misId_) throws Exception{
		boolean isAdmin_ = RKSessionData.isAdmin(serviceBox_);
		if(!RKSessionData.isExistSession(serviceBox_)) return -2;
		
		String misTitle_ = null;
		JGDBQuery query_ = null;
		if(misId_ == null || misId_.length() == 0){
			query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "getCurrentMinistryInfo");
		}else{
			query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "getMinistryInfo", new Object[]{"misId",misId_});
		}
		
		JGDataset dataset_ = getDBConnection().executeQuery(query_);
		if(dataset_.getRowCount() == 0){
			return -1;
		}
		misTitle_ = (String)dataset_.getColumnValue("mis_title", 0);
		
		serviceBox_.setAttribute("misId", misId_);
		serviceBox_.setAttribute("misTitle", misTitle_);
		
		return isAdmin_ ? 1 : 0;
	}
	public int decodeEducation(JGServiceBox serviceBox_, String pattern_) throws Exception{
		return _decodeEducation(serviceBox_, pattern_);
	}
		
	public int decodeEducation(JGServiceBox serviceBox_) throws Exception{
		return _decodeEducation(serviceBox_, serviceBox_.getParameter("misId"));
	}
	
	public int _decodeEducationDetail(JGServiceBox serviceBox_, String misId_, String eduId_) throws Exception{
		boolean isAdmin_ = RKSessionData.isAdmin(serviceBox_);
		if(!RKSessionData.isExistSession(serviceBox_)) return -2;
		
		int upperResult_ = _decodeEducation(serviceBox_, misId_);
		if(upperResult_ < 0) return upperResult_;
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "getEducationInfo"
				,new Object[]{"misId",serviceBox_.getAttribute("misId"),"eduId",eduId_});
		JGDataset dataset_ = getDBConnection().executeQuery(query_);
		if(dataset_.getRowCount() == 0){
			return -1;
		}
		
		String eduNm_ = (String)dataset_.getColumnValue("edu_nm", 0);
		serviceBox_.setAttribute("eduId", eduId_);
		serviceBox_.setAttribute("eduNm", eduNm_);
		
		return isAdmin_ ? 1 : 0;
	}
	public int decodeEducationDetail(JGServiceBox serviceBox_, String pattern_) throws Exception{
		String[] splitedStrs_ = pattern_.split("/");
		return _decodeEducationDetail(serviceBox_, splitedStrs_[0], splitedStrs_[1]);
	}
	public int decodeEducationDetail(JGServiceBox serviceBox_) throws Exception{
		return _decodeEducationDetail(serviceBox_, serviceBox_.getParameter("misId"), serviceBox_.getParameter("eduId"));
	}
	
	public int _decodeEducationResult(JGServiceBox serviceBox_, String misId_, String eduId_, String eduDid_) throws Exception{
		boolean isAdmin_ = RKSessionData.isAdmin(serviceBox_);
		if(!RKSessionData.isExistSession(serviceBox_)) return -2;
		
		int upperResult_ = _decodeEducationDetail(serviceBox_, misId_, eduId_);
		if(upperResult_ < 0) return upperResult_;
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "getEducationDetailInfo"
				,new Object[]{"misId",serviceBox_.getAttribute("misId"),"eduId"
					,serviceBox_.getAttribute("eduId"),"eduDid",eduDid_});
		JGDataset dataset_ = getDBConnection().executeQuery(query_);
		if(dataset_.getRowCount() == 0){
			return -1;
		}
		
		String eduDnm_ = (String)dataset_.getColumnValue("edu_dnm", 0);
		serviceBox_.setAttribute("eduDid", eduId_);
		serviceBox_.setAttribute("eduDnm", eduDnm_);
		
		return isAdmin_ ? 1 : 0;
	}
	public int decodeEducationResult(JGServiceBox serviceBox_, String pattern_) throws Exception{
		String[] splitedStrs_ = pattern_.split("/");
		return _decodeEducationResult(serviceBox_, splitedStrs_[0], splitedStrs_[1], splitedStrs_[2]);
	}
	public int decodeEducationResult(JGServiceBox serviceBox_) throws Exception{
		return _decodeEducationResult(serviceBox_, serviceBox_.getParameter("misId")
				,serviceBox_.getParameter("eduId")
				,serviceBox_.getParameter("eduDid"));
	}
}
