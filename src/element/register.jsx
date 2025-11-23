
import { MdAccountCircle, MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import '../style/register2.css'

const FormRegister = () => {
    return (
        <>
            <section className="register">
                <div className="khungRegister">
                    <h2>Đăng ký</h2>
                    <div className="khunginput">
                        <MdAccountCircle className="icon"/>
                        <input type="text" placeholder="Tên đăng nhập"/>
                    </div>
                    <div className="khunginput">
                        <MdEmail className="icon"/>
                        <input type="email" placeholder="Email"/>
                    </div>
                    <div className="khunginput">
                        <RiLockPasswordFill className="icon"/>
                        <input type="password" placeholder="Mật khẩu"/>
                    </div>
                    <div className="khunginput">
                        <RiLockPasswordFill className="icon"/>
                        <input type="password" placeholder="Nhập lại mật khẩu"/>
                    </div>
                    <button className="Btn_register">Đăng ký</button>
                    <div className="Login">
                        <p>Bạn đã có tài khoản?</p>
                        <Link to="/" className="linkLogin">Đăng nhập</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FormRegister;
