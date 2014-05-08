package rk.common.session.cryption;

import java.util.UUID;

import org.json.simple.JSONObject;

import com.jg.action.handler.JGServiceBox;

public class RKCryptionKeyManager{
	
	static private RKCryptionKeyManager _sharedManager = null;
	
	static public RKCryptionKeyManager sharedManager(){
		if(_sharedManager == null){
			synchronized(RKCryptionKeyManager.class){
				_sharedManager = new RKCryptionKeyManager();
			}
		}
		
		return _sharedManager;
	}
	
	private String _sessionKey = UUID.randomUUID().toString();
	
	protected int _rsaKeySize = 2048;
	public void setRSAKeySize(int keySize_){
		_rsaKeySize = keySize_;
	}
	public int getRSAKeySize(){
		return _rsaKeySize;
	}
	
	public JSONObject genRSAKey(JGServiceBox serviceBox_, int keySize_) throws Exception{
		RKCryptionKey cryptionKey_ = RKCryptionUtils.createRSAKey(keySize_);
		serviceBox_.getSession().setAttribute(_sessionKey, cryptionKey_);
		return cryptionKey_.publicKeyJSON();
	}
	public JSONObject genRSAKey(JGServiceBox serviceBox_) throws Exception{
		return genRSAKey(serviceBox_ , getRSAKeySize());
	}
	
	public RKCryptionKey collectRSAKey(JGServiceBox serviceBox_) throws Exception{
		RKCryptionKey cryptionKey_ = (RKCryptionKey)serviceBox_.getSession().getAttribute(_sessionKey);
		serviceBox_.getSession().setAttribute(_sessionKey, null);
		return cryptionKey_;
	}
	public String[] decryptRSA(JGServiceBox serviceBox_, String ... strs_) throws Exception{
		RKCryptionKey cryptionKey_ = collectRSAKey(serviceBox_);
		
		int length_ = strs_.length;
		String[] result_ = new String[length_];
		for(int index_=0;index_<length_;++index_){
			result_[index_] = RKCryptionUtils.decryptRSA(strs_[index_], cryptionKey_);
		}
		
		return result_;
	}
}
