import { useEffect, useState } from "react";
import { Class } from "../../../utilites/base-entry";
import { FRAdjectiveEntry, FREntry, FRNounEntry, FRVerbEntry, getFRFormCode, getFRTypeCode } from "../../../utilites/languages/fr-entry";
import FREntryModal from "./FREntryModal";

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

function renderCellFooterRow(entry: FREntry) {
    return (
        <div>
            <ul>
                {entry.Examples.map(ex => <li key={ex}>{ex}</li>)}
            </ul>
            {entry.Synonyms.length > 0 && <p>Synonyms: {entry.Synonyms.join(", ")}</p>}
            {entry.Notes && <p>{entry.Notes}</p>}
        </div>
    )
}

function renderNounAdjectiveBody(entry: FRNounEntry | FRAdjectiveEntry) {
    const forms = entry.Forms.map((form, idx) => (
        <li key={idx}>
            <p>
                {(form.Gender || form.Number) && <span>({getFRFormCode(form.Gender, form.Number)})</span>}
                {` ${form.Key}`}
            </p>
            {form.Notes && <p>{form.Notes}</p>}
        </li>
    ))
    return (
        <div>
            {forms.length > 0 && <h3>Forms:</h3>}
            <ul>{forms}</ul>
        </div>
    )
}

function renderVerbBody(entry: FRVerbEntry) {
    const formsRendered = entry.Forms.map((form, idx) => (
        <li key={idx}>
            <p>
                {(form.Person || form.Type) && <span>{`(${form.Person} ${form.Type})`}</span>}
                {` ${form.Key}`}
            </p>
            {form.Notes && <p>{form.Notes}</p>}
        </li>
    ))
    return (
        <div>
            {formsRendered.length > 0 && <h3>Forms:</h3>}
            <ul>{formsRendered}</ul>
        </div>
    )
}

function renderOtherBody(entry: FREntry) {
    const formsRendered = entry.Forms.map((form, idx) => (
        <li key={idx}>
            <p>${form.Key}</p>
            {form.Notes && <p>{form.Notes}</p>}
        </li>
    ));
    return (
        <div>
            {formsRendered.length > 0 && <h3>Forms:</h3>}
            <ul>{formsRendered}</ul>
        </div>
    )
}

export default function FREntryCell({ data, setData }: FREntryCellProps) {
    const [isModalShown, setIsModalShown] = useState(false);
    const headerRow = renderCellHeaderRow(data);
    const footerRow = renderCellFooterRow(data);
    useEffect(() => {
        document.body.style.overflow = isModalShown ? 'hidden' : 'unset';
    }, [isModalShown]);
    return (
        <div>
            {headerRow}
            {
                data.Class == Class.Noun ? <>{renderNounAdjectiveBody(data as FRNounEntry)}</> : 
                data.Class == Class.Verb ? <>{renderVerbBody(data as FRVerbEntry)}</> : 
                data.Class == Class.Adjective ? <>{renderNounAdjectiveBody(data as FRAdjectiveEntry)}</> :
                <>{renderOtherBody(data)}</>
            }
            {footerRow}
            <button 
                type="button" 
                className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={() => setIsModalShown(true)}>Edit</button>
            { isModalShown && 
                <FREntryModal 
                    data={data}
                    close={() => setIsModalShown(false)} 
                    setData={setData}
                /> 
            }
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
    )
}
