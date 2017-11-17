package xiaowawa;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;


import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

import org.springframework.stereotype.Controller;


@Controller
@EnableAutoConfiguration
@ComponentScan("controller")
@ComponentScan("service")
@ComponentScan("config")
@MapperScan("dao")
@EnableDiscoveryClient

public class XiaowawaSpringBootApplication {

    public static void main(String[] args) {
        SpringApplication.run(XiaowawaSpringBootApplication.class, args);
    }
}
