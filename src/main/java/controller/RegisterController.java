package controller;


import config.Xiaowawawebconfig;
import domain.Usr;


import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.stereotype.Controller;


import org.springframework.web.bind.annotation.*;


import org.springframework.web.servlet.ModelAndView;

import service.Usrservice;


@Controller
public class RegisterController {
    @Autowired
    Usrservice usrservice;
    @Autowired
    Xiaowawawebconfig xiaowawawebconfig;

    @RequestMapping(value = "/Register")
    public String register() {
        return "register";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public Boolean Submit(@RequestBody Usr usr, ModelAndView modelAndView) {
        Boolean result = false;
//        if (usrservice.CheckUsrname(usr) != null) {
//            modelAndView.setViewName("register");
//        } else {
//            usrservice.setUsr(usr);
//            result=true;
//        }
        if (usrservice.CheckUsrname(usr) == null) {
            usrservice.setUsr(usr);
            result=true;
        }
        return result;
    }


}
