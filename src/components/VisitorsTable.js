function VisitorsTable(props) {

    function tableContent(visit) {
        return (
            <tr>
                <th scope="row">{visit.id}</th>
                <td>{visit.store.storeName}</td>
                <td>{visit.visitor.name}</td>
                <td>{visit.entryTime}</td>
                <td>{visit.exitTime}</td>
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
