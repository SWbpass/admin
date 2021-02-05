import React, {useEffect, useState} from 'react';
import 'moment/locale/ko';
import moment from "moment"
import {getHttp} from "../authHttpMapper";
import './css/ModalView.css'


function ModalView(props) {
    const [suspicious, setSuspicious] = useState([])

    useEffect(() => {
        getHttp("/visits/suspicious/" + props.visit.id)
            .then(res => {
                setSuspicious(res.data.suspicious)
                console.log(res.data.suspicious)
            }).catch(error => {
            alert(error.response)
        });
    }, [])


    function suspiciousList(suspicious) {
        return (
            <a href="#" className="list-group-item list-group-item-action flex-column align-items-start time">
                <div className="d-flex w-100 justify-content-between">
                    <p>{suspicious.visitor.name}</p>
                    {suspicious.visitor.phoneNumber}
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <p className="addr">{suspicious.visitor.address}</p>
                    입장시간 : {moment(suspicious.entryTime).format('YYYY.MM.DD a hh:mm')}<br/>
                    퇴장시간 : {moment(suspicious.exitTime).format('YYYY.MM.DD a hh:mm')}<br/>
                </div>
            </a>
        )
    }

    return (
        <div className="views">
            <h5>가게정보</h5>
            <div className="content">
                매장명 : {props.visit.store.storeName}<br/>
                매장 전화번호 : {props.visit.store.storePhoneNumber}<br/>
                매장 주소 : {props.visit.store.address}<br/><br/>
            </div>
            <h5>방문자 정보</h5>
            <div className="content">
                방문자 : {props.visit.visitor.name}<br/>
                방문자 전화번호 : {props.visit.visitor.phoneNumber}<br/>
                방문자 주소지: {props.visit.visitor.address}<br/>
                입장시간 : {moment(props.visit.entryTime).format('YYYY.MM.DD a hh:mm')}<br/>
                퇴장시간 : {moment(props.visit.exitTime).format('YYYY.MM.DD a hh:mm')}<br/><br/>
            </div>
            <h5>접촉 의심자 정보({suspicious.length}명)</h5>
            {suspicious.map(suspiciousE => suspiciousList(suspiciousE))}
        </div>
    )
}

export default ModalView;
