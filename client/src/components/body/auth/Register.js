import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'

const initalState = {
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initalState)


    const {name, email, password, cf_password, err, success} = user 

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
           return setUser({...user, err: "Lütfen boş alanları doldurun" , success: ''})

           if(!isEmail(email))
           return setUser({...user, err: "Lütfen geçerli bir e-posta adresi girin." , success: ''})

           if(isLength(password))
           return setUser({...user, err: "Şifreniz minimum 6 karakterden oluşmalıdır" , success: ''})

           if(!isMatch(password, cf_password))
           return setUser({...user, err: "Şifreleriniz uyuşmuyor, lütfen kontrol edin." , success: ''})

        try{
           
            const res = await axios.post('/user/register', {
                name, email, password
            })

            setUser({...user, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg , success: ''})
        }
    }
    return(
        <div className="login_page">
           <h2>Kayıt Sayfası</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
           <form onSubmit={handleSubmit}>
               <div>
                   <label htmlFor="name">Kullanıcı adı</label>
                   <input type="text" placeholder="Kullanıcı adınızı giriniz" id="name" value={name} name="name" onChange={handleChangeInput}/>
               </div>
               <div>
                   <label htmlFor="email">E-posta Adresi</label>
                   <input type="text" placeholder="E-posta adresinizi giriniz" id="email" value={email} name="email" onChange={handleChangeInput}/>
               </div>
               <div>
                   <label htmlFor="password">Şifre</label>
                   <input type="password" placeholder="Şifrenizi giriniz" id="password" value={password} name="password" onChange={handleChangeInput} />
               </div>
               <div>
                   <label htmlFor="cf_password">Şifreni doğrula</label>
                   <input type="password" placeholder="Şifrenizi giriniz" id="cf_password" value={cf_password} name="cf_password" onChange={handleChangeInput} />
               </div>
               <div className="row">
                   <button type="submit">Register</button>
                   <Link to="/Login">Bir hesabın var mı?</Link>
               </div>
           </form>
        </div>
    )
}

export default Register