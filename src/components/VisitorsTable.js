import React from 'react';
import 'moment/locale/ko';
import moment from "moment"
import ModalView from "./ModalView";
import {postHttp} from "../authHttpMapper";
import './css/VisitorsTable.css'

function VisitorsTable(props) {
    moment.locale("ko")

    function tableContent(visit) {
        function sendPush() {
            postHttp("/visits/" + visit.id)
                .then(res => {
                    console.log(res.data)
                }).catch(error => {
                alert(error.response)
            });
        }

        return (
            <tr data-toggle="modal" data-target={"#Content" + visit.id}>
                <th scope="row">{visit.id}</th>
                <td  valign="bottom">{visit.store.storeName}</td>
                <td>{visit.visitor.name}</td>
                <td>{moment(visit.entryTime).format('YYYY.MM.DD a hh:mm')}</td>
                <td>{visit.exitTime !== null ? moment(visit.exitTime).format('YYYY.MM.DD a hh:mm') : ""}</td>
                <div className="modal fade" id={"Content" + visit.id} tabIndex="-1" role="dialog"
                     aria-labelledby="#ContentTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered  custom" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title custom"
                                    id="exampleModalLongTitle">&nbsp;&nbsp;&nbsp;&nbsp;방문정보</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body custom">
                                <ModalView visit={visit}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary custom" onClick={() => sendPush()}>
                                    알림 보내기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </tr>
        )
    }

    return (
        <table className="table ">
            <thead>
            <tr>
                <th scope="col">No.</th>
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
