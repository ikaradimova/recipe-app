package recipe.app.demo.controllers.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipe.app.demo.models.User;
import recipe.app.demo.repositories.UserRepository;
import recipe.app.demo.service.HashGenerator;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/profile")
public class ApiProfileController {
    private UserRepository userRepository;
    private HashGenerator hashGenerator;

    public ApiProfileController(UserRepository userRepository, HashGenerator hashGenerator) {
        this.userRepository = userRepository;
        this.hashGenerator = hashGenerator;
    }

    @GetMapping("/getUserProfile")
    public User getUserProfile(HttpSession session)
    {
        return (User) session.getAttribute("user");
    }

//    @RequestMapping(value = "/profile", method = RequestMethod.GET)
//    public String index(){
//        return "profile/index";
//    }

    @PostMapping(path="/logout")
    public ResponseEntity<Boolean> logout(HttpSession session){

        User user = (User)session.getAttribute("user");
        if(user!= null) {

            session.invalidate();
            return  new ResponseEntity<>(true, HttpStatus.OK);

        }
        return  new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping(path="/update")
    public ResponseEntity<Boolean> update(
            @RequestParam(value = "username") String username,
            @RequestParam(value = "email") String email,
            @RequestParam(value = "password") String password,
            @RequestParam(value = "rePassword") String rePassword,
            HttpSession session){

        User user = (User) session.getAttribute("user");

        if(user!=null) {
            Optional<User> findUser = userRepository.findById(user.getId());
            if(findUser.isPresent())
            {
                boolean checkUser = checkUserName(username,findUser.get());
                if(!checkUser)
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                boolean checkEmail = checkEmail(email, findUser.get());
                if(!checkEmail)
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

                findUser.get().setEmail(email);
                findUser.get().setUsername(username);
                //Check password and replace it if have
                if(password != null
                        && password == " "
                        && password.equals(rePassword))
                {
                    findUser.get().setPassword(hashGenerator.hash(password));
                }
                userRepository.saveAndFlush(findUser.get());
                return new ResponseEntity<>(true, HttpStatus.OK);

            }
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    private boolean checkUserName(String username, User findUser) {

        User findUserBy = userRepository.findByUsername(username);
        if(findUserBy != null)
        {

            if(findUserBy.getId() != findUser.getId())
            {
                return false;
            }
        }
        return true;
    }
    private boolean checkEmail(String email, User findUser)
    {

        User findUserBy = userRepository.findByEmail(email);
        if(findUserBy != null)
        {

            if(findUserBy.getId() != findUser.getId())
            {
                return false;
            }
        }
        return true;
    }
}
