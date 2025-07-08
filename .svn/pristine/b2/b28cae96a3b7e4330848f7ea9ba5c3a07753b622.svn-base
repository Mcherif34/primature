package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "V_COURRIER_DEPART")
public class CourrierDepart {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ID")
    private Long id;
    
    @Column(name = "Réf_Départ_BOC_Save", columnDefinition = "NVARCHAR")
    private String refDepartBoc;
    
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

    @Column(name = "Réf_Destinataire", columnDefinition = "NVARCHAR")
    private String refDestinataire;

    @Column(name = "Destinataire_Externe", columnDefinition = "NVARCHAR")
    private String destinataire;
    
    @Column(name = "Ville", columnDefinition = "NVARCHAR")
    private String ville;
    
    @Column(name = "Adresse", columnDefinition = "NVARCHAR")
    private String adresse;
    
    @Column(name = "Réf_Registre_Physique", columnDefinition = "NVARCHAR")
    private String refRegistrePhysique;
    
    @Column(name = "Objet", columnDefinition = "NVARCHAR")
    private String objet;
    
    @Column(name = "Observations", columnDefinition = "NVARCHAR")
    private String observations;
    
    @Column(name = "Urgence", columnDefinition = "NVARCHAR")
    private String urgence;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "A_livrer_avant", columnDefinition = "DATETIME")
	private Date dateLivraison;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Date", columnDefinition = "DATETIME")
	private Date dateDepart;
    
    @Column(name = "Rédacteur", columnDefinition = "NVARCHAR")
    private String redacteur;
    
    @Column(name = "Nom_signataire", columnDefinition = "NVARCHAR")
    private String signataire;
    
    @Column(name = "Type_courrier", columnDefinition = "NVARCHAR")
    private String typeCourrier;
    
    @Column(name = "Nombre_de_pièces_jointes", columnDefinition = "NVARCHAR")
    private String nombrePj;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Pôle_émetteur")
    private Performer poleEmetteur;
    
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

	public String getRefDepartBoc() {
		return refDepartBoc;
	}

	public void setRefDepartBoc(String refDepartBoc) {
		this.refDepartBoc = refDepartBoc;
	}

	public String getRefDestinataire() {
		return refDestinataire;
	}

	public void setRefDestinataire(String refDestinataire) {
		this.refDestinataire = refDestinataire;
	}

	public String getDestinataire() {
		return destinataire;
	}

	public void setDestinataire(String destinataire) {
		this.destinataire = destinataire;
	}

	public String getVille() {
		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getRefRegistrePhysique() {
		return refRegistrePhysique;
	}

	public void setRefRegistrePhysique(String refRegistrePhysique) {
		this.refRegistrePhysique = refRegistrePhysique;
	}

	public String getObjet() {
		return objet;
	}

	public void setObjet(String objet) {
		this.objet = objet;
	}

	public String getObservations() {
		return observations;
	}

	public void setObservations(String observations) {
		this.observations = observations;
	}

	public String getUrgence() {
		return urgence;
	}

	public void setUrgence(String urgence) {
		this.urgence = urgence;
	}

	public Date getDateLivraison() {
		return dateLivraison;
	}

	public void setDateLivraison(Date dateLivraison) {
		this.dateLivraison = dateLivraison;
	}

	public Date getDateDepart() {
		return dateDepart;
	}

	public void setDateDepart(Date dateDepart) {
		this.dateDepart = dateDepart;
	}

	public String getRedacteur() {
		return redacteur;
	}

	public void setRedacteur(String redacteur) {
		this.redacteur = redacteur;
	}

	public String getSignataire() {
		return signataire;
	}

	public void setSignataire(String signataire) {
		this.signataire = signataire;
	}

	public String getTypeCourrier() {
		return typeCourrier;
	}

	public void setTypeCourrier(String typeCourrier) {
		this.typeCourrier = typeCourrier;
	}

	public String getNombrePj() {
		return nombrePj;
	}

	public void setNombrePj(String nombrePj) {
		this.nombrePj = nombrePj;
	}

	public Performer getPoleEmetteur() {
		return poleEmetteur;
	}

	public void setPoleEmetteur(Performer poleEmetteur) {
		this.poleEmetteur = poleEmetteur;
	}

}
