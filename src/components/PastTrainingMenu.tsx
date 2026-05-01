import type { TrainingItem, PastTrainingMenuProps } from "../utlity/types"

export default function PastTrainingMenu({ trainingMenu, editTrainingHistory }: PastTrainingMenuProps) {
    const tableMenuList = trainingMenu.map((item: TrainingItem) => {
        return (
            <tr key={item.date}>
                <td>{item.date}</td>
                <td>{item.udetate}</td>
                <td>{item.fukkin}</td>
                <td>{item.squat}</td>
                <td><button className="edit-btn" onClick={() => editTrainingHistory(item.date)}>編集</button></td>
            </tr>
        )
    })
    return (
        <div className="past-training-wrapper">
            <h3 className="past-training-title">過去の履歴</h3>
            <table className="past-training-table">
                <tbody>
                    <tr>
                        <th>日付</th>
                        <th>腕立て伏せ</th>
                        <th>腹筋</th>
                        <th>スクワット</th>
                        <th>編集</th>
                    </tr>
                    {tableMenuList}
                </tbody>
            </table>
        </div>
    )
}