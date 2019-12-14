package recipe.app.demo.controllers.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/cuisine")
public class CuisineController {
    @GetMapping()
    public String index() {
        return "cuisine/form";
    }
}
