import React, {useEffect, useState} from 'react';
import 'moment/locale/ko';
import moment from "moment"
import {getHttp} from "../authHttpMapper";


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
            <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{suspicious.visitor.name}</h5>
                    <small>{suspicious.visitor.phoneNumber}</small>
                </div>
                <p className="mb-1">{suspicious.visitor.address}</p>
                <small>
                    {moment(suspicious.entryTime).format('YYYY년 MM월 DD일 hh시 mm분') + " ~ " +
                    moment(suspicious.exitTime).format('YYYY년 MM월 DD일 hh시 mm분')}
                </small>
            </a>
        )
    }

    return (
        <div>
            <h4>가게정보</h4>
            매장명: {props.visit.store.storeName}<br/>
            매장 전화번호: {props.visit.store.storePhoneNumber}<br/>
            매장 주소: {props.visit.store.address}<br/>
            <h4>방문자 정보</h4>
            방문자 : {props.visit.visitor.name}<br/>
            방문자 전화번호 : {props.visit.visitor.phoneNumber}<br/>
            방문자 주소지: {props.visit.visitor.address}<br/>
            입장시간 : {moment(props.visit.entryTime).format('YYYY년 MM월 DD일 hh시 mm분')}<br/>
            퇴장시간 : {moment(props.visit.exitTime).format('YYYY년 MM월 DD일 hh시 mm분')}<br/>
            <h4>접촉 의심자 정보({suspicious.length}명)</h4>
            {suspicious.map(suspiciousE => suspiciousList(suspiciousE))}
        </div>
    )
}

export default ModalView;
