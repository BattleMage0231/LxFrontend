import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { FRAdjectiveEntry, FREntry, FRGender, FRNounEntry, FRNounEntryForms, FRNounEntryNumberForms, FRNumber, FRPerson, FRVerbConjugationConjugatedType, FRVerbConjugationSingleType, FRVerbConjugationType, FRVerbEntry, FRVerbEntryForms, FRVerbEntryPersonForms, FRVerbTransitivity } from "../../../utilites/entries/FRTypes"
import { castFREntryToClass } from "../../../utilites/entries/FREntry"
import { Class } from "../../../utilites/entries/BaseEntry"
import TextInput from "../../common/TextInput"
import DropdownInput from "../../common/DropdownInput"
import { useTranslation } from "react-i18next"
import { TFunction } from "i18next"
import TextArea from "../../common/TextArea"
import Collapsible from "../../common/Collapsible"

type FREntryModalProps = {
    data: FREntry,
    setData: (res: FREntry | null) => void,
    close: () => void
}

function renderHeader(editedData: FREntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    const classOptionsRendered = Object.values(Class).map(cls => 
        <option key={cls} value={cls}>{t(`class.${cls}`)}</option>
    )
    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <TextInput
                    label={t('dictionary.entry.key')}
                    defaultValue={editedData.Key}
                    onChange={e => setEditedData({ ...editedData, Key: e.trim() })}
                />
                <DropdownInput
                    label={t('dictionary.entry.class')}
                    defaultValue={editedData.Class}
                    onChange={e => setEditedData(castFREntryToClass(editedData, e as Class))}
                >
                    {classOptionsRendered}
                </DropdownInput>
            </div>
            <TextArea
                label={t('dictionary.entry.definition')}
                defaultValue={editedData.Definition}
                onChange={e => setEditedData({ ...editedData, Definition: e.trim() })}
            />
        </>
    )
}

function renderOtherFormsTable(editedData: FREntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    function deleteOtherRow(idx: number) {
        const updatedForms = editedData.OtherForms.filter((_, i) => i != idx)
        setEditedData({ ...editedData, OtherForms: updatedForms })
    }
    function addOtherRow() {
        setEditedData({ ...editedData, OtherForms: [...editedData.OtherForms, { Key: '', tempId: uuidv4() }] })
    }
    function editOtherRow(idx: number, newKey: string) {
        const updatedForms = editedData.OtherForms.map((form, i) => ({
            ...form, Key: i == idx ? newKey : form.Key
        }))
        setEditedData({ ...editedData, OtherForms: updatedForms })
    }
    const otherFormsRendered = editedData.OtherForms.map((form, idx) => (
        <tr key={form.tempId}>
            <td>
                <TextInput
                    defaultValue={form.Key}
                    onChange={e => editOtherRow(idx, e.trim())}
                />
            </td>
            <td className="text-right">
                <button className="btn btn-error" onClick={() => deleteOtherRow(idx)}>
                    {t('common.delete')}
                </button>
            </td>
        </tr>
    )) 
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>{t('dictionary.entry.forms')}</th>
                </tr>
            </thead>
            <tbody>
                {otherFormsRendered}
                <tr>
                    <td>
                        <button className="btn btn-success" onClick={addOtherRow}>
                            {t('dictionary.entry.addForm')}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

function renderNounAdjectiveFormsTable(editedData: FRNounEntry | FRAdjectiveEntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    function deleteRow(gender: FRGender, number: FRNumber) {
        const mainForms = JSON.parse(JSON.stringify(editedData.MainForms)) as FRNounEntryForms
        if(mainForms[gender]?.[number]) {
            delete mainForms[gender][number]
            setEditedData({ ...editedData, MainForms: mainForms })
        }
    }
    function updateRow(gender: FRGender, number: FRNumber, newKey: string) {
        const mainForms = JSON.parse(JSON.stringify(editedData.MainForms)) as FRNounEntryForms
        mainForms[gender] ??= {} as FRNounEntryNumberForms
        mainForms[gender][number] = { Key: newKey }
        setEditedData({ ...editedData, MainForms: mainForms })
    }
    const mainFormsRendered = Object.values(FRGender).flatMap(gender => {
        const displayGender = t(`gender.${gender}`)
        return Object.values(FRNumber).map(number => {
            const displayNumber = t(`number.${number}`)
            const form = editedData.MainForms[gender]?.[number]
            return (
                <tr key={`${gender}-${number}`}>
                    <td>{`${displayGender} ${displayNumber}`}</td>
                    <td>
                        <TextInput
                            defaultValue={form?.Key}
                            onChange={e => e ? updateRow(gender, number, e) : deleteRow(gender, number)}
                        />
                    </td>
                </tr>
            )
        })
    })
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>{t('dictionary.entry.form')}</th>
                    <th>{t('dictionary.entry.key')}</th>
                </tr>
            </thead>
            <tbody>{mainFormsRendered}</tbody>
        </table>
    )
}

function renderNounBody(editedData: FRNounEntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    const genderOptions = Object.values(FRGender).map(gender => 
        <option key={gender} value={gender}>{t(`gender.${gender}`)}</option>
    )
    const numberOptions = Object.values(FRNumber).map(number => 
        <option key={number} value={number}>{t(`number.${number}`)}</option>
    )
    const mainFormsRendered = renderNounAdjectiveFormsTable(editedData, setEditedData, t)
    const otherFormsRendered = renderOtherFormsTable(editedData, setEditedData, t)
    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <DropdownInput
                    label={t('dictionary.entry.gender')}
                    defaultValue={editedData.MainGender ?? 'Unspecified'}
                    onChange={e => setEditedData({ ...editedData, MainGender: e == 'Unspecified' ? undefined : e as FRGender})}
                >
                    <option value="Unspecified">{t('dictionary.entry.unspecified')}</option>
                    {genderOptions}
                </DropdownInput>
                <DropdownInput
                    label={t('dictionary.entry.number')}
                    defaultValue={editedData.MainNumber ?? 'Unspecified'}
                    onChange={e => setEditedData({ ...editedData, MainNumber: e == 'Unspecified' ? undefined : e as FRNumber})}
                >
                    <option value="Unspecified">{t('dictionary.entry.unspecified')}</option>
                    {numberOptions}
                </DropdownInput>
            </div>
            <Collapsible
                toShowMsg={t('dictionary.entry.showForms')}
                toHideMsg={t('dictionary.entry.hideForms')}
            >            
                {mainFormsRendered}
                {otherFormsRendered}
            </Collapsible>
        </>
    )
}

function renderAdjectiveBody(editedData: FRAdjectiveEntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    const mainFormsRendered = renderNounAdjectiveFormsTable(editedData, setEditedData, t)
    const otherFormsRendered = renderOtherFormsTable(editedData, setEditedData, t)
    return (
        <Collapsible
            toShowMsg={t('dictionary.entry.showForms')}
            toHideMsg={t('dictionary.entry.hideForms')}
        >            
            {mainFormsRendered}
            {otherFormsRendered}
        </Collapsible>
    )
}

function renderVerbBody(editedData: FRVerbEntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    const transitivityOptions = Object.values(FRVerbTransitivity).map(trans => 
        <option key={trans} value={trans}>{t(`transitivity.${trans}`)}</option>
    )
    function deleteRow(type: FRVerbConjugationType, person: FRPerson) {
        const mainForms = JSON.parse(JSON.stringify(editedData.MainForms)) as FRVerbEntryForms
        if(mainForms[type]?.[person]) {
            delete mainForms[type][person]
            setEditedData({ ...editedData, MainForms: mainForms })
        }
    }
    function updateRow(type: FRVerbConjugationType, person: FRPerson, newKey: string) {
        const mainForms = JSON.parse(JSON.stringify(editedData.MainForms)) as FRVerbEntryForms
        mainForms[type] ??= {} as FRVerbEntryPersonForms
        mainForms[type][person] = { Key: newKey }
        setEditedData({ ...editedData, MainForms: mainForms })
    }
    function renderFormTable(type: FRVerbConjugationConjugatedType) {
        const displayType = t(`conjugationType.${type}`)
        const rows = Object.values(FRPerson).map(person => {
            const displayPerson = t(`person.${person}`)
            const form = editedData.MainForms[type]?.[person]
            return (
                <tr key={person}>
                    <td>{displayPerson}</td>
                    <td>
                        <TextInput
                            defaultValue={form?.Key}
                            onChange={e => e ? updateRow(type, person, e) : deleteRow(type, person)}
                        />
                    </td>
                </tr>
            )
        })
        return (
            <div key={type}>
                <h2>{displayType}</h2>
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>{t('dictionary.entry.form')}</th>
                            <th>{t('dictionary.entry.key')}</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        )
    }
    const singleFormsRendered = Object.values(FRVerbConjugationSingleType).map(type => {
        const displayType = t(`conjugationType.${type}`)
        const conj = editedData.MainForms[type]?.FirstSingular
        return (
            <TextInput
                key={type}
                label={displayType}
                defaultValue={conj?.Key}
                onChange={e => e ? updateRow(type, FRPerson.FirstSingular, e) : deleteRow(type, FRPerson.FirstSingular)}
            />
        )
    })
    const conjugatedFormsRendered = Object.values(FRVerbConjugationConjugatedType).map(type => renderFormTable(type))
    const otherFormsRendered = renderOtherFormsTable(editedData, setEditedData, t)
    return (
        <>
            <DropdownInput
                label={t('dictionary.entry.transitivity')}
                defaultValue={editedData.Transitivity ?? 'Unspecified'}
                onChange={e => setEditedData({ ...editedData, Transitivity: e == 'Unspecified' ? undefined : e as FRVerbTransitivity})}
            >
                <option value="Unspecified">{t('dictionary.entry.unspecified')}</option>
                {transitivityOptions}
            </DropdownInput>
            <Collapsible
                toShowMsg={t('dictionary.entry.showForms')}
                toHideMsg={t('dictionary.entry.hideForms')}
            >
                {singleFormsRendered}
                <div className="grid grid-cols-2 gap-20">{conjugatedFormsRendered}</div>
                {otherFormsRendered}
            </Collapsible>
        </>
    )
}

function renderOtherBody(editedData: FREntry, setEditedData: (res: FREntry) => void, t: TFunction) {
    const otherFormsRendered = renderOtherFormsTable(editedData, setEditedData, t)
    return (
        <Collapsible
            toShowMsg={t('dictionary.entry.showForms')}
            toHideMsg={t('dictionary.entry.hideForms')}
        >            
            {otherFormsRendered}
        </Collapsible>
    )
}

export default function FREntryModal({ data, setData, close }: FREntryModalProps) {
    const { t } = useTranslation()
    const [editedData, setEditedData] = useState(prepareData(data))
    function prepareData(data: FREntry): FREntry {
        const dataClone = JSON.parse(JSON.stringify(data)) as FREntry
        dataClone.OtherForms.forEach(form => {
            form.tempId = uuidv4()
        })
        return dataClone
    }
    function handleDelete() {
        setData(null)
        close()
    }
    function handleSave() {
        editedData.OtherForms.forEach(form => {
            delete form.tempId
        })
        setData(editedData)
        close()
    }
    const header = renderHeader(editedData, setEditedData, t)
    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-4xl">
                <h2 className="text-lg">{t('dictionary.entry.editEntry')}</h2>
                { header }
                { 
                    editedData.Class == Class.Noun ? renderNounBody(editedData, setEditedData, t) :
                    editedData.Class == Class.Adjective ? renderAdjectiveBody(editedData, setEditedData, t) :
                    editedData.Class == Class.Verb ? renderVerbBody(editedData, setEditedData, t) :
                    renderOtherBody(editedData, setEditedData, t)
                }
                <div className="modal-action">
                    <button className="btn btn-error" onClick={handleDelete}>
                        {t('common.delete')}
                    </button>
                    <button className="btn btn-neutral" onClick={close}>
                        {t('common.cancel')}
                    </button>
                    <button className="btn btn-success" onClick={handleSave}>
                        {t('common.save')}
                    </button>
                </div>
            </div>
        </dialog>
    )
}
