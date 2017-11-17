package dao;


import domain.Usr;




import java.util.List;
//@Repository
public interface UsrDao {

//@Select("SELECT * FROM test.usr")
    List<Usr> selectAll();

//@Select("select * from test.usr where Usrname=#{Usrname}")
    Usr selectbyUsrname(Usr usr);

//@Select("select * from test.usr where Usrname=#{Usrname} and Password=#{Password}")
    Usr selectbyUsrnameandPassword(Usr usr);

//@Insert("INSERT INTO test.usr('Usrname',Password) VALUES(#{Usrname},#{Password})")
 void setUsr(Usr usr);

//@Delete("DELETE FROM test.usr where Id=#{Id}")
    void delUsr(Integer Id);
}
