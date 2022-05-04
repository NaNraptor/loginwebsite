import React from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import SignUp from './SignUp'
import Profile from './Profile'
import AdminDashboard from './AdminDashboard'
import Banned from './Banned'
import _404 from './404'

export default class Views {
    static dashboard = (state) => {
        return (
            <Dashboard state={state} />
        )
    }

    static admin_dashboard = (state) => {
        return (
            <AdminDashboard state={state} />
        )
    }

    static profile = (state) => {
        return (
            <Profile state={state} />
        )
    }

    static banned = (state) => {
        return (
            <Banned state={state} />
        )
    }

    static login = (state) => {
        return (
            <Login state={state}/>
        )
    }

    static signup = (state) => {
        return (
            <SignUp state={state}/>
        )
    }

    static _404 = (state) => {
        return (
            <_404 state={state}/>
        )
    }
}