package config;

import lombok.Data;
import org.springframework.beans.BeansException;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;


import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


@Data
@Component
@ConfigurationProperties(prefix = "wawa")

public class Xiaowawawebconfig extends WebMvcConfigurerAdapter implements ApplicationContextAware {

    private ApplicationContext applicationContext;

    public Xiaowawawebconfig() {
        super();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new UsrLoginInterceptor()).addPathPatterns("/new");
        super.addInterceptors(registry);
    }
    @Override
    public  void    setApplicationContext(ApplicationContext applicationContext)throws BeansException{

    }
}
