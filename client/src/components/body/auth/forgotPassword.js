import React, {useState} from 'react'
import axios from 'axios'
import {isEmail} from '../../utils/validation/Validation'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'


const initialState = {
    email: '',
    err: '',
    success: '',

}
function ForgotPassword() {
    const [data, setData] = useState(initialState)
    const {email, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]: value, err:'', success: ''})
    }

    const forgotPassword = async () => {
        if(!isEmail(email))
        return setData({...data, err:'Hatalı e-mail', success: ''})

        try{
           const res = await axios.post('/user/forgot', {email})
           setData({...data, err:'', success: res.data.msg})
        } catch (err) {
          err.response.data.msg && setData({...data, err:'Hatalı e-mail', success: ''})
        }
    }
    return (
        <div className="fg_pass">
            <h2>Şifreni mi unuttun?</h2>

        <div className="row">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <label htmlFor="email">E-posta adresinizi giriniz</label>
            <input type="email" name="email" id="email" value={email}
            onChange={handleChangeInput}/>
            <button onClick={forgotPassword}>E postanı doğrula</button>
        </div>
        </div>
    )
}

export default ForgotPassword