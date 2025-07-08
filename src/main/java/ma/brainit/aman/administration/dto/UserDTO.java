package ma.brainit.aman.administration.dto;

import ma.brainit.base.annotations.View;
import ma.brainit.aman.administration.model.SecUtilisateur;


public class UserDTO extends SecUtilisateur{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer roleId;
	private String roleCode;
	private String roleLibelle;


	@View(entity="role",attribut="id")
	public Integer getRoleId() {
		return roleId;
	}

	@View(entity="role",attribut="libelle")
	public String getRoleLibelle() {
		return roleLibelle;
	}
	
	@View(entity="role",attribut="code")
	public String getRoleCode() {
		return roleCode;
	}
	
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public void setRoleLibelle(String roleLibelle) {
		this.roleLibelle = roleLibelle;
	}

	@Override
	@View(attribut="id")
	public Long getId() {
		return super.getId();
	}

	@Override
	@View(attribut="nom")
	public String getNom() {
		return super.getNom();
	}

	@Override
	@View(attribut="prenom")
	public String getPrenom() {
		return super.getPrenom();
	}


	@Override
	public String getLogin() {
		return super.getLogin();
	}

	@Override
	public String getUsername() {
		return super.getUsername();
	}

}