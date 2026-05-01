import type { TrainingInputFormProps } from "../utlity/types"

export default function TrainingInputForm({ ...props }: TrainingInputFormProps) {
    return (
        <div className="input-form">
            <h3>今日のトレーニングを登録</h3>
            {props.isEdit ? <p className="info">編集モード</p> : ""}
            <form onSubmit={props.addTrainingHistory}>
                <div className="form-control">
                    <label htmlFor="date">日付<span>：</span></label>
                    <input type="date" name="date" id="date" onChange={props.handleChangeForm} value={props.formData.date} />
                </div>
                <div className="form-control">
                    <label htmlFor="udetate">腕立て伏せ<span>：</span></label>
                    <input type="number" name="udetate" id="udetate" placeholder="数値を入力" onChange={props.handleChangeForm} value={props.formData.udetate ?? ""} />
                </div>
                <div className="form-control">
                    <label htmlFor="fukkin">腹筋<span>：</span></label>
                    <input type="number" name="fukkin" id="fukkin" placeholder="数値を入力" onChange={props.handleChangeForm} value={props.formData.fukkin ?? ""} />
                </div>
                <div className="form-control">
                    <label htmlFor="squat">スクワット<span>：</span></label>
                    <input type="number" name="squat" id="squat" placeholder="数値を入力" onChange={props.handleChangeForm} value={props.formData.squat ?? ""} />
                </div>
                <button type="submit">登録</button>
            </form>
        </div>
    )
}