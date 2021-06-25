import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'

function Admin () {
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token);
    const users = useSelector(state => state.users)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()
    const {user, isAdmin} = auth
    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback]);

return (
    <div className="Admin">
<div className="col-right">
                <h2>{isAdmin ? "Users" : "My Orders"}</h2>
                <div style={{overflowX: "auto"}}>
                    <table className="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
    </div>
</div>
)}


export default Admin