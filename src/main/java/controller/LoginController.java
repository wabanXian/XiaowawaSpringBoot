package controller;


import config.Xiaowawawebconfig;
import domain.Usr;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Controller;


import org.springframework.web.bind.annotation.*;


import org.springframework.web.servlet.ModelAndView;
import service.Usrservice;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;


@Controller
public class LoginController {

    @Autowired
    Usrservice usrservice;
    @Autowired
    Xiaowawawebconfig xiaowawawebconfig;
    @Autowired
    DiscoveryClient discoveryClient;
    private Logger logger = Logger.getLogger(getClass());

    @RequestMapping(value = {"/", "/login"})
    public String login() {
        ServiceInstance serviceInstance = discoveryClient.getLocalServiceInstance();
//        modelAndView.setViewName("login");
        logger.info("/login,host:" + serviceInstance.getHost() + "," + serviceInstance.getServiceId() + "," + serviceInstance.getPort());
        return "Login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Boolean login(@RequestBody Usr usr, HttpSession httpSession) throws InterruptedException {
         Boolean result = false;
        if (usrservice.checklogin(usr)!=null) {
            httpSession.setAttribute("usr", usr);
            result=true;
        }
//        else {
//             modelAndView.addObject("Usr",usrservice.chazhaosuoyou());
//            modelAndView.setViewName("/Hello");
//        }
        return result;
    }
}
