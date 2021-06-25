import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import notFound from '../utils/Notfound/Notfound'
import ResetPassword from './auth/ResetPassword'
import Profile from './Profile/Profile'
import dashboard from './auth/Dashboard'
import Transaction from './auth/Transaction'
import admin from './Profile/Admin'

import ForgotPassword from './auth/forgotPassword'

import {useSelector} from 'react-redux'


function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route path="/login" component={isLogged ? notFound : Login}/>
                <Route path="/Register" component={isLogged ? notFound : Register}/>

                <Route path="/forgot_password" component={isLogged ? notFound : ForgotPassword}/>
                <Route path="/user/reset/:token" component={isLogged ? notFound : ResetPassword}/>

                <Route path="/profile" component={isLogged ? Profile : notFound}/>
                <Route path="/transaction" component={isLogged ? Transaction : notFound}/>
                <Route path="/dashboard" component={isLogged ? dashboard : notFound}/>
                <Route path="/admin" component={isAdmin ? admin : notFound}/>



                <Route path="/user/activate/:activation_token" component={ActivationEmail}/>

            </Switch>
        </section>
    )
}

export default Body