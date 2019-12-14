package recipe.app.demo.controllers.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
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
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/recipe")
public class ApiRecipeController {
    private UserRepository userRepository;
    private RecipeRepository recipeRepository;
    private DietRepository dietRepository;
    private CuisineRepository cuisineRepository;
    //    private Set<Diet> diets;
    private ServletContext servletContext;

    public ApiRecipeController(UserRepository userRepository,
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


    @PostMapping(path = "/add")
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
        if (user == null) {
            return new ResponseEntity<>("No user", HttpStatus.UNAUTHORIZED);
        }
        Set<Diet> diets = new HashSet<Diet>();
        Diet diet = dietRepository.findByType(dietType);
        diets.add(diet);
        Cuisine cuisine = cuisineRepository.findByType(cuisineType);
        if (cuisine == null) {
            return new ResponseEntity<>("No cuisine", HttpStatus.BAD_GATEWAY);
        }
        if (diets == null) {
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
        } catch (Exception ex) {
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
    public List<Recipe> getRecipes() {
        return recipeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Recipe> getRecipe(
            @RequestParam(value = "id") int id
    ) {
        return recipeRepository.findById(id);
    }

    @PostMapping(path = "/edit/{id}")
//    @Secured({"admin"})
    public ResponseEntity edit(
            @RequestParam(value = "id") int id,
            @RequestParam(value = "title") String title,
            @RequestParam(value = "preptime") int preptime,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "ingredients") String ingredients,
            @RequestParam(value = "preparation") String preparation,
//            @RequestParam(value = "cover") MultipartFile file,
//            @RequestParam(value = "createdAt") Date createdAt,
            @RequestParam(value = "dietType") String dietType,
            @RequestParam(value = "cuisineType") String cuisineType,
            HttpSession session
    ) {
//        int numOfErrors = 0;
//        Date now = new Date();
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return new ResponseEntity<>("No user", HttpStatus.UNAUTHORIZED);
        }
        Optional<Recipe> recipe = recipeRepository.findById(id);
        if (recipe == null) {
            return new ResponseEntity<>("No recipe", HttpStatus.BAD_GATEWAY);
        }
        Set<Diet> diets = new HashSet<Diet>();
        Diet diet = dietRepository.findByType(dietType);
        diets.add(diet);
        Cuisine cuisine = cuisineRepository.findByType(cuisineType);
        if (cuisine == null) {
            return new ResponseEntity<>("No cuisine", HttpStatus.BAD_GATEWAY);
        }
        if (diets == null) {
            return new ResponseEntity<>("No diet", HttpStatus.BAD_GATEWAY);
        }
//        Path path;
//        String webappRoot;
//        String filename;
//        String pathToSave;
//        if(file != null) {
//            try {
//
//                webappRoot = servletContext.getRealPath("/");
//
////            String relativeFolder = File.separator + "resources" + File.separator + "images" + File.separator;
//                String relativeFolder = webappRoot + "image-upload";
//                filename = relativeFolder + File.separator + file.getOriginalFilename();
//
//                // upload directory - change it to your own
////            String UPLOAD_DIR = "/opt/uploads";
//
//                // create a path from file name
//                path = Paths.get(relativeFolder, file.getOriginalFilename());
//
//                // save the file to `UPLOAD_DIR`
//                // make sure you have permission to write
//                Files.write(path, file.getBytes());
//            } catch (Exception ex) {
//                return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_GATEWAY);
//            }
//            recipe.setCover(File.separator + "image-upload" + File.separator + file.getOriginalFilename());
//        }

        recipe.get().setTitle(title);
        recipe.get().setPreptime(preptime);
        recipe.get().setDescription(description);
        recipe.get().setIngredients(ingredients);
        recipe.get().setCover(recipe.get().getCover());
        recipe.get().setPreparation(preparation);
        recipe.get().setUser(user);
        recipe.get().setDiets(diets);
        recipe.get().setCuisine(cuisine);


//        Recipe recipe = new Recipe(
//                title,
//                preptime,
//                description,
//                ingredients,
//                preparation,
//                File.separator + "image-upload" + File.separator + file.getOriginalFilename(),
//                user,
//                diets,
//                cuisine
//        );
//        return new ResponseEntity<>(recipe, HttpStatus.OK);
        try {
            recipeRepository.saveAndFlush(recipe.get());
            return new ResponseEntity<>(recipe, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.I_AM_A_TEAPOT);
        }

//        }
    }

    @GetMapping("/filter")
    public List<Recipe> filter(
            @RequestParam(value = "cuisineId") int cuisineId,
            @RequestParam(value = "ingredient") String ingredient
    ) {

        if (cuisineId == 0) {
            if(ingredient.equals("")){
                return recipeRepository.findAll();
            } else {
                return recipeRepository.findByIngredientsContaining(ingredient);
            }
        } else {
            if(ingredient.equals("")){
                return recipeRepository.findByCuisineId(cuisineId);
            } else {
                return recipeRepository.findByIngredientsContainingAndCuisineId(ingredient, cuisineId);
            }

        }
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<Boolean> deleteRecipe(
            @RequestParam(value = "id") int id,
            HttpSession session
    ){

        User user = (User)session.getAttribute("user");

        if(user == null) {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }

        Optional<Recipe> optionalRecipe = recipeRepository.findById(id);

        if(optionalRecipe.isPresent()) {

            Recipe recipe = optionalRecipe.get();

            if(user.getRole().getName().equals("admin")) {
                recipeRepository.delete(recipe);

                return new ResponseEntity<>(true, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(false, HttpStatus.I_AM_A_TEAPOT);
            }

        }else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}
