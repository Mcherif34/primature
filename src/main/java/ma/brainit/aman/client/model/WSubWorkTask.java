package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "GED.WSubWorkTask")
public class WSubWorkTask {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "SubWorkTask_TaskID")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SubWorkTask_WorkID")
	private WWork wWork;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SubWorkTask_SubWorkID")
	private WSubWork wSubWork;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SubWorkTask_PerformerID")
    private Performer performer;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "SubWorkTask_DateDue_Min", columnDefinition = "DATETIME")
	private Date subWorkTaskDateDueMin;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "SubWorkTask_DateDue_Max", columnDefinition = "DATETIME")
	private Date subWorkTaskDateDueMax;
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "SubWorkTask_DateReady", columnDefinition = "DATETIME")
	private Date subWorkTaskDateReady;
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "SubWorkTask_DateDone", columnDefinition = "DATETIME")
	private Date subWorkTaskDateDone;
    
    @Column(name = "SubWorkTask_Status", columnDefinition = "SMALLINT")
    private Integer subWorkTaskStatus;
    
    @Column(name = "SubWorkTask_Title", columnDefinition = "NVARCHAR")
    private String subWorkTaskTitle;
    
    @Column(name = "SubWorkTask_UserData", columnDefinition = "NVARCHAR")
    private String subWorkTaskUserData;
    
    @Column(name = "SubWorkTask_CustomData", columnDefinition = "NVARCHAR")
    private String subWorkTaskCustomData;
    
    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public WWork getwWork() {
		return wWork;
	}

	public void setwWork(WWork wWork) {
		this.wWork = wWork;
	}

	public WSubWork getwSubWork() {
		return wSubWork;
	}

	public void setwSubWork(WSubWork wSubWork) {
		this.wSubWork = wSubWork;
	}

	public Performer getPerformer() {
		return performer;
	}

	public void setPerformer(Performer performer) {
		this.performer = performer;
	}

	public Date getSubWorkTaskDateDueMin() {
		return subWorkTaskDateDueMin;
	}

	public void setSubWorkTaskDateDueMin(Date subWorkTaskDateDueMin) {
		this.subWorkTaskDateDueMin = subWorkTaskDateDueMin;
	}

	public Date getSubWorkTaskDateDueMax() {
		return subWorkTaskDateDueMax;
	}

	public void setSubWorkTaskDateDueMax(Date subWorkTaskDateDueMax) {
		this.subWorkTaskDateDueMax = subWorkTaskDateDueMax;
	}

	public Date getSubWorkTaskDateReady() {
		return subWorkTaskDateReady;
	}

	public void setSubWorkTaskDateReady(Date subWorkTaskDateReady) {
		this.subWorkTaskDateReady = subWorkTaskDateReady;
	}

	public Date getSubWorkTaskDateDone() {
		return subWorkTaskDateDone;
	}

	public void setSubWorkTaskDateDone(Date subWorkTaskDateDone) {
		this.subWorkTaskDateDone = subWorkTaskDateDone;
	}

	public Integer getSubWorkTaskStatus() {
		return subWorkTaskStatus;
	}

	public void setSubWorkTaskStatus(Integer subWorkTaskStatus) {
		this.subWorkTaskStatus = subWorkTaskStatus;
	}

	public String getSubWorkTaskTitle() {
		return subWorkTaskTitle;
	}

	public void setSubWorkTaskTitle(String subWorkTaskTitle) {
		this.subWorkTaskTitle = subWorkTaskTitle;
	}

	public String getSubWorkTaskUserData() {
		return subWorkTaskUserData;
	}

	public void setSubWorkTaskUserData(String subWorkTaskUserData) {
		this.subWorkTaskUserData = subWorkTaskUserData;
	}

	public String getSubWorkTaskCustomData() {
		return subWorkTaskCustomData;
	}

	public void setSubWorkTaskCustomData(String subWorkTaskCustomData) {
		this.subWorkTaskCustomData = subWorkTaskCustomData;
	}

}
