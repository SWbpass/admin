import React, {useEffect, useState} from 'react';
import {checkLoginStatus, getHttp} from "../authHttpMapper";
import VisitorsTable from "../components/VisitorsTable";

function Main(props) {
    const [visits, setVisits] = useState([])
    const [isLogin, setIsLogin] = useState(false)

    const checkLogin = async () => {
        let status = await checkLoginStatus();
        if (!status)
            props.history.push("/login")
        else
            setIsLogin(true)

    };

    useEffect(() => {
        checkLogin()
    }, [])

    useEffect(() => {
        if (isLogin)
            getHttp("/visits")
                .then(res => {
                    setVisits(res.data.visitLogs)
                }).catch(error => {
                alert(error.response)
            });
    }, [isLogin])


    return (
        <div className="App">
            <br/>
            <br/>
            <h1>출입자 리스트</h1>
            <br/>
            <br/>
            <VisitorsTable visits={visits}/>
        </div>
    );
}

export default Main;
