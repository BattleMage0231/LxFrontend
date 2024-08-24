import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../../contexts/useLanguage'
import { BaseEntry, Language } from '../../../utilites/entries/BaseEntry'
import FREntryModal from './FREntryModal'
import createDefaultFREntry, { FREntry } from '../../../utilites/entries/FREntry'
import { useEntryService } from '../../../services/apiService'

export default function CreateEntryButton() {
    const { t } = useTranslation()
    const { language } = useLanguage()
    const entryService = useEntryService()
    const [isModalShown, setIsModalShown] = useState(false)
    const [data, setData] = useState(getDefaultEntry(language))
    useEffect(() => setData(getDefaultEntry(language)), [language])
    function getDefaultEntry(language: Language): BaseEntry {
        switch(language) {
            case Language.FR:
                return createDefaultFREntry()
        }
    }
    function openModal() {
        setData(getDefaultEntry(language))
        setIsModalShown(true)
    }
    function saveData(data: BaseEntry | null) {
        if(data) {
            entryService.createEntry(data).catch(console.log)
        }
    }
    return (
        <>
            <button className="btn btn-primary" onClick={openModal}>{t('dictionary.create')}</button>
            { isModalShown && createPortal(
                <>
                    {
                        language == Language.FR &&
                        <FREntryModal 
                            data={data as FREntry}
                            close={() => setIsModalShown(false)} 
                            setData={saveData}
                        />
                    }
                </>,
                document.body
            )}
        </>
    )
}
