import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import notFound from '../../utils/Notfound/Notfound'
import Dashboard from '../auth/Dashboard'


const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const [totalreview, setTotalreview] = useState([])

    const users = useSelector(state => state.users)

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "Yüklenecek dosya bulunamadı." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Fotoğraf boyutu sadece 2MB olmalıdır." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "Sadece JPEG ve PNG uzantılı dosyalar yükleyebilirsiniz." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updateInfor = () => {
        try {
            axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Başarıyla güncellendi."})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: "Şifreniz minimum 6 karakterden oluşmalıdır.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Şifreleriniz eşleşmiyor, lütfen tekrar deneyin.", success: ''})

        try {
            axios.post('/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Başarıyla güncellendi."})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar) updateInfor()
        if(password) updatePassword()
    }

    const handleDelete = async (id) => {
        try {
            if(user._id !== id){
                if(window.confirm("Hesabı silmek istediğinizden emin misiniz?")){
                    setLoading(true)
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    useEffect(() => {
        axios.get(`/user/mypost/${user.name}`).then((response)=> {
          setTotalreview(response.data);
        })
      })
    return (
        <>
        <div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {loading && <h3>İşlem yapılıyor..</h3>}
        </div>
        <div className="profile_page">
            <div className="col-left">
                <h2>{isAdmin ? "Admin Profile": "User Profile"}</h2>
                <div className="avatar">
                    <img src={avatar ? avatar : user.avatar} alt=""/>
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" onChange={changeAvatar} />
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="name">İsim</label>
                    <input type="text" name="name" id="name" defaultValue={user.name}
                    placeholder="Your name" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email}
                    placeholder="Email" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Yeni şifre</label>
                    <input type="password" name="password" id="password"
                    placeholder="Yeni şifre" value={password} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Yeni şifreni doğrula</label>
                    <input type="password" name="cf_password" id="cf_password"
                    placeholder="Yeni şifreni doğrula" value={cf_password} onChange={handleChange} />
                </div>

                <button disabled={loading} onClick={handleUpdate}>Güncelle</button>
            </div>
            <div className="col-right">
                <h2>İşlemlerim</h2>
                <div style={{overflowX: "auto"}}>
                    <table className="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                totalreview.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.baslik}</td>
                                        <td>{user.detaylar}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default Profile