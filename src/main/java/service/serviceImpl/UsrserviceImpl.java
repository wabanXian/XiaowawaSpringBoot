package service.serviceImpl;

import dao.UsrDao;
import domain.Usr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.Usrservice;

import java.util.List;

@Service("Usrservice")
public class UsrserviceImpl implements Usrservice {
    @Autowired
    UsrDao usrDao;

    @Override
    public List<Usr> chazhaosuoyou() {
        return usrDao.selectAll();
    }

    @Override
    public Usr CheckUsrname(Usr usr) {
        return usrDao.selectbyUsrname(usr);
    }
   @Override
    public  Usr checklogin(Usr usr){
        return  usrDao.selectbyUsrnameandPassword(usr);
    }

    @Override
    public  void setUsr(Usr usr){
        usrDao.setUsr(usr);
    }
}
