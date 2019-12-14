package recipe.app.demo.controllers.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import recipe.app.demo.models.Diet;
import recipe.app.demo.models.User;
import recipe.app.demo.repositories.DietRepository;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping(value = "/api/diet")
public class ApiDietController {

    private DietRepository dietRepository;

    public ApiDietController(DietRepository dietRepository) {
        this.dietRepository = dietRepository;
    }

    @PostMapping(path = "/add")
//    @Secured({"admin"})
    public ResponseEntity add(
            @RequestParam(value = "type") String type,
            HttpSession session
    ) {
        User user = (User) session.getAttribute("user");
        if(user == null){
            return new ResponseEntity<>("No user", HttpStatus.UNAUTHORIZED);
        }
        Diet diet = new Diet(type);
        if (dietRepository.findByType(type) != null) {
            return new ResponseEntity<>("Diet already exists", HttpStatus.ALREADY_REPORTED);
        }
        try {
            dietRepository.saveAndFlush(diet);
            return new ResponseEntity<>(diet, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

//        }
    }

    @GetMapping("/getDiets")
    public List<Diet> getDiets()
    {
        return dietRepository.findAll();
    }
}
