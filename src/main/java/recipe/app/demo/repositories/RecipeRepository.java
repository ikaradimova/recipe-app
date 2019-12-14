package recipe.app.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recipe.app.demo.models.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
}
