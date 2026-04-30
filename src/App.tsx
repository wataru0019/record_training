import Header from "./components/Header"
import "./App.css"
import { useState, useEffect } from "react"

function PastTraningMenu({ traningMenu, editTraningHistory }) {
  const menuList = traningMenu.map((item) => {
    return (
      <li key={item.date} className="past-traning-item">
        <p className="past-traning-date">Date: {item.date}</p>
        <table className="past-traning-table">
          <tbody>
            <tr>
              <th>種目</th>
              <th>回数</th>
            </tr>
            <tr>
              <td>腕立て伏せ</td>
              <td>{item.udetate} 回</td>
            </tr>
            <tr>
              <td>腹筋</td>
              <td>{item.fukkin} 回</td>
            </tr>
            <tr>
              <td>スクワット</td>
              <td>{item.squat} 回</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => editTraningHistory(item.date)}>編集</button>
      </li>
    )
  })
  return (
    <>
      <h3 className="past-traning-title">過去の履歴</h3>
      <ul className="past-traning-menu">
        {menuList}
      </ul>
    </>
  )
}

function TraningInputForm({ ...props }) {
  return (
    <div className="input-form">
      <h3>今日のトレーニングを登録</h3>
      {props.isEdit ? <p>編集モード</p> : ""}
      <form onSubmit={props.addTraningHIstory}>
        <div className="form-control">
          <label htmlFor="udetate">腕立て伏せ：</label>
          <input type="number" name="udetate" id="udetate" onChange={props.handleChangeUdetate} value={props.udetate} />
        </div>
        <div className="form-control">
          <label htmlFor="fukkin">腹筋：</label>
          <input type="number" name="fukkin" id="fukkin" onChange={props.handleChangeFukkin} value={props.fukkin} />
        </div>
        <div className="form-control">
          <label htmlFor="squat">スクワット：</label>
          <input type="number" name="squat" id="squat" onChange={props.handleChangeSquat} value={props.squat} />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  )
}

function App() {
  const [fukkin, setFukkin] = useState(0)
  const [udetate, setUdetate] = useState(0)
  const [squat, setSquat] = useState(0)
  const [isEdit, setIsEdit] = useState(false)
  const [traningHistory, setTraningHistory] = useState(() => {
    const saved = localStorage.getItem("traningHistory")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("traningHistory", JSON.stringify(traningHistory))
  }, [traningHistory])
  const [errorMessage, setErrorMessage] = useState("")

  const addTraningHIstory = (e) => {
    e.preventDefault()
    if (fukkin < 0 || udetate < 0 || squat < 0) {
      setErrorMessage("数値を正しく入力してください。")
      return
    }
    const date = new Date().toISOString().split("T")[0]

    if (traningHistory.some((item) => item.date === date) && !isEdit) {
      setErrorMessage("既に登録されています。")
      return
    }

    if (isEdit) {
      setTraningHistory(traningHistory.map(item => {
        return item.date === date ? { ...item, fukkin, udetate, squat } : item
      }))
      setIsEdit(false)
      setErrorMessage("")
      setFukkin(0)
      setUdetate(0)
      setSquat(0)
      return
    }

    const newTraning = {
      date: date,
      fukkin: fukkin,
      udetate: udetate,
      squat: squat
    }

    setTraningHistory((traningHistory) => [...traningHistory, newTraning])
    setErrorMessage("")
    setFukkin(0)
    setUdetate(0)
    setSquat(0)
  }

  const handleChangeFukkin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFukkin(Number(e.target.value))
  }
  const handleChangeUdetate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUdetate(Number(e.target.value))
  }
  const handleChangeSquat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSquat(Number(e.target.value))
  }

  const editTraningHistory = (date) => {
    const editTraning = traningHistory.find(item => item.date === date)
    if (!editTraning) {
      setErrorMessage("編集対象が見つかりません")
      return
    }
    setErrorMessage("")
    setFukkin(editTraning.fukkin)
    setUdetate(editTraning.udetate)
    setSquat(editTraning.squat)
    setIsEdit(true)
  }

  return (
    <div>
      <Header />
      <div className="past-traning-view">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <TraningInputForm
          fukkin={fukkin}
          udetate={udetate}
          squat={squat}
          addTraningHIstory={addTraningHIstory}
          handleChangeFukkin={handleChangeFukkin}
          handleChangeUdetate={handleChangeUdetate}
          handleChangeSquat={handleChangeSquat}
          isEdit={isEdit}
        />
        <PastTraningMenu
          traningMenu={traningHistory}
          editTraningHistory={editTraningHistory}
        />
      </div>
    </div>
  )
}

export default App