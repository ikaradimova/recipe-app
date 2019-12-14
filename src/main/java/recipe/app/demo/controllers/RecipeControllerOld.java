package recipe.app.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import recipe.app.demo.models.Cuisine;
import recipe.app.demo.models.Diet;
import recipe.app.demo.models.Recipe;
import recipe.app.demo.models.User;
import recipe.app.demo.repositories.CuisineRepository;
import recipe.app.demo.repositories.DietRepository;
import recipe.app.demo.repositories.RecipeRepository;
import recipe.app.demo.repositories.UserRepository;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class RecipeControllerOld {

    private UserRepository userRepository;
    private RecipeRepository recipeRepository;
    private DietRepository dietRepository;
    private CuisineRepository cuisineRepository;
//    private Set<Diet> diets;
    private ServletContext servletContext;

    public RecipeControllerOld(UserRepository userRepository,
                               RecipeRepository recipeRepository,
                               DietRepository dietRepository,
                               CuisineRepository cuisineRepository,
                               ServletContext servletContext) {
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.dietRepository = dietRepository;
        this.cuisineRepository = cuisineRepository;
        this.servletContext = servletContext;
    }


    @PostMapping(path = "/recipe/add")
    public ResponseEntity add(
            @RequestParam(value = "title") String title,
            @RequestParam(value = "preptime") int preptime,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "ingredients") String ingredients,
            @RequestParam(value = "preparation") String preparation,
            @RequestParam(value = "cover") MultipartFile file,
//            @RequestParam(value = "createdAt") Date createdAt,
            @RequestParam(value = "dietType") String dietType,
            @RequestParam(value = "cuisineType") String cuisineType,
            HttpSession session
    ) {
//        int numOfErrors = 0;
//        Date now = new Date();
        User user = (User) session.getAttribute("user");
        if(user == null){
            return new ResponseEntity<>("No user", HttpStatus.UNAUTHORIZED);
        }
        Set<Diet> diets = new HashSet<Diet>();
        Diet diet = dietRepository.findByType(dietType);
        diets.add(diet);
        Cuisine cuisine = cuisineRepository.findByType(cuisineType);
        if(cuisine == null){
            return new ResponseEntity<>("No cuisine", HttpStatus.BAD_GATEWAY);
        }
        if(diets == null){
            return new ResponseEntity<>("No diet", HttpStatus.BAD_GATEWAY);
        }
        Path path;
        String webappRoot;
        String filename;
        try {

            webappRoot = servletContext.getRealPath("/");

//            String relativeFolder = File.separator + "resources" + File.separator + "images" + File.separator;
            String relativeFolder = webappRoot + "image-upload";
            filename = relativeFolder + File.separator + file.getOriginalFilename();

            // upload directory - change it to your own
//            String UPLOAD_DIR = "/opt/uploads";

            // create a path from file name
            path = Paths.get(relativeFolder, file.getOriginalFilename());

            // save the file to `UPLOAD_DIR`
            // make sure you have permission to write
            Files.write(path, file.getBytes());
        }
        catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_GATEWAY);
        }

        Recipe recipe = new Recipe(
                title,
                preptime,
                description,
                ingredients,
                preparation,
                File.separator + "image-upload" + File.separator + file.getOriginalFilename(),
                user,
                diets,
                cuisine
        );
        try {
            recipeRepository.saveAndFlush(recipe);
            return new ResponseEntity<>(recipe, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.I_AM_A_TEAPOT);
        }

//        }
    }

    @GetMapping("/getRecipes")
    public List<Recipe> getRecipes()
    {
        return recipeRepository.findAll();
    }
}
