package ma.brainit.aman.administration.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import ma.brainit.base.BaseEntity;

/**
 * Entité pour gérer les demandes d'inscription des utilisateurs extérieurs
 */
@Entity
@Table(name = "EXTERNAL_USER_REGISTRATION")
public class ExternalUserRegistration extends BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NOM", columnDefinition = "NVARCHAR", nullable = false)
    private String nom;

    @Column(name = "PRENOM", columnDefinition = "NVARCHAR", nullable = false)
    private String prenom;

    @Column(name = "FONCTION", columnDefinition = "NVARCHAR", nullable = false)
    private String fonction;

    @Column(name = "EMAIL", columnDefinition = "NVARCHAR", nullable = false, unique = true)
    private String email;

    @Column(name = "TELEPHONE", columnDefinition = "NVARCHAR")
    private String telephone;

    @Column(name = "INSTITUTION", columnDefinition = "NVARCHAR", nullable = false)
    private String institution;

    @Column(name = "TYPE_INSTITUTION", columnDefinition = "NVARCHAR", nullable = false)
    private String typeInstitution; // MINISTERE, ETABLISSEMENT_PUBLIC, AUTRE

    @Column(name = "ADRESSE", columnDefinition = "NVARCHAR")
    private String adresse;

    @Column(name = "VILLE", columnDefinition = "NVARCHAR")
    private String ville;

    @Column(name = "MOTIF_DEMANDE", columnDefinition = "NVARCHAR", length = 1000)
    private String motifDemande;

    @Column(name = "STATUT")
    @Enumerated(EnumType.STRING)
    private RegistrationStatus statut = RegistrationStatus.EN_ATTENTE;

    @Column(name = "DATE_DEMANDE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateDemande = new Date();

    @Column(name = "DATE_TRAITEMENT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTraitement;

    @Column(name = "MOTIF_REJET", columnDefinition = "NVARCHAR", length = 1000)
    private String motifRejet;

    @Column(name = "LOGIN_GENERATED", columnDefinition = "NVARCHAR")
    private String loginGenerated;

    @Column(name = "PASSWORD_TEMPORAIRE", columnDefinition = "NVARCHAR")
    private String passwordTemporaire;

    @Column(name = "UTILISATEUR_ID")
    private Long utilisateurId; // Référence vers l'utilisateur créé si accepté

    @Column(name = "TRAITE_PAR", columnDefinition = "NVARCHAR")
    private String traitePar; // Login de l'administrateur qui a traité la demande

    public enum RegistrationStatus {
        EN_ATTENTE("En attente"),
        ACCEPTEE("Acceptée"),
        REJETEE("Rejetée");

        private final String libelle;

        RegistrationStatus(String libelle) {
            this.libelle = libelle;
        }

        public String getLibelle() {
            return libelle;
        }
    }

    public ExternalUserRegistration() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getFonction() {
        return fonction;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getTypeInstitution() {
        return typeInstitution;
    }

    public void setTypeInstitution(String typeInstitution) {
        this.typeInstitution = typeInstitution;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getMotifDemande() {
        return motifDemande;
    }

    public void setMotifDemande(String motifDemande) {
        this.motifDemande = motifDemande;
    }

    public RegistrationStatus getStatut() {
        return statut;
    }

    public void setStatut(RegistrationStatus statut) {
        this.statut = statut;
    }

    public Date getDateDemande() {
        return dateDemande;
    }

    public void setDateDemande(Date dateDemande) {
        this.dateDemande = dateDemande;
    }

    public Date getDateTraitement() {
        return dateTraitement;
    }

    public void setDateTraitement(Date dateTraitement) {
        this.dateTraitement = dateTraitement;
    }

    public String getMotifRejet() {
        return motifRejet;
    }

    public void setMotifRejet(String motifRejet) {
        this.motifRejet = motifRejet;
    }

    public String getLoginGenerated() {
        return loginGenerated;
    }

    public void setLoginGenerated(String loginGenerated) {
        this.loginGenerated = loginGenerated;
    }

    public String getPasswordTemporaire() {
        return passwordTemporaire;
    }

    public void setPasswordTemporaire(String passwordTemporaire) {
        this.passwordTemporaire = passwordTemporaire;
    }

    public Long getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(Long utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public String getTraitePar() {
        return traitePar;
    }

    public void setTraitePar(String traitePar) {
        this.traitePar = traitePar;
    }

    @Override
    public String toString() {
        return "ExternalUserRegistration{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", institution='" + institution + '\'' +
                ", statut=" + statut +
                '}';
    }
} 