package rk.app.common;

import java.util.HashMap;

import org.json.simple.JSONObject;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.vo.JGDataset;

public class Z07001 extends JGAction{
	
	static public final String _querysetName = "app.common.Z07001";
	
	public void getGCode(JGServiceBox serviceBox_) throws Exception{
		JGDataset condData_ = serviceBox_.getParameterAsDataset("condData");
		HashMap<String, Object> result_ = new HashMap<String, Object>();
		
		int rowCount_ = condData_.getRowCount();
		for(int rowIndex_=0;rowIndex_<rowCount_;++rowIndex_){
			JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetName, "getGCode", condData_, rowIndex_);
			JGDataset gcodeData_ = getDBConnection().executeQuery(query_);
			result_.put((String)condData_.getColumnValue("CODE_ID", rowIndex_), gcodeData_.toJSON(true));
		}
		
		serviceBox_.writer().printResultJSON(0, new JSONObject(result_));
	}

}
