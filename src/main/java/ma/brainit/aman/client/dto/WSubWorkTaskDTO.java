package ma.brainit.aman.client.dto;

import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ma.brainit.aman.client.model.WSubWorkTask;
import ma.brainit.aman.commun.dto.JsonDateDeserializer;
import ma.brainit.aman.commun.dto.JsonDateSerializer;
import ma.brainit.base.annotations.View;

public class WSubWorkTaskDTO extends WSubWorkTask {

	private static final long serialVersionUID = 1L;
	private Long wWorkId;
	private Long performerId;
	private String performerName;
	private String performerFirstname;
	private String performerLastname;
	
    @Override
    @View(attribut="id")
    public Integer getId() {
        return super.getId();
    }
    
    @Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "subWorkTaskDateDueMin")
	public Date getSubWorkTaskDateDueMin() {
		return super.getSubWorkTaskDateDueMin();
	}
    
    @Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "subWorkTaskDateDueMax")
	public Date getSubWorkTaskDateDueMax() {
		return super.getSubWorkTaskDateDueMax();
	}
    
    @Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "subWorkTaskDateReady")
	public Date getSubWorkTaskDateReady() {
		return super.getSubWorkTaskDateReady();
	}
    
    @Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "subWorkTaskDateDone")
	public Date getSubWorkTaskDateDone() {
		return super.getSubWorkTaskDateDone();
	}
    
    @Override
    @View(attribut="subWorkTaskStatus")
    public Integer getSubWorkTaskStatus() {
        return super.getSubWorkTaskStatus();
    }
    
    @Override
    @View(attribut="subWorkTaskTitle")
    public String getSubWorkTaskTitle() {
        return super.getSubWorkTaskTitle();
    }
    
    @Override
    @View(attribut="subWorkTaskUserData")
    public String getSubWorkTaskUserData() {
        return super.getSubWorkTaskUserData();
    }
    
    @Override
    @View(attribut="subWorkTaskCustomData")
    public String getSubWorkTaskCustomData() {
        return super.getSubWorkTaskCustomData();
    }
    
    @View(entity = "wWork", attribut = "id")
	public Long getwWorkId() {
		return wWorkId;
	}

	public void setwWorkId(Long wWorkId) {
		this.wWorkId = wWorkId;
	}

	@View(entity = "performer", attribut = "id")
	public Long getPerformerId() {
		return performerId;
	}

	public void setPerformerId(Long performerId) {
		this.performerId = performerId;
	}

	@View(entity = "performer", attribut = "name")
	public String getPerformerName() {
		return performerName;
	}

	public void setPerformerName(String performerName) {
		this.performerName = performerName;
	}
	
	@View(entity = "performer", attribut = "firstname")
	public String getPerformerFirstname() {
		return performerFirstname;
	}

	public void setPerformerFirstname(String performerFirstname) {
		this.performerFirstname = performerFirstname;
	}

	@View(entity = "performer", attribut = "lastname")
	public String getPerformerLastname() {
		return performerLastname;
	}

	public void setPerformerLastname(String performerLastname) {
		this.performerLastname = performerLastname;
	}

}
