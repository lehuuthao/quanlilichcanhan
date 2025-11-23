import { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import '../style/login2.css'

const FormLogin=()=>{
   const danhsach=[
   
    {
        id:1,
        name:"thao 3d",
        matkhau:'123'
    },
    {
        id:2,
        name:"thao 4d",
        matkhau:'123'
    },
    {
        id:3,
        name:"thao 5d",
        matkhau:'123'
    },
    {
        id:4,
        name:"nguyen pro",
        matkhau:'123'
    },
   ]
        const [data,setdata] = useState(
        {
            name:"",
            matkhau: "",
        },
    ) 


    const Handle_onchang =(e)=>{
        const {name,value} = e.target;
        setdata((prev)=>({
        ...prev,
        [name]:value
     }))
    }


  
    const handleClick=()=>{
        var kt={
            status:false,
            message:"",
        };

       for(var index in danhsach){
          if(danhsach[index].name===data.name){
            if(danhsach[index].matkhau===data.matkhau){
                alert("ddax dang nhap");
                kt.status=true;
                break;
            }else{
               kt.message="loi mat khau";
               alert("loi mat khau")
               break;
            }
        }

       }
       if(!kt.status && kt.message!=="loi mat khau"){
        alert("loi name dang nhap")
       }
    }

    return(
         <>
         <section className="login">
               <div className="khungLogin">
                    <h2>Login</h2>
                    <div className="khunginput">
                         <MdAccountCircle className="icon"/>
                        <input value={data.name} name="name" type="text" placeholder="Nhập tên"
                        onChange={Handle_onchang}/>
                    </div>
                    <div className="khunginput">
                         <RiLockPasswordFill className="icon"/>
                        <input value={data.matkhau} name='matkhau' type="password" placeholder="Nhập mật khẩu"
                        onChange={Handle_onchang}/>
                    </div>
                    <div className="khungQuenpass">
                    <Link className="Link">Quên mật khẩu</Link>
                    </div>
                    <button className="Btn_login" onClick={handleClick}>Login</button>
                    <div className="Register">
                        <p>Bạn đã có tài khoản chưa?</p>
                        <Link to="/dangky" className="linkRegister">Đăng ký</Link>
                    </div>
               </div>
        </section>

        </>
    )
}

export default FormLogin