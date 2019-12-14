package recipe.app.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recipe.app.demo.models.Cuisine;

@Repository
public interface CuisineRepository extends JpaRepository<Cuisine, Integer> {
    Cuisine findByType(String type);
}
