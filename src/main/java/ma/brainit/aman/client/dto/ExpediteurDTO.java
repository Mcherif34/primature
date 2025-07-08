package ma.brainit.aman.client.dto;

import ma.brainit.aman.client.model.Expediteur;
import ma.brainit.base.annotations.View;

public class ExpediteurDTO extends Expediteur {

private static final long serialVersionUID = 1L;
	
	@Override
	@View(attribut="id")
	public Long getId() {
	    return super.getId();
	}

	@Override
    @View(attribut="code")
    public String getCode() {
        return super.getCode();
    }

    @Override
    @View(attribut="nom")
    public String getNom() {
        return super.getNom();
    }
    
}
