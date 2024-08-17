import { useEffect, useState } from "react"
import { FRAdjectiveEntry, FRAdjectiveEntryNumberForms, FREntry, FRGender, FRNounEntry, FRNounEntryNumberForms, FRNumber, FRPerson, FRVerbConjugationConjugatedType, FRVerbConjugationSingleType, FRVerbConjugationType, FRVerbEntry, FRVerbEntryPersonForms, FRVerbTransitivity } from "../../../utilites/entries/FRTypes"
import { castFREntryToClass } from "../../../utilites/entries/FREntry"
import { Class } from "../../../utilites/entries/BaseEntry"
import TextInput from "../../common/TextInput"
import DropdownInput from "../../common/DropdownInput"
import ExpandableWrapper from "../../common/ExpandableWrapper"
import { useTranslation } from "react-i18next"
import { TFunction } from "i18next"

type FREntryModalProps = {
    data: FREntry,
    setData: (res: FREntry | null) => void,
    close: () => void
}

function renderModalHeaderRow(editedData: FREntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    function changeClass(newClass: Class) {
        if(newClass != editedData.Class) {
            setEditedData(castFREntryToClass(editedData, newClass));
        }
    }
    return (
        <div id="header-section">
            <div className="mb-6">
                <TextInput 
                    name={t('dictionary.entry.key')}
                    id="key" 
                    defaultValue = {editedData.Key}
                    onChange={(e: string) => setEditedData({ ...editedData, Key: e })}
                />
            </div>
            <div className="mb-6">
                <TextInput 
                    name={t('dictionary.entry.definition')}
                    id="definition" 
                    defaultValue = {editedData.Definition}
                    onChange={(e: string) => setEditedData({ ...editedData, Definition: e })}
                />
            </div>
            <div className="mb-6">
                <TextInput 
                    name={t('dictionary.entry.notes')}
                    id="notes" 
                    defaultValue = {editedData.Notes}
                    onChange={(e: string) => setEditedData({ ...editedData, Notes: e })}
                />
            </div>
            <div className="mb-6">
                <DropdownInput 
                    name={t('dictionary.entry.class')}
                    id="class"
                    choices={Object.keys(Class).map(cls => {
                        return { displayName: cls, value: cls }
                    })}
                    defaultValue = {editedData.Class}
                    onChange={e => changeClass(e as Class)}
                />
            </div>
        </div>
    )
}

function renderModalOtherFormsTable(editedData: FREntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th>{t('dictionary.entry.forms')}</th>
                </tr>
            </thead>
            <tbody>
                {
                    editedData.OtherForms.map((form, idx) => (
                        <tr key={`form-row-${idx}`}>
                            <td>
                                <div className="flex w-full">
                                    <div>
                                        <TextInput
                                            defaultValue={form?.Key}
                                            onChange={(e) => {
                                                const editedDataClone = { ...editedData }
                                                editedData.OtherForms[idx].Key = e
                                                setEditedData(editedDataClone)
                                            }}
                                        />
                                    </div>
                                    <div className="ml-auto">
                                        <a
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            href="#a"
                                            onClick={() => {
                                                const editedDataClone = { ...editedData }
                                                editedData.OtherForms.splice(idx, 1)
                                                setEditedData(editedDataClone)
                                            }}
                                        >{t('common.delete')}</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                <tr key={`form-row-new`}>
                    <td>
                        <a
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            href="#a"
                            onClick={() => {
                                const editedDataClone = { ...editedData }
                                editedData.OtherForms.push({ Key: "" })
                                setEditedData(editedDataClone)
                            }}
                        >
                            {t('dictionary.entry.addForm')}
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

function renderModalNounBody(editedData: FRNounEntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    const mainFormsRendered = Object.values(FRGender).flatMap(gender =>
        Object.values(FRNumber).map(number => {
            const form = editedData.MainForms[gender]?.[number]
            return (
                <tr key={`form-row-${gender}-${number}`}>
                    <td>{`${gender} ${number}`}</td>
                    <td>
                        <TextInput
                            defaultValue={form?.Key}
                            onChange={(e) => {
                                const editedDataClone = { ...editedData }
                                if(!e) {
                                    if(editedDataClone.MainForms[gender]?.[number]) {
                                        delete editedDataClone.MainForms[gender][number]
                                    }
                                } else {
                                    editedDataClone.MainForms[gender] ??= {} as FRNounEntryNumberForms
                                    editedDataClone.MainForms[gender][number] = {
                                        Key: e
                                    }
                                }
                                setEditedData(editedDataClone)
                            }}
                        />
                    </td>
                </tr>
            )
        })
    )
    return (
        <div id="body-section">
            <div className="mb-6 grid gap-6 md:grid-cols-2">
                <DropdownInput 
                    name={t('dictionary.entry.gender')}
                    id="main-gender"
                    choices={[{
                        displayName: t('dictionary.entry.unspecified'),
                        value: ""
                    }].concat(Object.keys(FRGender).map(gender => {
                        return { displayName: gender, value: gender }
                    }))}
                    defaultValue = {editedData.MainGender}
                    onChange={e => setEditedData({ ...editedData, MainGender: e == "" ? undefined : e as FRGender })}
                />
                <DropdownInput 
                    name={t('dictionary.entry.number')}
                    id="main-number"
                    choices={[{
                        displayName: t('dictionary.entry.unspecified'),
                        value: ""
                    }].concat(Object.keys(FRNumber).map(numb => {
                        return { displayName: numb, value: numb }
                    }))}
                    defaultValue = {editedData.MainNumber ?? ""}
                    onChange={e => setEditedData({ ...editedData, MainNumber: e == "" ? undefined : e as FRNumber })}
                />
            </div>
            <div className="mb-6">
                <ExpandableWrapper toShowMsg={`❯ ${t('dictionary.entry.showForms')}`} toHideMsg={`❮ ${t('dictionary.entry.hideForms')}`}>
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th>{t('dictionary.entry.form')}</th>
                                <th>{t('dictionary.entry.key')}</th>
                            </tr>
                        </thead>
                        <tbody>{mainFormsRendered}</tbody>
                    </table>
                    { renderModalOtherFormsTable(editedData, setEditedData, t) }
                </ExpandableWrapper>
            </div>
        </div>
    )
}

function renderModalAdjectiveBody(editedData: FRAdjectiveEntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    const mainFormsRendered = Object.values(FRGender).flatMap(gender =>
        Object.values(FRNumber).map(number => {
            const form = editedData.MainForms[gender]?.[number]
            return (
                <tr key={`form-row-${gender}-${number}`}>
                    <td>{`${gender} ${number}`}</td>
                    <td>
                        <TextInput
                            defaultValue={form?.Key}
                            onChange={(e) => {
                                const editedDataClone = { ...editedData }
                                if(!e) {
                                    if(editedDataClone.MainForms[gender]?.[number]) {
                                        delete editedDataClone.MainForms[gender][number]
                                    }
                                } else {
                                    editedDataClone.MainForms[gender] ??= {} as FRAdjectiveEntryNumberForms
                                    editedDataClone.MainForms[gender][number] = {
                                        Key: e
                                    }
                                }
                                setEditedData(editedDataClone)
                            }}
                        />
                    </td>
                </tr>
            )
        })
    )
    return (
        <div id="body-section">
            <div className="mb-6">
                <ExpandableWrapper toShowMsg={`❯ ${t('dictionary.entry.showForms')}`} toHideMsg={`❮ ${t('dictionary.entry.hideForms')}`}>
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th>{t('dictionary.entry.form')}</th>
                                <th>{t('dictionary.entry.key')}</th>
                            </tr>
                        </thead>
                        <tbody>{mainFormsRendered}</tbody>
                    </table>
                    { renderModalOtherFormsTable(editedData, setEditedData, t) }
                </ExpandableWrapper>
            </div>
        </div>
    )
}

function renderModalVerbBody(editedData: FRVerbEntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    function renderFormTable(type: FRVerbConjugationConjugatedType) {
        return Object.values(FRPerson).map(person => {
            const form = editedData.MainForms[type]?.[person]
            return (
                <tr key={`form-row-$${type}-${person}`}>
                    <td>{`${type} ${person}`}</td>
                    <td>
                        <TextInput
                            defaultValue={form?.Key}
                            onChange={(e) => {
                                const editedDataClone = { ...editedData }
                                if(!e) {
                                    if(editedDataClone.MainForms[type]?.[person]) {
                                        delete editedDataClone.MainForms[type][person]
                                    }
                                } else {
                                    editedDataClone.MainForms[type] ??= {} as FRVerbEntryPersonForms
                                    editedDataClone.MainForms[type][person] = {
                                        Key: e
                                    }
                                }
                                setEditedData(editedDataClone)
                            }}
                        />
                    </td>
                </tr>
            )
        })
    }
    const mainFormsRendered = Object.values(FRVerbConjugationType).flatMap(type => {
        const conj = editedData.MainForms[type]
        if(type in FRVerbConjugationSingleType) {
            return (
                <div className="mb-6" key={`form-${type}`}>
                    <TextInput
                        name={type}
                        defaultValue={conj?.FirstSingular?.Key}
                        onChange={(e) => {
                            const editedDataClone = { ...editedData }
                            if(!e) {
                                if(editedDataClone.MainForms[type]) {
                                    delete editedDataClone.MainForms[type]
                                }
                            } else {
                                editedDataClone.MainForms[type] ??= {} as FRVerbEntryPersonForms
                                editedDataClone.MainForms[type][FRPerson.FirstSingular] = { 
                                    Key: e
                                }
                            }
                            setEditedData(editedDataClone)
                        }}
                    />
                </div>
            )
        } else {
            return (
                <div key={`form-${type}`}>
                    <label htmlFor={`form-table-${type}`} className="block mb-2 text-sm font-medium">{type}</label>
                    <table className="table-auto" key={`form-table-${type}`}>
                        <thead>
                            <tr>
                                <th>{t('dictionary.entry.form')}</th>
                                <th>{t('dictionary.entry.key')}</th>
                            </tr>
                        </thead>
                        <tbody>{renderFormTable(type as FRVerbConjugationConjugatedType)}</tbody>
                    </table>
                </div>
            )
        }
    })
    return (
        <div id="body-section">
            <div className="mb-6">
                <DropdownInput 
                    name={t('dictionary.entry.transitivity')}
                    id="transitivity"
                    choices={[{
                        displayName: "Unspecified",
                        value: ""
                    }].concat(Object.keys(FRVerbTransitivity).map(trans => {
                        return { displayName: trans, value: trans }
                    }))}
                    defaultValue = {editedData.Transitivity ?? ""}
                    onChange={e => setEditedData({ ...editedData, Transitivity: e == "" ? undefined : e as FRVerbTransitivity })}
                />
            </div>
            <ExpandableWrapper toShowMsg={`❯ ${t('dictionary.entry.showForms')}`} toHideMsg={`❮ ${t('dictionary.entry.hideForms')}`}>
                {mainFormsRendered}
                { renderModalOtherFormsTable(editedData, setEditedData, t) }
            </ExpandableWrapper>
        </div>
    )
}

function renderModalOtherBody(editedData: FREntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    return (
        <div id="body-section">
            <ExpandableWrapper toShowMsg={`❯ ${t('dictionary.entry.showForms')}`} toHideMsg={`❮ ${t('dictionary.entry.hideForms')}`}>
                { renderModalOtherFormsTable(editedData, setEditedData, t) }
            </ExpandableWrapper>
        </div>
    )
}

export default function FREntryModal({ data, setData, close }: FREntryModalProps) {
    const { t } = useTranslation()
    const [editedData, setEditedData] = useState(JSON.parse(JSON.stringify(data)) as FREntry);
    function deleteEntry() {
        setData(null);
    }
    function updateEntryData() {
        setData(editedData);
    }
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'initial';
        };
    }, []);
    return (
        <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{t('dictionary.entry.editEntry')}</h3>
                                <div className="mt-2 text-sm ">
                                    <form>
                                        { renderModalHeaderRow(editedData, setEditedData, t) }
                                        { 
                                            editedData.Class == Class.Noun ? <>{renderModalNounBody(editedData, setEditedData, t)}</> :
                                            editedData.Class == Class.Adjective ? <>{renderModalAdjectiveBody(editedData, setEditedData, t)}</> :
                                            editedData.Class == Class.Verb ? <>{renderModalVerbBody(editedData, setEditedData, t)}</> :
                                            <>{renderModalOtherBody(editedData, setEditedData, t)}</>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={() => { deleteEntry(); close(); }}>{t('common.delete')}</button>
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto" onClick={close}>{t('common.cancel')}</button>
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" onClick={() => { updateEntryData(); close(); }}>{t('common.save')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
