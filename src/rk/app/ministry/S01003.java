package rk.app.ministry;

import rk.common.session.RKSessionData;
import rk.common.session.cryption.RKCryptionKeyManager;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class S01003 extends JGAction {
	
	protected final String _queryXMLSetKey = "app.ministry.S01003";
	
	public void GetDetailMinistryTeam(JGServiceBox serviceBox_, String misId_, String teamId_) throws Exception{
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "GetDetailMinistryTeam"
				,new Object[]{"misId",misId_,"teamId",teamId_});
		
		JGDataset result_ = getDBConnection().executeQuery(query_);
		serviceBox_.writer().printResultJSON(0, result_.toJSON(false));
	}
	public void GetDetailMinistryTeam(JGServiceBox serviceBox_) throws Exception{
		String misId_ = serviceBox_.getParameter("misId");
		String teamId_ = serviceBox_.getParameter("teamId");
		GetDetailMinistryTeam(serviceBox_, misId_, teamId_);
	}
	
	public int handleDetailMinistryTeamView(JGServiceBox serviceBox_, String misId_, String teamId_) throws Exception{
		if(misId_ == null || teamId_ == null) return -1;
		
		serviceBox_.setAttribute("misId", misId_);
		serviceBox_.setAttribute("teamId", teamId_);
		
		return RKSessionData.isAdmin(serviceBox_) ? 1 : 0;
	}
	public int handleDetailMinistryTeamView(JGServiceBox serviceBox_, String virtualMap_) throws Exception{
		String[] splitStr_ = virtualMap_.split("/");
		return handleDetailMinistryTeamView(serviceBox_,splitStr_[0],splitStr_[1]);
	}
	public int handleDetailMinistryTeamView(JGServiceBox serviceBox_) throws Exception{
		String misId_ = serviceBox_.getParameter("misId");
		String teamId_ = serviceBox_.getParameter("teamId");
		return handleDetailMinistryTeamView(serviceBox_, misId_, teamId_);
	}
	
	public void addMinistryTeam(JGServiceBox serviceBox_) throws Exception{
		JGDataset teamData_ = serviceBox_.getParameterAsDataset("teamData");
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "addMinistryTeam"
				, teamData_);
		String teamId_ = (String)getDBConnection().executeQueryAndGetFirst(query_);
		
		teamData_.setColumnValue("TEAM_ID", 0, teamId_, true);
		query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "updateAfterAddMinistryTeam"
				, teamData_);
		getDBConnection().executeUpdate(query_);
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0, teamId_);
	}
	public void updateMinistryTeam(JGServiceBox serviceBox_) throws Exception{
		JGDataset teamData_ = serviceBox_.getParameterAsDataset("teamData");
		teamData_.setKeyColumn("MIS_ID", true);
		teamData_.setKeyColumn("TEAM_ID", true);
		teamData_.removeColumn("ORG_NM");
		getDBConnection().executeUpdate(teamData_, "AT_MINISTRY_TME");
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0);
	}
	public void removeMinistryTeam(JGServiceBox serviceBox_) throws Exception{
		String[] decryptedStr_ = RKCryptionKeyManager.sharedManager().decryptRSA(serviceBox_, serviceBox_.getParameter("misId"),serviceBox_.getParameter("teamId"));
		String misId_ = decryptedStr_[0];
		String teamId_ = decryptedStr_[1];
		
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_queryXMLSetKey, "removeMinistryTeam"
				,new Object[]{"misId",misId_,"teamId",teamId_});
		getDBConnection().executeUpdate(query_);
		getDBConnection().commit();
		serviceBox_.writer().printResultJSON(0);
	}
}
