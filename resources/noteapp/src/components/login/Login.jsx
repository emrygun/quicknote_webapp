import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';

import {BrowserRouter as Switch, Route } from 'react-router-dom'

import {Noteapp} from '../noteapp/Noteapp';
import './login.scss';

const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque."

const NAME = "Emre Uygun";
const CLASS = "Object Oriented Programming Assignment";

export function Login() {
    const [profile, setProfile] = useState(null)

    const responseGoogleSuccess = (response) => {

        let requestOptions = {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            mode: "no-cors",
            body: JSON.stringify(response.profileObj)
        };

        setProfile(response.profileObj);

        fetch('http://localhost:5000/login', requestOptions)
        .then(response => response.json())
        console.log(response.profileObj);
    }

    const responseGoogleFailure= () => { }

    return ( 
        <Switch>
            <Route exact path="/">
                {profile == null ? (
            <div className="component-main-container">
                <div className="main-container column is-half">
                    <div className="login-container box">
                        <div className="login-content">
                            <div className="header">
                                <h3 className="title is-2">QuickNote takes your notes</h3>
                            </div>
                            <div className="represent block">
                                <p className="subTitle">Take Notes.. Share with Friends</p>
                                <br/><br/>
                                <span className="googleLogin">
                                    <GoogleLogin
                                        clientId = {process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
                                        onSuccess = {responseGoogleSuccess}
                                        onFailure = {responseGoogleFailure}
                                        cookiePolicy = {'single_host_origin'}
                                        isSignedIn = {false}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="info content is-normal">
                        <p className="infoTitle">Note History</p>
                        <p>{LOREM_IPSUM}</p>
                        <div className="footer-container">
                            <span className="footer-tag tag is-info is-light">{NAME}</span>
                            <span className="footer-tag tag is-info is-light">{CLASS}</span>
                        </div>
                    </div>
                </div>
            </div> ) : <Noteapp googleProfile={profile}/>}
            </Route>
        </Switch>
    )
}
