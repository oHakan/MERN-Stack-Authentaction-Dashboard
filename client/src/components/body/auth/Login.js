import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'

const initalState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login() {
    const [user, setUser] = useState(initalState)
    const dispatch = useDispatch()
    const history = useHistory()

    const {email, password, err, success} = user 

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '' , success: res.data.msg})

            localStorage.setItem('firstLogin', true)
            
            dispatch(dispatchLogin())
            history.push("/dashboard")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg , success: ''})
        }
    }
    return(
        <div className="login_page">
           <h2>Giriş Sayfası</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
           <form onSubmit={handleSubmit}>
               <div>
                   <label htmlFor="email">E-posta Adresi</label>
                   <input type="text" placeholder="E-posta adresinizi giriniz" id="email" value={email} name="email" onChange={handleChangeInput}/>
               </div>
               <div>
                   <label htmlFor="password">Şifre</label>
                   <input type="password" placeholder="Şifrenizi giriniz" id="password" value={password} name="password" onChange={handleChangeInput} />
               </div>

               <div className="row">
                   <button type="submit">Giriş Yap</button>
                   <Link to="/forgot_password">Şifrenizi mi unuttunuz?</Link>
               </div>
               <p>Kayıt olmak için <Link to="/register">Tıkla</Link></p>
           </form>
        </div>
    )
}

export default Login