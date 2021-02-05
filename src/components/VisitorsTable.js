import React from 'react';
import 'moment/locale/ko';
import moment from "moment"
import ModalView from "./ModalView";
import {postHttp} from "../authHttpMapper";

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
                <td>{visit.store.storeName}</td>
                <td>{visit.visitor.name}</td>
                <td>{moment(visit.entryTime).format('YYYY년 MM월 DD일 hh시 mm분')}</td>
                <td>{visit.exitTime !== null ? moment(visit.exitTime).format('YYYY년 MM월 DD일 hh시 mm분') : ""}</td>
                <div className="modal fade" id={"Content" + visit.id} tabIndex="-1" role="dialog"
                     aria-labelledby="#ContentTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">방문정보</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ModalView visit={visit}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">닫기</button>
                                <button type="button" className="btn btn-primary" onClick={() => sendPush()}>알림 보내기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
