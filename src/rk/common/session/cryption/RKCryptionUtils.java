package rk.common.session.cryption;

import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;

import javax.crypto.Cipher;

import com.jg.main.JGMainConfig;

public class RKCryptionUtils{
	
	static public RKCryptionKey createRSAKey(int keySize_) throws Exception{
		KeyPairGenerator generator_ = KeyPairGenerator.getInstance("RSA");
		generator_.initialize(keySize_);
		KeyPair keyPair_ = generator_.generateKeyPair();
		KeyFactory keyFactory_ = KeyFactory.getInstance("RSA");
		
		PublicKey publicKey_ = keyPair_.getPublic();
		PrivateKey privateKey_ = keyPair_.getPrivate();
		
		RSAPublicKeySpec publicSpec_ = (RSAPublicKeySpec)keyFactory_.getKeySpec(publicKey_, RSAPublicKeySpec.class);
		String publicKeyModulus = publicSpec_.getModulus().toString(16);
		String publicKeyExponent = publicSpec_.getPublicExponent().toString(16);
		
		return new RKCryptionKey(privateKey_, publicKeyModulus, publicKeyExponent);
	}
	
	static protected byte[] hexToByteArray(String hex_) throws Exception{
		byte[] bytes_ = new byte[hex_.length() / 2];
		int length_ = hex_.length();
		for(int index_=0;index_<length_;index_ += 2){
			bytes_[(int)Math.floor(index_ / 2)] = (byte)Integer.parseInt(hex_.substring(index_, index_ + 2), 16);
		}
		
		return bytes_;
	}
	
	static public String decryptRSA(String str_, RKCryptionKey key_) throws Exception{
		Cipher cipher_ = Cipher.getInstance("RSA");
		byte[] encryptedBytes_ = hexToByteArray(str_);
		cipher_.init(Cipher.DECRYPT_MODE, key_._privateKey);
		return new String(cipher_.doFinal(encryptedBytes_), JGMainConfig.sharedConfig().getCharacterEncoding());
		
	}
}
