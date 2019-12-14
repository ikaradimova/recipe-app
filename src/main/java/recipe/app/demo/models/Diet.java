package recipe.app.demo.models;

import javax.persistence.*;

@Entity
@Table(name="diet")
public class Diet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "type", length = 100, unique = true, nullable = false)
    private String type;

    public Diet() {
    }

    public Diet(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
