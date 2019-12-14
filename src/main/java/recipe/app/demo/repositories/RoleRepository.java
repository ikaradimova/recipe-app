package recipe.app.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recipe.app.demo.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findUserByName(String name);
}
