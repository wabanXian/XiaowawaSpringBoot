package domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;




@Data
public class Usr {

//    public Integer getId() {
//        return Id;
//    }
//
//    public void setId(Integer id) {
//        Id = id;
//    }
//
//    public String getUsrname() {
//        return Usrname;
//    }
//
//    public void setUsrname(String usrname) {
//        Usrname = usrname;
//    }
//
//    public String getPassword() {
//        return Password;
//    }
//
//    public void setPassword(String password) {
//        Password = password;
//    }

    /**
     * Id
     */
    @JsonProperty(value = "Id")
  private Integer Id;

    /**
     *  Username
     */
@JsonProperty(value = "Usrname")
    private String Usrname;

    /**
     * Password
     */
@JsonProperty(value = "Password")
    private  String Password;
}
