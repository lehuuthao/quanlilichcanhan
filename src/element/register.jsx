
import '../style/register.css'


const FormRegister = () => {
    return (
        <>
            <section className="register">
                <div className="khungRegister">
                    <h2>Đăng ký</h2>
                    <div className="khunginput">
                        
                        <input type="text" placeholder="Tên đăng nhập"/>
                    </div>
                    <div className="khunginput">
                        
                        <input type="email" placeholder="Email"/>
                    </div>
                    <div className="khunginput">
                        <input type="password" placeholder="Mật khẩu"/>
                    </div>
                    <div className="khunginput">
                        <input type="password" placeholder="Nhập lại mật khẩu"/>
                    </div>
                    <button className="Btn_register">Đăng ký</button>
                    <div className="Login">
                        <p>Bạn đã có tài khoản?</p>
                        <Link to="/login" className="linkLogin">Đăng nhập</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FormRegister;
