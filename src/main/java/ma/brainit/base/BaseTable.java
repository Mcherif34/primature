package ma.brainit.base;

import java.util.List;

public class BaseTable<T> {

	private List<T> data;
	private Long totalCount;
	private Double sumField1;
	
	
	
	public BaseTable(List<T> data,Long totalCount) {
		super();
		this.data = data;
		this.totalCount = totalCount;
	}
	
	public BaseTable(List<T> data,Long totalCount,Double sum1) {
		super();
		this.data = data;
		this.totalCount = totalCount;
		this.sumField1 = sum1;
	}

	public List<T> getData() {
		return data;
	}

	public void setData(List<T> data) {
		this.data = data;
	}

	public Long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(Long totalCount) {
		this.totalCount = totalCount;
	}

	public Double getSumField1() {
		return sumField1;
	}

	public void setSumField1(Double sumField1) {
		this.sumField1 = sumField1;
	}
	
	


}
