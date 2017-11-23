package xiaowawa.XiaowawaSpringBoot.Mvc;


import dao.UsrDao;
import domain.Usr;
import org.junit.Test;
import org.junit.internal.Classes;
import org.junit.runner.RunWith;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;

import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import org.springframework.test.context.web.WebAppConfiguration;
import service.Usrservice;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootConfiguration()
@WebAppConfiguration

public class XiaowawaSpringBootApplicationTests {

	@Test
	public void contextLoads() {
	}

}
