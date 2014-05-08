package rk.app.common;

import rk.common.session.cryption.RKCryptionKeyManager;

import com.jg.action.JGAction;
import com.jg.action.handler.JGServiceBox;

public class Z05001 extends JGAction{
	
	public void genCryptionKey(JGServiceBox serviceBox_) throws Exception{
		serviceBox_.writer().printResultJSON(0, RKCryptionKeyManager.sharedManager().genRSAKey(serviceBox_));
	}

}
