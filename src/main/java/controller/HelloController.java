package controller;




import config.Xiaowawawebconfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import service.Usrservice;


@Controller
public class HelloController {
@Autowired
    Usrservice usrservice;
@Autowired
Xiaowawawebconfig xiaowawawebconfig;
   @RequestMapping("/new")
    public ModelAndView Hello(ModelAndView mv){
        mv.setViewName("new");
            return mv;
}
}
