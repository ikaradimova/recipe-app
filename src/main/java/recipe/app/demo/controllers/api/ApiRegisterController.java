package recipe.app.demo.controllers.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import recipe.app.demo.models.User;
import recipe.app.demo.repositories.RoleRepository;
import recipe.app.demo.repositories.UserRepository;
import recipe.app.demo.service.HashGenerator;

@RestController
@RequestMapping(value = "/api/register")
public class ApiRegisterController {
    private HashGenerator hashGenerator;
    private RoleRepository roleRepository;
    private UserRepository userRepository;

    public ApiRegisterController(HashGenerator hashGenerator, RoleRepository roleRepository, UserRepository userRepository) {
        this.hashGenerator = hashGenerator;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    @PostMapping(path = "")
    public String register(
            @RequestParam(value = "email") String email,
            @RequestParam(value = "username") String username,
            @RequestParam(value = "password") String password,
            @RequestParam(value = "repeatPassword") String repeatPassword
    ) {
        if (userRepository.findByEmail(email) != null) {
            return "Email already exists.";
        }
        if (userRepository.findByUsername(username) != null) {
            return "Username already exists.";
        }
        if (!password.equals(repeatPassword)) {
            return "Passwords do not match.";
        }
        User user = new User(
                username,
                email,
                hashGenerator.hash(password),
                roleRepository.findUserByName("user")
        );
        try {
            userRepository.saveAndFlush(user);
            return "success";
        } catch (Exception e) {
            return "error";
        }
    }

}
