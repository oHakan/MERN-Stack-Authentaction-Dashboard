import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'


function Transaction() {
    
    const auth = useSelector(state => state.auth)
    const {user} = auth

    const [totalreview, setTotalreview] = useState([])

    useEffect(() => {
        axios.get(`/user/mypost/${user.name}`).then((response)=> {
          setTotalreview(response.data);
        })
      })
    

    return(
    <div>
        Yapmış olduğum işlemler
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


export default Transaction