import { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import Collapsible from '../../common/Collapsible'
import FREntryModal from './FREntryModal'
import { Class } from '../../../utilites/entries/BaseEntry'
import { FRAdjectiveEntry, FREntry, FRGender, FRNounEntry, FRNumber, FRPerson, FRVerbConjugationType, FRVerbEntry } from '../../../utilites/entries/FRTypes'
import { getFRNounAdjectiveCode, getFRTypeCode } from '../../../utilites/entries/FREntry'
import { createPortal } from 'react-dom'

type FREntryCellProps = {
    data: FREntry,
    setData: (res: FREntry | null) => void
}

function renderCellHeader(entry: FREntry, t: TFunction, handleEdit: () => void) {
    const examplesRendered = entry.Examples.map((ex, idx) => <li key={idx}>{ex}</li>)
    const typeId = getFRTypeCode(entry)
    return (
        <>
            <div>
                <h2 className="float-left text-xl">{entry.Key} { typeId && <span>{`(${typeId})`}</span>}</h2>
                <button
                    className="btn btn-sm btn-secondary float-right"
                    onClick={handleEdit}
                >
                    {t('common.edit')}
                </button>
            </div>
            {
                entry.Definition &&
                <p>{entry.Definition}</p>
            }
            {
                entry.Examples.length > 0 &&
                <ul className="list-disc pl-5">{examplesRendered}</ul>
            }
            {
                entry.Synonyms.length > 0 &&
                <p>{t('dictionary.entry.synonyms')}: {entry.Synonyms.join(", ")}</p>
            }
        </>
    )
}

function renderNounAdjectiveBody(entry: FRNounEntry | FRAdjectiveEntry, t: TFunction) {
    const mainFormsRendered = Object.keys(FRGender).flatMap(gender =>
        Object.keys(FRNumber).reduce<ReactElement[]>((acc, number) => {
            const form = entry.MainForms[gender as FRGender]?.[number as FRNumber]
            if(form) {
                acc.push(
                    <li key={`${gender}-${number}`}>
                        <p>
                            <span>{`(${getFRNounAdjectiveCode(gender as FRGender, number as FRNumber)}) `}</span>
                            {form.Key}
                        </p>
                    </li>
                )
            }
            return acc
        }, [])
    )
    const otherFormsRendered = entry.OtherForms.map((form, idx) => (
        <li key={idx}>
            <p>{form.Key}</p>
        </li>
    ))
    const hasForms = mainFormsRendered.length > 0 || otherFormsRendered.length > 0
    return (
        <>
            {
                hasForms &&
                <Collapsible
                    toShowMsg={t('dictionary.entry.showForms')}
                    toHideMsg={t('dictionary.entry.hideForms')}
                >
                    <ul>{mainFormsRendered}</ul>
                    <ul>{otherFormsRendered}</ul>
                </Collapsible>
            }
        </>
    )
}

function renderVerbBody(entry: FRVerbEntry, t: TFunction) {
    const mainFormsRendered = Object.keys(FRVerbConjugationType).flatMap(type =>
        Object.keys(FRPerson).reduce<ReactElement[]>((acc, person) => {
            const form = entry.MainForms[type as FRVerbConjugationType]?.[person as FRPerson]
            if(form) {
                acc.push(
                    <li key={`${type}-${person}`}>
                        <p>
                            <span>{`(${type} ${person}) `}</span>
                            {form.Key}
                        </p>
                    </li>
                )
            }
            return acc
        }, [])
    )
    const otherFormsRendered = entry.OtherForms.map((form, idx) => (
        <li key={idx}>
            <p>{form.Key}</p>
        </li>
    ))
    const hasForms = mainFormsRendered.length > 0 || otherFormsRendered.length > 0
    return (
        <>
            {
                hasForms &&
                <Collapsible
                    toShowMsg={t('dictionary.entry.showForms')}
                    toHideMsg={t('dictionary.entry.hideForms')}
                >
                    <ul>{mainFormsRendered}</ul>
                    <ul>{otherFormsRendered}</ul>
                </Collapsible>
            }
        </>
    )
}

function renderOtherBody(entry: FREntry, t: TFunction) {
    const formsRendered = entry.OtherForms.map((form, idx) => (
        <li key={idx}>
            <p>{form.Key}</p>
        </li>
    ))
    return (
        <>
            {
                formsRendered.length > 0 &&
                <Collapsible
                    toShowMsg={t('dictionary.entry.showForms')}
                    toHideMsg={t('dictionary.entry.hideForms')}
                >
                    <ul>{formsRendered}</ul>
                </Collapsible>
            }
        </>
    )
}

export default function FREntryCell({ data, setData }: FREntryCellProps) {
    const { t } = useTranslation()
    const [isModalShown, setIsModalShown] = useState(false)
    const header = renderCellHeader(data, t, () => setIsModalShown(true))
    return (
        <div className="card px-5 pt-3">
            {header}
            {
                data.Class == Class.Noun ? <>{renderNounAdjectiveBody(data, t)}</> : 
                data.Class == Class.Verb ? <>{renderVerbBody(data, t)}</> : 
                data.Class == Class.Adjective ? <>{renderNounAdjectiveBody(data, t)}</> :
                <>{renderOtherBody(data, t)}</>
            }
            { isModalShown && createPortal(
                <FREntryModal 
                    data={data}
                    close={() => setIsModalShown(false)} 
                    setData={setData}
                />,
                document.body
            )}
        </div>
    )
}
