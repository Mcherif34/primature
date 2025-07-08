package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "OTCS.AdnIDs")
public class AdnId {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ADNID")
    private Long id;
    
    @Column(name = "SeqID")
    private Long seqId;
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "AssignDate", columnDefinition = "DATETIME")
	private Date assignDate;
    
    @Column(name = "Prefix", columnDefinition = "NVARCHAR")
    private String prefix;
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getSeqId() {
		return seqId;
	}

	public void setSeqId(Long seqId) {
		this.seqId = seqId;
	}

	public Date getAssignDate() {
		return assignDate;
	}

	public void setAssignDate(Date assignDate) {
		this.assignDate = assignDate;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

}
