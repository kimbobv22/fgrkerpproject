package rk.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RKStringUtils{

	static public String getFilePath(String filePath_, String separator_) throws Exception{
		int index_ = filePath_.lastIndexOf(separator_);
		if(index_ < 0){
			return filePath_;
		}
		
		return filePath_.substring(0,index_);
	}
	static public String getFilePath(String filePath_) throws Exception{
		return getFilePath(filePath_, "/");
	}
	
	static public final String STR_REGEXP_EMAIL = "^[\\w\\-\\.]+\\@[\\w\\-\\.]+\\.[\\w]{1,5}$";
	
	static public boolean checkRegexp(String pattern_, String value_) throws Exception{
		Pattern regexpColumnPattern_ = Pattern.compile(pattern_);
		Matcher regexpColumnMatcher_ = regexpColumnPattern_.matcher(value_);
		return regexpColumnMatcher_.find();
	}
	static public boolean checkRegexpEmail(String value_) throws Exception{
		return checkRegexp(STR_REGEXP_EMAIL, value_);
	}
	
	static public Long convertToLong(String value_, Long errorValue_) throws Exception{
		try{
			return Long.valueOf(value_);
		}catch(Exception ex_){return errorValue_;}
	}
	static public Integer convertToInteger(String value_, Integer errorValue_) throws Exception{
		try{
			return Integer.valueOf(value_);
		}catch(Exception ex_){return errorValue_;}
	}
}
