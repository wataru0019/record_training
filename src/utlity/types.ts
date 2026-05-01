export interface TrainingItem {
    date: string
    fukkin: number | null
    udetate: number | null
    squat: number | null
}

export interface PastTrainingMenuProps {
    trainingMenu: TrainingItem[]
    editTrainingHistory: (date: string) => void
}

export interface TrainingInputFormProps {
    formData: TrainingItem
    isEdit: boolean
    addTrainingHistory: (e: React.FormEvent<HTMLFormElement>) => void
    handleChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void
}