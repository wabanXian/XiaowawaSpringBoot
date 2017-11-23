// function validate_Usrname(field,alerttxt)
//     {
//         with (field)
//         {
//             if (value==null||value=="")
//             {alert(alerttxt);return false}
//             else {return true}
//         }
//     }
//
// function validate_Password(field,alerttxt)
// {
//     with (field)
//     {
//         if (value==null||value=="")
//         {alert(alerttxt);return false}
//         else {return true}
//     }
// }

// function validate_pwd(field,alerttxt)
// {
//     with (field)
//     {
//         if (value.size<6||value.size>12)
//         {alert(alerttxt);return false}
//         else {return true}
//     }
// }

// function validate_form()
// {
//
//         if (validate_Usrname(Usrname,"用户名不能为空")==false)
//         {Usrname.focus();return false}
//         else if(validate_Password(Password,"密码不能为空")==false)
//         {Password.focus();return false}
//         var usr = document.getElementById("Usrname").value.trim();
//         var pwd = document.getElementById("Password").value.trim();
//           reg=/^[a-zA-Z0-9_]+$/;
//           if (pwd.length<6)
//           {alert("密码不能小于六位");return false }
//           else if (pwd.length>12)
//           {alert ("密码不能超过12位");return false}
//           else  if (!reg.test(usr))
//             {alert ("用户名格式错误");return false}
//           else  if (!reg.test(pwd))
//                 {alert("密码格式不正确");return false }
// }

function vaild() {
    var a = 0;
    var usr = document.getElementById("Usrname").value;
    var pwd = document.getElementById("Password").value;
    reg = /^[a-zA-Z0-9_]+$/;
    if (usr== null || usr== "") {
        alert("用户名不能为空");
        return
    }
    else if (pwd== null || pwd== "") {
        alert("密码不能为空");
        return
    }
    else if (pwd.length < 6) {
        a++;
        alert("密码不能小于六位");
        return
    }
    else if (pwd.length > 12) {
        a++;
        alert("密码不能超过12位");
        return;
    }
    else if (!reg.test(usr)) {
        a++;
        alert("用户名格式错误");
        return;
    }
    else if (!reg.test(pwd)) {
        a++;
        alert("密码格式不正确");
        return;
    }
    a=0;
return a;
}

function checkregister() {
    if (vaild()==0) {
        var fd = {
            "Usrname": document.getElementById("Usrname").value,
            "Password": document.getElementById("Password").value
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/register",
            dataType: 'json',
            async: false,
            data: JSON.stringify(fd),
            success: function (data) {
                if (data) {
                    alert("注册成功");
                   location.href="/login";
                }
                else {
                    alert("该用户已存在");
                    ccl();
                }
            },
            error: function (e) {
                console.log("error: " + e);
                alert("Error");
            }
        });
    }

}

function checklogin() {
    if (vaild()==0){
    var fd = {
        "Usrname": document.getElementById("Usrname").value,
        "Password": document.getElementById("Password").value
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/login",
        datatype: "json",
        async: false,
        data: JSON.stringify(fd),
        success: function (data) {
            if (data) {
                alert("登录成功");
                location.href = "/new";

            }
            else {
                alert("用户名或密码错误");
            }
        },
        error: function (e) {
            alert("Error:" + e)
        }
    })
}
}


function ccl() {
    document.getElementById("cl").innerHTML = "";
}