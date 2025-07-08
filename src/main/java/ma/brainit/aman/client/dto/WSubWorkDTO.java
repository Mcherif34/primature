package ma.brainit.aman.client.dto;

import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ma.brainit.aman.client.model.WSubWork;
import ma.brainit.aman.commun.dto.JsonDateDeserializer;
import ma.brainit.aman.commun.dto.JsonDateSerializer;
import ma.brainit.base.annotations.View;

public class WSubWorkDTO extends WSubWork {

	private static final long serialVersionUID = 1L;
	private Long wWorkId;
	
    @Override
    @View(attribut="id")
    public Long getId() {
        return super.getId();
    }
    
    @Override
    @View(attribut="subWorkFlags")
    public Integer getSubWorkFlags() {
        return super.getSubWorkFlags();
    }
    
    @Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "subWorkDateDueMin")
	public Date getSubWorkDateDueMin() {
		return super.getSubWorkDateDueMin();
	}
    
    @Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "subWorkDateDueMax")
	public Date getSubWorkDateDueMax() {
		return super.getSubWorkDateDueMax();
	}
    
    @Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "subWorkDateInitiated")
	public Date getSubWorkDateInitiated() {
		return super.getSubWorkDateInitiated();
	}
    
    @Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "subWorkDateCompleted")
	public Date getSubWorkDateCompleted() {
		return super.getSubWorkDateCompleted();
	}
    
    @Override
    @View(attribut="subWorkStatus")
    public Integer getSubWorkStatus() {
        return super.getSubWorkStatus();
    }
    
    @Override
    @View(attribut="subWorkTitle")
    public String getSubWorkTitle() {
        return super.getSubWorkTitle();
    }
    
    @Override
    @View(attribut="subWorkProject")
    public String getSubWorkProject() {
        return super.getSubWorkProject();
    }
    
    @Override
    @View(attribut="subWorkCustomData")
    public String getSubWorkCustomData() {
        return super.getSubWorkCustomData();
    }
    
    @View(entity = "wWork", attribut = "id")
	public Long getwWorkId() {
		return wWorkId;
	}

	public void setwWorkId(Long wWorkId) {
		this.wWorkId = wWorkId;
	}

}
