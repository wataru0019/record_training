import Header from "./components/Header"
import PastTrainingMenu from "./components/PastTrainingMenu"
import TrainingInputForm from "./components/TrainingInputForm"
import "./App.css"
import { useTraining } from "./utlity"

function JissekiKanri() {
  const jissekis = Array(28).fill(null).map((_, i) => {
    return (
      <div key={i} className="weekly-jisseki">
        <div className="dayly-jisseki jisseki-10"></div>
        <div className="dayly-jisseki jisseki-20"></div>
        <div className="dayly-jisseki jisseki-30"></div>
        <div className="dayly-jisseki jisseki-40"></div>
        <div className="dayly-jisseki jisseki-50"></div>
        <div className="dayly-jisseki jisseki-60"></div>
        <div className="dayly-jisseki jisseki-70"></div>
      </div>
    )
  })
  return (
    <div className="grid-jisseki-wrapper">
      {jissekis}
    </div>
  )
}

function App() {
  const { formData, isEdit, trainingHistory, errorMessage, addTrainingHistory, handleChangeForm, editTrainingHistory } = useTraining()

  return (
    <div className="container">
      <Header />
      <div className="past-training-view">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <TrainingInputForm
          formData={formData}
          addTrainingHistory={addTrainingHistory}
          handleChangeForm={handleChangeForm}
          isEdit={isEdit}
        />
        <JissekiKanri />
        <PastTrainingMenu
          trainingMenu={trainingHistory}
          editTrainingHistory={editTrainingHistory}
        />
      </div>
    </div>
  )
}

export default App