package ma.brainit.aman.client.model;

import javax.persistence.*;

@Entity
@Table(name = "COURRIER")
public class Courrier {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TYPE", columnDefinition = "NVARCHAR")
    private String type;

    @Column(name = "SEQUENCE")
    private Long sequence;
    
    @Column(name = "MOIS")
    private Integer month;
    
    @Column(name = "ANNEE")
    private Integer year;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getSequence() {
        return sequence;
    }

    public void setSequence(Long sequence) {
        this.sequence = sequence;
    }

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}
    
}
