package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "V_CONGE_EXTERNE")
public class CongeExterne {
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

    @Column(name = "Référence_demande", columnDefinition = "NVARCHAR")
    private String referenceDemande;
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Date_d_enregistrement", columnDefinition = "DATETIME")
	private Date dateEnregistrement;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Date_début_de_congé", columnDefinition = "DATETIME")
	private Date dateDebutConge;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Date_fin_de_congé", columnDefinition = "DATETIME")
	private Date dateFinConge;
    
    @Column(name = "Objet", columnDefinition = "NVARCHAR")
    private String objet;
    
    @Column(name = "Initiation", columnDefinition = "NVARCHAR")
    private String initiation;

    @Column(name = "Annotation_SG", columnDefinition = "NVARCHAR")
    private String annotationSg;
    
    @Column(name = "Traitement_RH", columnDefinition = "NVARCHAR")
    private String traitementRh;

    @Column(name = "Signature_PM", columnDefinition = "NVARCHAR")
    private String signaturePm;
    
    @Column(name = "Transfert_RH", columnDefinition = "NVARCHAR")
    private String transfertRh;
    
    @Column(name = "Rejet_Initiation", columnDefinition = "NVARCHAR")
    private String rejetInitiation;
    
    @Column(name = "Rejet_Annotation_SG", columnDefinition = "NVARCHAR")
    private String rejetAnnotationSg;

    @Column(name = "Rejet_Traitement_RH", columnDefinition = "NVARCHAR")
    private String rejetTraitementRh;

    @Column(name = "Rejet_Signature_PM", columnDefinition = "NVARCHAR")
    private String rejetSignaturePm;
    
    @Column(name = "Motif_Rejet_Annotation_SG", columnDefinition = "NVARCHAR")
    private String motifRejetAnnotationSg;
    
    @Column(name = "Motif_Rejet_Traitement_RH", columnDefinition = "NVARCHAR")
    private String motifRejetTraitementRh;
    
    @Column(name = "Motif_Rejet_Signature_PM", columnDefinition = "NVARCHAR")
    private String motifRejetSignaturePm;
    
    @Column(name = "Motif_Rejet_Transfert_RH", columnDefinition = "NVARCHAR")
    private String motifRejetTransfertRh;
    
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

	public String getSignaturePm() {
		return signaturePm;
	}

	public void setSignaturePm(String signaturePm) {
		this.signaturePm = signaturePm;
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

	public String getRejetSignaturePm() {
		return rejetSignaturePm;
	}

	public void setRejetSignaturePm(String rejetSignaturePm) {
		this.rejetSignaturePm = rejetSignaturePm;
	}

	public String getMotifRejetSignaturePm() {
		return motifRejetSignaturePm;
	}

	public void setMotifRejetSignaturePm(String motifRejetSignaturePm) {
		this.motifRejetSignaturePm = motifRejetSignaturePm;
	}

	public String getReferenceDemande() {
		return referenceDemande;
	}

	public void setReferenceDemande(String referenceDemande) {
		this.referenceDemande = referenceDemande;
	}

	public Date getDateDebutConge() {
		return dateDebutConge;
	}

	public void setDateDebutConge(Date dateDebutConge) {
		this.dateDebutConge = dateDebutConge;
	}

	public Date getDateFinConge() {
		return dateFinConge;
	}

	public void setDateFinConge(Date dateFinConge) {
		this.dateFinConge = dateFinConge;
	}

	public String getAnnotationSg() {
		return annotationSg;
	}

	public void setAnnotationSg(String annotationSg) {
		this.annotationSg = annotationSg;
	}

	public String getTraitementRh() {
		return traitementRh;
	}

	public void setTraitementRh(String traitementRh) {
		this.traitementRh = traitementRh;
	}

	public String getTransfertRh() {
		return transfertRh;
	}

	public void setTransfertRh(String transfertRh) {
		this.transfertRh = transfertRh;
	}

	public String getRejetAnnotationSg() {
		return rejetAnnotationSg;
	}

	public void setRejetAnnotationSg(String rejetAnnotationSg) {
		this.rejetAnnotationSg = rejetAnnotationSg;
	}

	public String getRejetTraitementRh() {
		return rejetTraitementRh;
	}

	public void setRejetTraitementRh(String rejetTraitementRh) {
		this.rejetTraitementRh = rejetTraitementRh;
	}

	public String getMotifRejetAnnotationSg() {
		return motifRejetAnnotationSg;
	}

	public void setMotifRejetAnnotationSg(String motifRejetAnnotationSg) {
		this.motifRejetAnnotationSg = motifRejetAnnotationSg;
	}

	public String getMotifRejetTraitementRh() {
		return motifRejetTraitementRh;
	}

	public void setMotifRejetTraitementRh(String motifRejetTraitementRh) {
		this.motifRejetTraitementRh = motifRejetTraitementRh;
	}

	public String getMotifRejetTransfertRh() {
		return motifRejetTransfertRh;
	}

	public void setMotifRejetTransfertRh(String motifRejetTransfertRh) {
		this.motifRejetTransfertRh = motifRejetTransfertRh;
	}

}
