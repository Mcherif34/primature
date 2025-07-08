package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "GED.WWork")
public class WWork {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Work_WorkID")
    private Long id;
    
	@Column(name = "Work_Flags")
    private Integer workFlags;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Work_DateDue_Min", columnDefinition = "DATETIME")
	private Date workDateDueMin;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Work_DateDue_Max", columnDefinition = "DATETIME")
	private Date workDateDueMax;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Work_DateInitiated", columnDefinition = "DATETIME")
	private Date workDateInitiated;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Work_DateCompleted", columnDefinition = "DATETIME")
	private Date workDateCompleted;
    
    @Column(name = "Work_OwnerID")
    private Long workOwnerID;
    
    @Column(name = "Work_ManagerID")
    private Long workManagerID;
    
    @Column(name = "Work_Status", columnDefinition = "SMALLINT")
    private Integer workStatus;
    
    @Column(name = "Work_Project", columnDefinition = "NVARCHAR")
    private String workProject;
    
    @Column(name = "Work_UserData", columnDefinition = "NVARCHAR")
    private String workUserData;
    
    @Column(name = "Work_CustomData", columnDefinition = "NVARCHAR")
    private String workCustomData;
    
    @Column(name = "Work_OwnerPerms")
    private Integer workOwnerPerms;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getWorkFlags() {
		return workFlags;
	}

	public void setWorkFlags(Integer workFlags) {
		this.workFlags = workFlags;
	}

	public Date getWorkDateDueMin() {
		return workDateDueMin;
	}

	public void setWorkDateDueMin(Date workDateDueMin) {
		this.workDateDueMin = workDateDueMin;
	}

	public Date getWorkDateDueMax() {
		return workDateDueMax;
	}

	public void setWorkDateDueMax(Date workDateDueMax) {
		this.workDateDueMax = workDateDueMax;
	}

	public Date getWorkDateInitiated() {
		return workDateInitiated;
	}

	public void setWorkDateInitiated(Date workDateInitiated) {
		this.workDateInitiated = workDateInitiated;
	}

	public Date getWorkDateCompleted() {
		return workDateCompleted;
	}

	public void setWorkDateCompleted(Date workDateCompleted) {
		this.workDateCompleted = workDateCompleted;
	}

	public Long getWorkOwnerID() {
		return workOwnerID;
	}

	public void setWorkOwnerID(Long workOwnerID) {
		this.workOwnerID = workOwnerID;
	}

	public Long getWorkManagerID() {
		return workManagerID;
	}

	public void setWorkManagerID(Long workManagerID) {
		this.workManagerID = workManagerID;
	}

	public Integer getWorkStatus() {
		return workStatus;
	}

	public void setWorkStatus(Integer workStatus) {
		this.workStatus = workStatus;
	}

	public String getWorkProject() {
		return workProject;
	}

	public void setWorkProject(String workProject) {
		this.workProject = workProject;
	}

	public String getWorkUserData() {
		return workUserData;
	}

	public void setWorkUserData(String workUserData) {
		this.workUserData = workUserData;
	}

	public String getWorkCustomData() {
		return workCustomData;
	}

	public void setWorkCustomData(String workCustomData) {
		this.workCustomData = workCustomData;
	}

	public Integer getWorkOwnerPerms() {
		return workOwnerPerms;
	}

	public void setWorkOwnerPerms(Integer workOwnerPerms) {
		this.workOwnerPerms = workOwnerPerms;
	}
    
}
