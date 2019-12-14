package recipe.app.demo.controllers.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipe.app.demo.models.Cuisine;
import recipe.app.demo.models.User;
import recipe.app.demo.repositories.CuisineRepository;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping(value = "/api/cuisine")
public class ApiCuisineController {
    private CuisineRepository cuisineRepository;

    public ApiCuisineController(CuisineRepository cuisineRepository) {
        this.cuisineRepository = cuisineRepository;
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
        Cuisine cuisine = new Cuisine(type);
        if (cuisineRepository.findByType(type) != null) {
            return new ResponseEntity<>("Cuisine already exists", HttpStatus.ALREADY_REPORTED);
        }
        try {
            cuisineRepository.saveAndFlush(cuisine);
            return new ResponseEntity<>(cuisine, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

//        }
    }

    @GetMapping("/getCuisines")
    public List<Cuisine> getCuisines()
    {
        return cuisineRepository.findAll();
    }
}
