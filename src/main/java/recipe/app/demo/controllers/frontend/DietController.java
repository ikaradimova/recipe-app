package recipe.app.demo.controllers.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/diet")
public class DietController {
    @GetMapping("/add")
    public String add() {
        return "diet/form";
    }
}
