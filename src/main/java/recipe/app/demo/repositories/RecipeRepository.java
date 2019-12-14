package recipe.app.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recipe.app.demo.models.Recipe;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
//    List<Recipe> findByDietId(int dietId);

    List<Recipe> findByCuisineId(int cuisineId);

//    List<Recipe> findByDietIdAndCuisineId(int dietId, int cuisineId);
}
