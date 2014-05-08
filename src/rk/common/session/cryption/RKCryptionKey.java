package rk.common.session.cryption;

import java.security.PrivateKey;
import java.util.HashMap;

import org.json.simple.JSONObject;


public class RKCryptionKey{
	protected PrivateKey _privateKey = null;
	protected void setPrivateKey(PrivateKey privateKey_){
		_privateKey = privateKey_;
	}
	public PrivateKey getPrivateKey(){
		return _privateKey;
	}
	
	protected String _publicKeyModules = null;
	protected void setPublicKeyModules(String modules_){
		_publicKeyModules = modules_;
	}
	public String getPublicKeyModules(){
		return _publicKeyModules;
	}
	protected String _publicKeyExponent = null;
	protected void setPublicKeyExponent(String exponent_){
		_publicKeyExponent = exponent_;
	}
	public String getPublicKeyExponent(){
		return _publicKeyExponent;
	}
	
	protected RKCryptionKey(PrivateKey privateKey_, String publicKeyModules_, String publicKeyExponent_){
		_privateKey = privateKey_;
		_publicKeyModules = publicKeyModules_;
		_publicKeyExponent = publicKeyExponent_;
	}
	
	public JSONObject publicKeyJSON(){
		HashMap<String, String> result_ = new HashMap<String, String>();
		result_.put("modules", _publicKeyModules);
		result_.put("exponent", _publicKeyExponent);
		return new JSONObject(result_);
	}
	
}
