import React, {useEffect, useState} from 'react';
import {checkLoginStatus, getHttp} from "../authHttpMapper";
import VisitorsTable from "../components/VisitorsTable";
import DateTimePicker from 'react-datetime-picker'
import "./css/Main.css"

function Main(props) {
    const [visits, setVisits] = useState([])
    const [isLogin, setIsLogin] = useState(false)
    const [date, onChange] = useState();
    const [store, setStore] = useState("");
    const [visitor, setVisitor] = useState("");
    const onChangeStore = e => setStore(e.target.value);
    const onChangeVisitor = e => setVisitor(e.target.value);

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

    function qsParser() {
        let timezoneOffset = new Date().getTimezoneOffset() * 60000;

        let qs = ""
        if (store !== "") {
            qs = "?storeName=" + store // store만
            if (visitor !== "") {
                qs = qs + "&visitorName=" + visitor  // store, visit
                if (date !== undefined) {
                    qs = qs + "&time=" + new Date(date - timezoneOffset).toISOString()  // 다있어
                }
            } else {
                if (date !== undefined) {
                    qs = qs + "&time=" + new Date(date - timezoneOffset).toISOString() // store, date
                }
            }
        } else {
            if (visitor !== "") {
                qs = "?visitorName=" + visitor // visit
                if (date !== undefined) {
                    qs = qs + "&time=" + new Date(date - timezoneOffset).toISOString()  // visit , date
                }
            } else {
                if (date !== undefined) {
                    qs = "?time=" + new Date(date - timezoneOffset).toISOString()  // date
                }
            }
        }
        return qs
    }

    function search() {

        getHttp("/visits" + qsParser())
            .then(res => {
                setVisits(res.data.visitLogs)
            }).catch(error => {
            alert(error.response)
        });
    }

    return (
        <div>
            <br/>
            <br/>
            <h1>출입자 리스트</h1>
            <br/>
            <div class="searchCombo">
                <input className="form-control" placeholder="방문장소명" onChange={onChangeStore}></input>
                <input className="form-control" placeholder="방문자 이름" onChange={onChangeVisitor}></input>
                <DateTimePicker class="timepicker" onChange={onChange} value={date} disableClock={true}/>
                <button type="button" className="btn btn-primary" onClick={search}>조회하기</button>
            </div>
            <br/>
            <VisitorsTable visits={visits}/>
        </div>
    );
}

export default Main;
