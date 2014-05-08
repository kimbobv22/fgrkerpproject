package rk.app.photo;

import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.lang3.time.FastDateFormat;
import org.json.simple.JSONArray;

import rk.common.session.RKSessionData;
import rk.common.utils.RKStringUtils;

import com.jg.action.JGAction;
import com.jg.action.handler.JGMultipartData;
import com.jg.action.handler.JGMultipartUploadHandlerDef;
import com.jg.action.handler.JGMultipartUploadResult;
import com.jg.action.handler.JGServiceBox;
import com.jg.db.vo.JGDBQuery;
import com.jg.db.xml.JGDBXMLQueryManager;
import com.jg.main.file.JGFileHandler;
import com.jg.vo.JGDataset;

public class P01001 extends JGAction{
	
	static public final String _querysetKeyName = "app.photo.P01001";

	public void getPhoto(JGServiceBox serviceBox_, String photoId_) throws Exception{
		JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "getPhotoPath"
				,new Object[]{"photoId",photoId_});
		JGDataset result_ = getDBConnection().executeQuery(query_);
		
		if(result_.getRowCount() == 0){
			serviceBox_.getResponse().sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}
		
		String photoPath_ = (String)result_.getColumnValue(0, 0);
		int resizeWidth_ = RKStringUtils.convertToInteger(serviceBox_.getParameter("width"), 0);
		int resizeHeight_ = RKStringUtils.convertToInteger(serviceBox_.getParameter("height"), 0);
		
		if(resizeWidth_ > 0 || resizeHeight_ > 0){
			JGFileHandler.sendResizedImage(serviceBox_, photoPath_, resizeWidth_, resizeHeight_);
		}else{
			JGFileHandler.sendFile(serviceBox_, photoPath_);
		}
	}
	public void getPhoto(JGServiceBox serviceBox_) throws Exception{
		getPhoto(serviceBox_, serviceBox_.getParameter("photoId"));
	}
	
	@SuppressWarnings("unchecked")
	public void uploadPhoto(JGServiceBox serviceBox_) throws Exception{
		if(!JGMultipartData.isMultipart(serviceBox_)){
			serviceBox_.getResponse().sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		final String memSid_ = RKSessionData.currentMemSid(serviceBox_);
		
		JGMultipartData mpData_ = serviceBox_.multipartData();
		ArrayList<JGMultipartUploadResult> uResults_ = mpData_.doWriteUploadData(new JGMultipartUploadHandlerDef(){
			@Override
			protected String renameFile(FileItem fileItem_){
				return "/photo/"+FastDateFormat.getInstance("yyyyMM_W").format(new Date())+"/"+memSid_+"_"+UUID.randomUUID().toString();
			}
			
			@Override
			protected void fileUploaded(FileItem fileItem_, JGMultipartUploadResult result_){}
			
			@Override
			protected boolean acceptUploadData(FileItem fileItem_) {
				return true;
			}
		});
		
		JSONArray results_ = new JSONArray();
		for(JGMultipartUploadResult result_ : uResults_){
			if(!result_.didUpload()) continue;
			JGDBQuery query_ = JGDBXMLQueryManager.sharedManager().createQuery(_querysetKeyName, "addPhoto"
					,new Object[]{"memSid",memSid_,"photoPath",result_.getUploadPath()});
			
			String photoId_ = (String)getDBConnection().executeQueryAndGetFirst(query_);
			getDBConnection().commit();
			results_.add(photoId_);
		}
		
		serviceBox_.writer().printResultJSON(0, results_);
	}

}
