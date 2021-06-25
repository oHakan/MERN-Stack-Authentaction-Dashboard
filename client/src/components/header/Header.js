import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

function Header() {
    const auth = useSelector(state =>state.auth)

    const {user, isLogged, isAdmin} = auth

    const handleLogout = async () => {
        try{
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <div className="navigasyon">
                <li classname="navigasyon"><Link to="/dashboard">Dashboard</Link></li>
         <li className="drop-nav">
            <Link to="#" classname="avatar">
            <img src={user.avatar} alt=""/>{user.name}
            </Link>
            <ul className="dropdown">
                <li><Link to="/profile">Profil</Link></li>
                <li><Link to="/" onClick={handleLogout}>Çıkış yap</Link></li>
                {
                    isAdmin
                    ?                <li><Link to="/admin">Admin işlemleri</Link></li>

                    :                <li></li>

                }
            </ul>
        </li>
        </div>
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }
    return (
        <header>
            <div className="logo">
                <h1><Link to="/">OsmanHakan</Link></h1>
            </div>

         
            <ul style={transForm}>
                <li><Link to="/">Main Page</Link></li>
                {
                    isLogged
                    ? userLink()
                    :                <li><Link to="/login">Kayıt Ol</Link></li>

                }

            </ul>
        </header>
    )
}

export default Header