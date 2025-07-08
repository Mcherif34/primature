package ma.brainit.base;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ma.brainit.aman.commun.dto.JsonDateDeserializer;
import ma.brainit.aman.commun.dto.JsonDateSerializer;

@MappedSuperclass
public abstract class BaseEntity implements java.io.Serializable{
	
	private static final long serialVersionUID = 6477402980386950166L;

	@Column(name="date_modified")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateModified;
	
	@Column(name="modifier")
	private String modifier;
	
	@Column(name="creation_time")
	@Temporal(TemporalType.TIMESTAMP)
    private Date creationTime;

	
	public BaseEntity() {
	}


	
	public Date getCreationTime() {
		return creationTime;
	}
	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}

	public Date getDateModified() {
		return dateModified;
	}

	public void setDateModified(Date dateModified) {
		this.dateModified = dateModified;
	}

	public String getModifier() {
		return modifier;
	}

	public void setModifier(String modifier) {
		this.modifier = modifier;
	}

	@Transient
	public void setModifier(){		
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		if (!(auth instanceof AnonymousAuthenticationToken)) {
//			this.modifier = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()) != null ? ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername(): null;
//		}			
	}
	
    @PrePersist
    public void prePersist() {
        Date now = new Date();
        this.creationTime = now;
        this.dateModified = now;
        setModifier();
    }

    @PreUpdate
    public void preUpdate() {
        this.dateModified = new Date();
        setModifier();
    }


}