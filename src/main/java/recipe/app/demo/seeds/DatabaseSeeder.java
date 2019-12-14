package recipe.app.demo.seeds;


import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import recipe.app.demo.models.Role;
import recipe.app.demo.models.User;
import recipe.app.demo.repositories.RoleRepository;
import recipe.app.demo.repositories.UserRepository;
import recipe.app.demo.service.HashGenerator;

@Component
public class DatabaseSeeder {
    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private HashGenerator hashGenerator;

    public DatabaseSeeder(RoleRepository roleRepository,
                          UserRepository userRepository,
                          HashGenerator hashGenerator) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.hashGenerator = hashGenerator;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event){
//        this.roleSeed();
//        this.userSeed();
    }

    private void roleSeed(){
        // admin role seeding
        Role roleAdmin = new Role("admin");
        roleRepository.saveAndFlush(roleAdmin);

        // user role seeding
        Role roleUser = new Role("user");
        roleRepository.saveAndFlush(roleUser);
    }

    private void userSeed(){
        // admin user seeding
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@abv.bg");
        admin.setPassword(hashGenerator.hash("admin"));
        admin.setRole(roleRepository.findUserByName("admin"));
        userRepository.saveAndFlush(admin);

        // regular user seeding
        User user = new User();
        user.setUsername("user");
        user.setEmail("user@abv.bg");
        user.setPassword(hashGenerator.hash("user"));
        user.setRole(roleRepository.findUserByName("user"));
        userRepository.saveAndFlush(user);
    }
}
