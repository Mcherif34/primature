package ma.brainit.aman.administration.actions;

public class SearchParam {

	
	private String name;
	private String oper;
	private String value;
	
	
	public SearchParam() {
		super();
	}
	
	public SearchParam(SearchParam param) {
		super();
		this.name = param.getName();
		this.value = param.getValue();
		this.oper = param.getOper();
	}
	
	public SearchParam(String name, String value) {
		super();
		this.name = name;
		this.value = value;
	}


	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}

	public String getOper() {
		return oper;
	}

	public void setOper(String oper) {
		this.oper = oper;
	}

	


}
