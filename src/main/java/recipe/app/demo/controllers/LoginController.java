package recipe.app.demo.controllers;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import recipe.app.demo.models.User;
import recipe.app.demo.repositories.UserRepository;
import recipe.app.demo.security.SecurityConfig;
import recipe.app.demo.service.HashGenerator;

import javax.servlet.http.HttpSession;

@RestController
public class LoginController {

    private UserRepository userRepository;
    private SecurityConfig securityConfig;
    private HashGenerator hashGenerator;

    public LoginController(UserRepository userRepository,
                           SecurityConfig securityConfig,
                           HashGenerator hashGenerator) {
        this.userRepository = userRepository;
        this.securityConfig = securityConfig;
        this.hashGenerator = hashGenerator;
    }

    @PostMapping(path = "/login")
    public String login(@RequestParam(value = "username") String username,
                        @RequestParam(value = "password") String password,
                        HttpSession session) {

        User user = userRepository.findUserByUsernameAndPassword(username, hashGenerator.hash(password));

        if (user != null) {
            session.setAttribute("user", user);

            UserDetails userDetails =
                    securityConfig.userDetailsService()
                            .loadUserByUsername(user.getUsername());

            if(userDetails != null) {
                Authentication authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails.getUsername(),
                                userDetails.getPassword(),
                                userDetails.getAuthorities()
                        );

                SecurityContextHolder.getContext().setAuthentication(authentication);

                ServletRequestAttributes attr = (ServletRequestAttributes)
                        RequestContextHolder.currentRequestAttributes();

                HttpSession httpSession = attr.getRequest().getSession(true);
                httpSession.setAttribute(
                        "SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
            }
            return "success";
        } else {
            return "error";
        }
    }
}
