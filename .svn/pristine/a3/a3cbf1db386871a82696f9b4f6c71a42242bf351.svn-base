package ma.brainit.aman.client.dto;

import java.io.File;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ma.brainit.aman.client.model.Performer;
import ma.brainit.aman.commun.dto.JsonDateDeserializer;
import ma.brainit.aman.commun.dto.JsonDateSerializer;
import ma.brainit.aman.commun.dto.JsonShortDateSerializer;
import ma.brainit.base.annotations.View;

public class PerformerDTO extends Performer {

	private static final long serialVersionUID = 1L;
	private Long groupId;
	
    @Override
    @View(attribut="id")
    public Long getId() {
        return super.getId();
    }
    
    @Override
    @View(attribut="name")
    public String getName() {
        return super.getName();
    }
    
    @Override
    @View(attribut="firstname")
    public String getFirstname() {
        return super.getFirstname();
    }
    
    @Override
    @View(attribut="lastname")
    public String getLastname() {
        return super.getLastname();
    }

    @View(entity = "group", attribut = "id")
	public Long getGroupId() {
		return groupId;
	}

	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}
    
}
