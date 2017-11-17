package service;



import domain.Usr;


import java.util.List;

public interface Usrservice {
    /**
     * 查找所有用户信息
     * @return 所有用户信息
     */
    List<Usr>  chazhaosuoyou();

    /**
     * 根据用户名查找用户
     * @param
     * @return
     */
    Usr CheckUsrname(Usr usr);

    Usr checklogin(Usr usr);

    void setUsr(Usr usr);

}

