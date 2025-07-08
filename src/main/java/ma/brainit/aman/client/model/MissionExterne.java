package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "V_MISSION_EXTERNE")
public class MissionExterne {
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

    @Column(name = "Référence_expéditeur", columnDefinition = "NVARCHAR")
    private String referenceExpediteur;
    
    @Column(name = "Expéditeur", columnDefinition = "NVARCHAR")
    private String expediteur;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Date_de_réception", columnDefinition = "DATETIME")
	private Date dateReception;
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Date_d_enregistrement", columnDefinition = "DATETIME")
	private Date dateEnregistrement;
    
    @Column(name = "Objet", columnDefinition = "NVARCHAR")
    private String objet;
    
    @Column(name = "Initiation", columnDefinition = "NVARCHAR")
    private String initiation;
    
    @Column(name = "Réception_du_courrier", columnDefinition = "NVARCHAR")
    private String receptionCourrier;
    
    @Column(name = "Annotation_PM", columnDefinition = "NVARCHAR")
    private String annotationPm;
    
    @Column(name = "Annotation_SG", columnDefinition = "NVARCHAR")
    private String annotationSg;

    @Column(name = "Préparation_SOM", columnDefinition = "NVARCHAR")
    private String preparationSom;

    @Column(name = "Visa_Conseiller", columnDefinition = "NVARCHAR")
    private String visaConseiller;

    @Column(name = "Visa_SG", columnDefinition = "NVARCHAR")
    private String visaSg;

    @Column(name = "Signature_PM", columnDefinition = "NVARCHAR")
    private String signaturePm;

    @Column(name = "Transfert_SG", columnDefinition = "NVARCHAR")
    private String transfertSg;
    
    @Column(name = "Rejet_Initiation", columnDefinition = "NVARCHAR")
    private String rejetInitiation;
    
    @Column(name = "Rejet_Réception_du_courrier", columnDefinition = "NVARCHAR")
    private String rejetReceptionCourrier;
    
    @Column(name = "Rejet_Annotation_PM", columnDefinition = "NVARCHAR")
    private String rejetAnnotationPm;
    
    @Column(name = "Rejet_Annotation_SG", columnDefinition = "NVARCHAR")
    private String rejetAnnotationSg;
    
    @Column(name = "Rejet_Préparation_SOM", columnDefinition = "NVARCHAR")
    private String rejetPreparationSom;

    @Column(name = "Rejet_Visa_Conseiller", columnDefinition = "NVARCHAR")
    private String rejetVisaConseiller;

    @Column(name = "Rejet_Visa_SG", columnDefinition = "NVARCHAR")
    private String rejetVisaSg;

    @Column(name = "Rejet_Signature_PM", columnDefinition = "NVARCHAR")
    private String rejetSignaturePm;
    
    @Column(name = "Motif_Rejet_Courrier", columnDefinition = "NVARCHAR")
    private String motifRejetCourrier;

    @Column(name = "Motif_Rejet_Annotation_PM", columnDefinition = "NVARCHAR")
    private String motifRejetAnnotationPm;

    @Column(name = "Motif_Rejet_Annotation_SG", columnDefinition = "NVARCHAR")
    private String motifRejetAnnotationSg;

    @Column(name = "Motif_Rejet_Préparation_SOM", columnDefinition = "NVARCHAR")
    private String motifRejetPreparationSom;
    
    @Column(name = "Motif_Rejet_Visa_Conseiller", columnDefinition = "NVARCHAR")
    private String motifRejetVisaConseiller;
    
    @Column(name = "Motif_Rejet_Visa_SG", columnDefinition = "NVARCHAR")
    private String motifRejetVisaSg;
    
    @Column(name = "Motif_Rejet_Signature_PM", columnDefinition = "NVARCHAR")
    private String motifRejetSignaturePm;
    
    @Column(name = "Motif_Rejet_Transfert_SG", columnDefinition = "NVARCHAR")
    private String motifRejetTransfertSg;
    
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

	public String getReferenceExpediteur() {
		return referenceExpediteur;
	}

	public void setReferenceExpediteur(String referenceExpediteur) {
		this.referenceExpediteur = referenceExpediteur;
	}

	public String getExpediteur() {
		return expediteur;
	}

	public void setExpediteur(String expediteur) {
		this.expediteur = expediteur;
	}

	public Date getDateReception() {
		return dateReception;
	}

	public void setDateReception(Date dateReception) {
		this.dateReception = dateReception;
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

	public String getRejetReceptionCourrier() {
		return rejetReceptionCourrier;
	}

	public void setRejetReceptionCourrier(String rejetReceptionCourrier) {
		this.rejetReceptionCourrier = rejetReceptionCourrier;
	}

	public String getMotifRejetCourrier() {
		return motifRejetCourrier;
	}

	public void setMotifRejetCourrier(String motifRejetCourrier) {
		this.motifRejetCourrier = motifRejetCourrier;
	}

	public String getInitiation() {
		return initiation;
	}

	public void setInitiation(String initiation) {
		this.initiation = initiation;
	}

	public String getReceptionCourrier() {
		return receptionCourrier;
	}

	public void setReceptionCourrier(String receptionCourrier) {
		this.receptionCourrier = receptionCourrier;
	}

	public String getTransfertSg() {
		return transfertSg;
	}

	public void setTransfertSg(String transfertSg) {
		this.transfertSg = transfertSg;
	}

	public String getMotifRejetTransfertSg() {
		return motifRejetTransfertSg;
	}

	public void setMotifRejetTransfertSg(String motifRejetTransfertSg) {
		this.motifRejetTransfertSg = motifRejetTransfertSg;
	}

	public String getVisaConseiller() {
		return visaConseiller;
	}

	public void setVisaConseiller(String visaConseiller) {
		this.visaConseiller = visaConseiller;
	}

	public String getRejetVisaConseiller() {
		return rejetVisaConseiller;
	}

	public void setRejetVisaConseiller(String rejetVisaConseiller) {
		this.rejetVisaConseiller = rejetVisaConseiller;
	}

	public String getRejetSignaturePm() {
		return rejetSignaturePm;
	}

	public void setRejetSignaturePm(String rejetSignaturePm) {
		this.rejetSignaturePm = rejetSignaturePm;
	}

	public String getMotifRejetVisaConseiller() {
		return motifRejetVisaConseiller;
	}

	public void setMotifRejetVisaConseiller(String motifRejetVisaConseiller) {
		this.motifRejetVisaConseiller = motifRejetVisaConseiller;
	}

	public String getMotifRejetSignaturePm() {
		return motifRejetSignaturePm;
	}

	public void setMotifRejetSignaturePm(String motifRejetSignaturePm) {
		this.motifRejetSignaturePm = motifRejetSignaturePm;
	}

	public String getAnnotationPm() {
		return annotationPm;
	}

	public void setAnnotationPm(String annotationPm) {
		this.annotationPm = annotationPm;
	}

	public String getAnnotationSg() {
		return annotationSg;
	}

	public void setAnnotationSg(String annotationSg) {
		this.annotationSg = annotationSg;
	}

	public String getPreparationSom() {
		return preparationSom;
	}

	public void setPreparationSom(String preparationSom) {
		this.preparationSom = preparationSom;
	}

	public String getVisaSg() {
		return visaSg;
	}

	public void setVisaSg(String visaSg) {
		this.visaSg = visaSg;
	}

	public String getRejetAnnotationPm() {
		return rejetAnnotationPm;
	}

	public void setRejetAnnotationPm(String rejetAnnotationPm) {
		this.rejetAnnotationPm = rejetAnnotationPm;
	}

	public String getRejetAnnotationSg() {
		return rejetAnnotationSg;
	}

	public void setRejetAnnotationSg(String rejetAnnotationSg) {
		this.rejetAnnotationSg = rejetAnnotationSg;
	}

	public String getRejetPreparationSom() {
		return rejetPreparationSom;
	}

	public void setRejetPreparationSom(String rejetPreparationSom) {
		this.rejetPreparationSom = rejetPreparationSom;
	}

	public String getRejetVisaSg() {
		return rejetVisaSg;
	}

	public void setRejetVisaSg(String rejetVisaSg) {
		this.rejetVisaSg = rejetVisaSg;
	}

	public String getMotifRejetAnnotationPm() {
		return motifRejetAnnotationPm;
	}

	public void setMotifRejetAnnotationPm(String motifRejetAnnotationPm) {
		this.motifRejetAnnotationPm = motifRejetAnnotationPm;
	}

	public String getMotifRejetAnnotationSg() {
		return motifRejetAnnotationSg;
	}

	public void setMotifRejetAnnotationSg(String motifRejetAnnotationSg) {
		this.motifRejetAnnotationSg = motifRejetAnnotationSg;
	}

	public String getMotifRejetPreparationSom() {
		return motifRejetPreparationSom;
	}

	public void setMotifRejetPreparationSom(String motifRejetPreparationSom) {
		this.motifRejetPreparationSom = motifRejetPreparationSom;
	}

	public String getMotifRejetVisaSg() {
		return motifRejetVisaSg;
	}

	public void setMotifRejetVisaSg(String motifRejetVisaSg) {
		this.motifRejetVisaSg = motifRejetVisaSg;
	}
	
}
