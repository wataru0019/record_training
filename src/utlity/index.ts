import { useState, useEffect } from "react"
import type { TrainingItem } from "./types"

export function useTraining() {
    const [formData, setFormData] = useState<TrainingItem>({
        date: new Date().toISOString().split("T")[0],
        fukkin: null,
        udetate: null,
        squat: null
    })
    const [isEdit, setIsEdit] = useState(false)
    const [trainingHistory, setTrainingHistory] = useState<TrainingItem[]>(() => {
        const saved = localStorage.getItem("trainingHistory")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("trainingHistory", JSON.stringify(trainingHistory))
    }, [trainingHistory])
    const [errorMessage, setErrorMessage] = useState("")

    const addTrainingHistory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData.fukkin < 0 || formData.udetate < 0 || formData.squat < 0) {
            setErrorMessage("数値を正しく入力してください。")
            return
        }

        if (formData.fukkin === null || formData.udetate === null || formData.squat === null) {
            setErrorMessage("数値を入力してください。")
            return
        }

        if (trainingHistory.some((item: TrainingItem) => item.date === formData.date) && !isEdit) {
            setErrorMessage("既に登録されています。")
            return
        }

        if (isEdit) {
            setTrainingHistory(trainingHistory.map((item: TrainingItem) => {
                return item.date === formData.date ? { ...item, fukkin: formData.fukkin, udetate: formData.udetate, squat: formData.squat } : item
            }))
            setIsEdit(false)
            setErrorMessage("")
            setFormData({
                date: new Date().toISOString().split("T")[0],
                fukkin: null,
                udetate: null,
                squat: null
            })
            return
        }

        setTrainingHistory((trainingHistory: TrainingItem[]) => [...trainingHistory, formData])
        setErrorMessage("")
        setFormData({
            date: new Date().toISOString().split("T")[0],
            fukkin: null,
            udetate: null,
            squat: null
        })
    }

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "date" && isEdit) {
            setErrorMessage("編集モード中は日付を変更できません")
            return
        }
        setFormData(prev => ({
            ...prev,
            [name]: name === "date" ? value : Number(value)
        }))
    }

    const editTrainingHistory = (date: string) => {
        const editTraining = trainingHistory.find((item: TrainingItem) => item.date === date)
        if (!editTraining) {
            setErrorMessage("編集対象が見つかりません")
            return
        }
        setErrorMessage("")
        setFormData(editTraining)
        setIsEdit(true)
    }

    return {
        formData,
        isEdit,
        trainingHistory,
        errorMessage,
        addTrainingHistory,
        handleChangeForm,
        editTrainingHistory
    }
}