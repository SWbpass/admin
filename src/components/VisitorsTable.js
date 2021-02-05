import React from 'react';
import 'moment/locale/ko';
import moment from "moment"

function VisitorsTable(props) {
    moment.locale("ko")

    function tableContent(visit) {
        return (
            <tr>
                <th scope="row">{visit.id}</th>
                <td>{visit.store.storeName}</td>
                <td>{visit.visitor.name}</td>
                <td>{moment(visit.entryTime).format('YYYY년 MM월 DD일 hh시 mm분')}</td>
                <td>{moment(visit.exitTime).format('YYYY년 MM월 DD일 hh시 mm분')}</td>
            </tr>
        )
    }

    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col">visitId</th>
                <th scope="col">장소</th>
                <th scope="col">방문자</th>
                <th scope="col">입장시간</th>
                <th scope="col">퇴장시간</th>
            </tr>
            </thead>
            <tbody>
            {props.visits.map(visit => tableContent(visit))}
            </tbody>
        </table>
    )
}

export default VisitorsTable;
