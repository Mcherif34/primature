package ma.brainit.aman.administration.dto;

import java.util.List;

import ma.brainit.base.annotations.View;
import ma.brainit.aman.administration.model.SecModule;

public class SecModuleDTO extends SecModule {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<SecEcranDTO> secEcranDTOs;
	private List<Long> idSecEcrans;

	@Override
	@View(attribut = "id")
	public Long getId() {
		return super.getId();
	}

	@Override
	@View(attribut = "module")
	public String getModule() {
		return super.getModule();
	}
	
	@Override
	@View(attribut = "libelle")
	public String getLibelle() {
		return super.getLibelle();
	}

	public List<SecEcranDTO> getSecEcranDTOs() {
		return secEcranDTOs;
	}

	public void setSecEcranDTOs(List<SecEcranDTO> secEcranDTOs) {
		this.secEcranDTOs = secEcranDTOs;
	}

	public List<Long> getIdSecEcrans() {
		return idSecEcrans;
	}

	public void setIdSecEcrans(List<Long> idSecEcrans) {
		this.idSecEcrans = idSecEcrans;
	}

}
