package recipe.app.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recipe.app.demo.models.Diet;

@Repository
public interface DietRepository extends JpaRepository<Diet, Integer> {
    Diet findByType(String type);
}
