package recipe.app.demo.controllers.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/recipe")
public class RecipeController {
    @GetMapping("/add")
    public String add() {
        return "recipe/form";
    }

    @GetMapping("/{id}")
    public String show() {
        return "recipe/recipe";
    }

    @GetMapping("/edit/{id}")
    public String edit() {
        return "recipe/edit";
    }
}
