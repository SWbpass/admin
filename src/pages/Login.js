import React, {useEffect, useState} from 'react';
import {API_BASE_URL, setTokens} from "../authHttpMapper";
import axios from "axios";
import logo from "../Loginlogo.svg";

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
            <img src={logo} alt={logo}/>
            <div className="form-group">
                <input type="email" className="form-control" placeholder="아이디 입력" onChange={onChangeId} onKeyPress={onKeyPress}></input>
                <input type="email" className="form-control" placeholder="비밀번호 입력" type='password' onChange={onChangePawword} onKeyPress={onKeyPress} ></input>
                <button type="button" className="btn btn-primary btn-lg" disabled={id === '' || password === ''} onClick={signIn}>로그인</button>
            </div>
        </div>
    );
}

export default Login;
