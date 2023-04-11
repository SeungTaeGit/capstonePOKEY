package jj.pokey.capstonePOKEY.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class textChatController {

    @RequestMapping("/")
    public String textChatController(){

        return "textChat";
    }
}
