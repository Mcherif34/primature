package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "V_MATERIEL")
public class Materiel {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Référence_courrier", columnDefinition = "NVARCHAR")
    private String referenceCourrier;
    
    @Column(name = "DataID")
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "VolumeID")
	private WSubWork wSubWork;
    
    @Column(name = "VersionNum")
    private Long versionNum;
    
    @Column(name = "Seq")
    private Long seq;
    
    @Column(name = "RowSeqNum")
    private Integer rowSeqNum;
    
    @Column(name = "IterationNum")
    private Integer iterationNum;

    @Column(name = "Référence_bon_de_commande", columnDefinition = "NVARCHAR")
    private String referenceBc;
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Date_d_enregistrement", columnDefinition = "DATETIME")
	private Date dateEnregistrement;
    
    @Column(name = "Objet", columnDefinition = "NVARCHAR")
    private String objet;
    
    @Column(name = "Initiation", columnDefinition = "NVARCHAR")
    private String initiation;
    
    @Column(name = "Visa_DAAF", columnDefinition = "NVARCHAR")
    private String visaDaaf;
    
    @Column(name = "Traitement_SM", columnDefinition = "NVARCHAR")
    private String traitementSm;
    
    @Column(name = "Rejet_Initiation", columnDefinition = "NVARCHAR")
    private String rejetInitiation;
    
    @Column(name = "Rejet_Visa_DAAF", columnDefinition = "NVARCHAR")
    private String rejetVisaDaaf;
    
    @Column(name = "Motif_Rejet_Visa_DAAF", columnDefinition = "NVARCHAR")
    private String motifRejetVisaDaaf;
    
    @Column(name = "Motif_Rejet_Traitement_SM", columnDefinition = "NVARCHAR")
    private String motifRejetTraitementSm;
        
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "SubWorkTask_DateReady", columnDefinition = "DATETIME")
	private Date taskDateReady;
    
    @Column(name = "SubWorkTask_Title", columnDefinition = "NVARCHAR")
    private String taskTitle;
    
    @Column(name = "Work_Status", columnDefinition = "SMALLINT")
    private Integer status;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SubWorkTask_PerformerID")
    private Performer performer;
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public WSubWork getwSubWork() {
		return wSubWork;
	}

	public void setwSubWork(WSubWork wSubWork) {
		this.wSubWork = wSubWork;
	}

	public Long getVersionNum() {
		return versionNum;
	}

	public void setVersionNum(Long versionNum) {
		this.versionNum = versionNum;
	}

	public Long getSeq() {
		return seq;
	}

	public void setSeq(Long seq) {
		this.seq = seq;
	}

	public Integer getRowSeqNum() {
		return rowSeqNum;
	}

	public void setRowSeqNum(Integer rowSeqNum) {
		this.rowSeqNum = rowSeqNum;
	}

	public Integer getIterationNum() {
		return iterationNum;
	}

	public void setIterationNum(Integer iterationNum) {
		this.iterationNum = iterationNum;
	}

	public Date getDateEnregistrement() {
		return dateEnregistrement;
	}

	public void setDateEnregistrement(Date dateEnregistrement) {
		this.dateEnregistrement = dateEnregistrement;
	}

	public String getObjet() {
		return objet;
	}

	public void setObjet(String objet) {
		this.objet = objet;
	}

	public String getReferenceCourrier() {
		return referenceCourrier;
	}

	public void setReferenceCourrier(String referenceCourrier) {
		this.referenceCourrier = referenceCourrier;
	}

	public Date getTaskDateReady() {
		return taskDateReady;
	}

	public void setTaskDateReady(Date taskDateReady) {
		this.taskDateReady = taskDateReady;
	}

	public String getTaskTitle() {
		return taskTitle;
	}

	public void setTaskTitle(String taskTitle) {
		this.taskTitle = taskTitle;
	}

	public Performer getPerformer() {
		return performer;
	}

	public void setPerformer(Performer performer) {
		this.performer = performer;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getRejetInitiation() {
		return rejetInitiation;
	}

	public void setRejetInitiation(String rejetInitiation) {
		this.rejetInitiation = rejetInitiation;
	}

	public String getInitiation() {
		return initiation;
	}

	public void setInitiation(String initiation) {
		this.initiation = initiation;
	}

	public String getReferenceBc() {
		return referenceBc;
	}

	public void setReferenceBc(String referenceBc) {
		this.referenceBc = referenceBc;
	}

	public String getVisaDaaf() {
		return visaDaaf;
	}

	public void setVisaDaaf(String visaDaaf) {
		this.visaDaaf = visaDaaf;
	}

	public String getTraitementSm() {
		return traitementSm;
	}

	public void setTraitementSm(String traitementSm) {
		this.traitementSm = traitementSm;
	}

	public String getRejetVisaDaaf() {
		return rejetVisaDaaf;
	}

	public void setRejetVisaDaaf(String rejetVisaDaaf) {
		this.rejetVisaDaaf = rejetVisaDaaf;
	}

	public String getMotifRejetVisaDaaf() {
		return motifRejetVisaDaaf;
	}

	public void setMotifRejetVisaDaaf(String motifRejetVisaDaaf) {
		this.motifRejetVisaDaaf = motifRejetVisaDaaf;
	}

	public String getMotifRejetTraitementSm() {
		return motifRejetTraitementSm;
	}

	public void setMotifRejetTraitementSm(String motifRejetTraitementSm) {
		this.motifRejetTraitementSm = motifRejetTraitementSm;
	}

}
