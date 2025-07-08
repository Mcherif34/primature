package ma.brainit.aman.client.dto;

public class DocumentDTO {

	private static final long serialVersionUID = 1L;
	private Long dataId;
	private String name;
	public Long getDataId() {
		return dataId;
	}
	public void setDataId(Long dataId) {
		this.dataId = dataId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
    
}
