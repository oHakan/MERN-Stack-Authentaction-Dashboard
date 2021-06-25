import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'






const initalState = {
    baslik: '',
    detaylar: '',
    fotograflar: '',
    err: '',
    success: ''
}


function Dashboard() {
    const [post, setPost] = useState(initalState)
    const auth = useSelector(state => state.auth)
    const {user} = auth

    
    const [totalreview, setTotalreview] = useState([])

    useEffect(() => {
        axios.get('/user/allpost').then((response)=> {
          setTotalreview(response.data);
        })
      })
    

    const {baslik, detaylar, fotograflar, err, success} = post


    const handleChangeInput = e => {
        const {name, value} = e.target
        setPost({...post, [name]: value, err:'', success: ''})

    }


    const handlePostForm = async () => {
        try{
            const res = await axios.post('/user/post', {
                baslik: user.name, detaylar, fotograflar
            })
            setPost({...post, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setPost({...post, err: 'Başarısız' , success: ''})
        }
    }
   
    return(
        <div className="Bilgigiris">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <div className="GirisForm">
            <h1>Yeni çalışan girişi</h1>
            <label htmlFor="detaylar">Başlık</label>
            <input type="text" name="detaylar" id="detaylar" value={detaylar}
            onChange={handleChangeInput}/>
            <label htmlFor="fotograflar">Detaylar</label>
            <input type="text" name="fotograflar" id="fotograflar" value={fotograflar}
            onChange={handleChangeInput}/>
            <br></br>
            <button onClick={handlePostForm}>Paylaş</button>
            </div>

            {totalreview.map((val)=>{
      return (
        <div class="list">
         <h1> ID: {val._id} | BURAYABAK: {val.baslik} Name: {val.detaylar} Test: {val.fotograflar}</h1>
         <h1></h1>
         </div>
        
      );
    })}
           
        </div>
    )
}

export default Dashboard