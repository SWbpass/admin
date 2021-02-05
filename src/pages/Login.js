import React, {useState} from 'react';
import {API_BASE_URL, setTokens} from "../authHttpMapper";
import axios from "axios";
import logo from "../LoginLogo.svg";
import loginBtn from "../LoginBtn.svg";
import "./css/Login.css"

function Login(props) {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const onChangeId = e => setId(e.target.value);
    const onChangePawword = e => setPassword(e.target.value);
    const signIn = async () => {
        let responseData = await axios.post(API_BASE_URL+'/auth/signin', {
            id: id,
            password: password,
            role: "ROLE_ADMIN"
        }).catch(error => {
            alert(error.response.data.message)
        });
        if (responseData !== undefined) {
            await setTokens(responseData.data.accessToken);

            props.history.push('/')
        }
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') signIn();
    }

    return (
        <div className="App">
            <img class="logo" src={logo} alt={logo}/>
            <div className="form-group">
                <input type="email" className="form-control inputs" placeholder="아이디 입력" onChange={onChangeId} onKeyPress={onKeyPress}/>
                <input className="form-control inputs" placeholder="비밀번호 입력" type='password' onChange={onChangePawword} onKeyPress={onKeyPress}/>
                <img src = {loginBtn} className="login" onClick={signIn}/>
            </div>
        </div>
    );
}

export default Login;
