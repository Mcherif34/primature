package ma.brainit.aman.administration.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


/**
 * The persistent class for the useruir database table.
 * 
 */
@Entity
@Table(name = "SEC_UTILISATEUR")
public class SecUtilisateur implements Serializable, UserDetails {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name = "LOGIN", columnDefinition = "NVARCHAR")
	private String login;

	@Column(name = "NOM", columnDefinition = "NVARCHAR")
	private String nom;

	@Column(name = "PRENOM", columnDefinition = "NVARCHAR")
	private String prenom;
	
	@Column(name = "FONCTION", columnDefinition = "NVARCHAR")
	private String fonction;

	@Column(name = "PASSWORD", columnDefinition = "NVARCHAR")
	private String password;
	
	@Column(name = "EMAIL", columnDefinition = "NVARCHAR")
	private String email;

	@Column(name = "TOKEN", columnDefinition = "NVARCHAR")
	private String token;

	@Column(name = "LAST_CONNECTION", columnDefinition = "DATE")
	private Date lastConnection;

	@Column(name = "ACTIF")
	private Boolean actif;
	
	@Column(name = "module", columnDefinition = "NVARCHAR")
	private String module;

	// bi-directional many-to-many association to SecProfile
	@ManyToMany
	@JoinTable(name = "SEC_UTILISATEUR_PROFIL", joinColumns = {
			@JoinColumn(name = "SEC_UTILISATEUR_ID") }, inverseJoinColumns = { @JoinColumn(name = "SEC_PROFILE_ID") })
	private List<SecProfile> secProfiles;
	
	@OneToMany(mappedBy = "secUtilisateur")
	private List<SecUtilisateurAuthorite> secUtilisateurAuthorites;

	@Transient
	private Set<GrantedAuthority> authorities;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sec_profile_id")
	private SecProfile secProfile;
	
	public SecUtilisateur() {
	}

	public SecUtilisateur(Long id) {
		this.id = id;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLogin() {
		return this.login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getNom() {
		return this.nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return this.prenom;
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

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Date getLastConnection() {
		return this.lastConnection;
	}

	public void setLastConnection(Date lastConnection) {
		this.lastConnection = lastConnection;
	}

	public Boolean getActif() {
		return this.actif;
	}

	public void setActif(Boolean actif) {
		this.actif = actif;
	}
	
	public String getModule() {
		return this.module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public List<SecProfile> getSecProfiles() {
		return this.secProfiles;
	}

	public void setSecProfiles(List<SecProfile> secProfiles) {
		this.secProfiles = secProfiles;
	}
	
	@Override
	public Set<GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public List<SecUtilisateurAuthorite> getSecUtilisateurAuthorites() {
		return secUtilisateurAuthorites;
	}

	public void setSecUtilisateurAuthorites(List<SecUtilisateurAuthorite> secUtilisateurAuthorites) {
		this.secUtilisateurAuthorites = secUtilisateurAuthorites;
	}

	public void setAuthorities(Set<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	@Override
	public String getUsername() {
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return false;
	}
	
	public SecProfile getSecProfile() {
		return secProfile;
	}

	public void setSecProfile(SecProfile secProfile) {
		this.secProfile = secProfile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}