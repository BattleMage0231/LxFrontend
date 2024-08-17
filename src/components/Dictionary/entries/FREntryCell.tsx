import { ReactElement, useState } from "react"
import { Class } from "../../../utilites/entries/BaseEntry"
import { FRAdjectiveEntry, FREntry, FRGender, FRNounEntry, FRNumber, FRPerson, FRVerbConjugationType, FRVerbEntry } from "../../../utilites/entries/FRTypes"
import { getFRNounAdjectiveCode, getFRTypeCode } from "../../../utilites/entries/FREntry"
import FREntryModal from "./FREntryModal"
import { useTranslation } from "react-i18next"
import { TFunction } from "i18next"

type FREntryCellProps = {
    data: FREntry,
    setData: (res: FREntry | null) => void
}

function renderCellHeaderRow(entry: FREntry) {
    const typeId = getFRTypeCode(entry);
    return (
        <div className="flow-root">
            <h2 className="float-left">{entry.Key} { typeId && <span>{`(${typeId})`}</span>}</h2>
            { entry.Definition && <p className="float-right">{entry.Definition}</p>}
        </div>
    )
}

function renderCellFooterRow(entry: FREntry, t: TFunction) {
    return (
        <div>
            <ul>
                {entry.Examples.map(ex => <li key={ex}>{ex}</li>)}
            </ul>
            {entry.Synonyms.length > 0 && <p>{t('dictionary.entry.synonyms')}: {entry.Synonyms.join(", ")}</p>}
            {entry.Notes && <p>{entry.Notes}</p>}
        </div>
    )
}

function renderNounAdjectiveBody(entry: FRNounEntry | FRAdjectiveEntry, t: TFunction) {
    const mainForms = entry.MainForms
    const otherForms = entry.OtherForms
    const mainFormsRendered = Object.keys(FRGender).flatMap(gender =>
        Object.keys(FRNumber).reduce<ReactElement[]>((acc, number) => {
            const form = mainForms[gender as FRGender]?.[number as FRNumber]
            if(form) {
                acc.push(
                    <li key={`form-${gender}-${number}`}>
                        <p>
                            <span>{`(${getFRNounAdjectiveCode(gender as FRGender, number as FRNumber)}) `}</span>
                            {`${form.Key}`}
                        </p>
                        {form.Notes && <p>{form.Notes}</p>}
                    </li>
                )
            }
            return acc
        }, [])
    )
    const otherFormsRendered = otherForms.map((form, idx) => (
        <li key={`form-${idx}`}>
            <p>{form.Key}</p>
            {form.Notes && <p>{form.Notes}</p>}
        </li>
    ))
    return (
        <div>
            {(mainFormsRendered.length > 0 || otherFormsRendered.length > 0) && <h3>{t('dictionary.entry.forms')}</h3>}
            <ul>{mainFormsRendered}</ul>
            <ul>{otherFormsRendered}</ul>
        </div>
    )
}

function renderVerbBody(entry: FRVerbEntry, t: TFunction) {
    const mainForms = entry.MainForms
    const otherForms = entry.OtherForms
    const mainFormsRendered = Object.keys(FRVerbConjugationType).flatMap(type =>
        Object.keys(FRPerson).reduce<ReactElement[]>((acc, person) => {
            const form = mainForms[type as FRVerbConjugationType]?.[person as FRPerson]
            if(form) {
                acc.push(
                    <li key={`form-${type}-${person}`}>
                        <p>
                            <span>{`(${type} ${person}) `}</span>
                            {`${form.Key}`}
                        </p>
                        {form.Notes && <p>{form.Notes}</p>}
                    </li>
                )
            }
            return acc
        }, [])
    )
    const otherFormsRendered = otherForms.map((form, idx) => (
        <li key={`form-${idx}`}>
            <p>{form.Key}</p>
            {form.Notes && <p>{form.Notes}</p>}
        </li>
    ))
    return (
        <div>
            {(mainFormsRendered.length > 0 || otherFormsRendered.length > 0) && <h3>{t('dictionary.entry.forms')}</h3>}
            <ul>{mainFormsRendered}</ul>
            <ul>{otherFormsRendered}</ul>
        </div>
    )
}

function renderOtherBody(entry: FREntry, t: TFunction) {
    const formsRendered = entry.OtherForms.map((form, idx) => (
        <li key={`form-${idx}`}>
            <p>{form.Key}</p>
            {form.Notes && <p>{form.Notes}</p>}
        </li>
    ))
    return (
        <div>
            {formsRendered.length > 0 && <h3>{t('dictionary.entry.forms')}</h3>}
            <ul>{formsRendered}</ul>
        </div>
    )
}

export default function FREntryCell({ data, setData }: FREntryCellProps) {
    const { t } = useTranslation()
    const [isModalShown, setIsModalShown] = useState(false)
    const headerRow = renderCellHeaderRow(data)
    const footerRow = renderCellFooterRow(data, t)
    return (
        <div>
            {headerRow}
            {
                data.Class == Class.Noun ? <>{renderNounAdjectiveBody(data, t)}</> : 
                data.Class == Class.Verb ? <>{renderVerbBody(data, t)}</> : 
                data.Class == Class.Adjective ? <>{renderNounAdjectiveBody(data, t)}</> :
                <>{renderOtherBody(data, t)}</>
            }
            {footerRow}
            <button 
                type="button" 
                className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={() => setIsModalShown(true)}
            >{t('common.edit')}</button>
            { isModalShown && 
                <FREntryModal 
                    data={data}
                    close={() => setIsModalShown(false)} 
                    setData={setData}
                /> 
            }
            <hr className="h-px my-8 bg-gray-200 border-0 bg-gray-700" />
        </div>
    )
}
