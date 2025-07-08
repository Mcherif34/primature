package ma.brainit.aman.client.dto;

import java.io.File;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ma.brainit.aman.client.model.AdnId;
import ma.brainit.aman.commun.dto.JsonDateDeserializer;
import ma.brainit.aman.commun.dto.JsonDateSerializer;
import ma.brainit.aman.commun.dto.JsonShortDateSerializer;
import ma.brainit.base.annotations.View;

public class AdnIdDTO extends AdnId {

	private static final long serialVersionUID = 1L;
	
    @Override
    @View(attribut="id")
    public Long getId() {
        return super.getId();
    }
    
    @Override
    @View(attribut="seqId")
    public Long getSeqId() {
        return super.getSeqId();
    }
    
    @Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "assignDate")
	public Date getAssignDate() {
		return super.getAssignDate();
	}
    
    @Override
    @View(attribut="prefix")
    public String getPrefix() {
        return super.getPrefix();
    }
    
}
