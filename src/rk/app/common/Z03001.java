package rk.app.common;

import rk.common.RKConfigKeyword;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;
import com.jg.main.JGMainConfig;

public class Z03001 extends JGAction{

	@Override
	protected void initAction(JGServiceBox arg0){}
	
	protected static String _mapAPIKey = null;
	protected String _getMapAPIKey(){
		if(_mapAPIKey == null){
			_mapAPIKey = JGMainConfig.sharedConfig().getCustomData(RKConfigKeyword.KEY_API_MAPAPIKEY);
		}
		
		return _mapAPIKey;
	}
	
	public void getMapAPIKey(JGServiceBox serviceBox_) throws Exception{
		String mapAPIKey_ = _getMapAPIKey();
		serviceBox_.writer().printResultJSON((mapAPIKey_ != null ? 0 : -1),mapAPIKey_);
	}

}
