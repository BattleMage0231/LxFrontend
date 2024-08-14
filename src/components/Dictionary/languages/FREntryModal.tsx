import { useEffect, useState } from "react";
import { FREntry, FRForm, FRGender, FRNounEntry, FRNumber, FRVerbEntry, FRVerbTransitivity } from "../../../utilites/languages/fr-entry";
import { Class } from "../../../utilites/base-entry";
import TextInput from "../../common/TextInput";
import DropdownInput from "../../common/DropdownInput";
import ExpandableWrapper from "../../common/ExpandableWrapper";

type FREntryModalProps = {
    data: FREntry,
    setData: (res: FREntry | null) => void,
    close: () => void
}

function renderModalHeaderRow(editedData: FREntry, setEditedData: (res: FREntry) => void) {
    function changeClass(newClass: Class) {
        if(newClass != editedData.Class) {
            setEditedData({
                Id: editedData.Id,
                Class: newClass,
                Key: editedData.Key,
                Definition: editedData.Definition,
                Notes: editedData.Notes,
                Examples: editedData.Examples,
                Synonyms: editedData.Synonyms,
                OtherForms: [],
                ...(newClass in [Class.Noun, Class.Verb, Class.Adjective]) && { MainForms: {} }
            });
        }
    }
    return (
        <div id="header-section">
            <div className="mb-6">
                <TextInput 
                    name="Key"
                    id="key" 
                    defaultValue = {editedData.Key}
                    onChange={(e: string) => setEditedData({ ...editedData, Key: e })}
                />
            </div>
            <div className="mb-6">
                <TextInput 
                    name="Definition"
                    id="definition" 
                    defaultValue = {editedData.Definition}
                    onChange={(e: string) => setEditedData({ ...editedData, Definition: e })}
                />
            </div>
            <div className="mb-6">
                <TextInput 
                    name="Notes"
                    id="notes" 
                    defaultValue = {editedData.Notes}
                    onChange={(e: string) => setEditedData({ ...editedData, Notes: e })}
                />
            </div>
            <div className="mb-6">
                <DropdownInput 
                    name="Class"
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

function renderModalNounBody(editedData: FRNounEntry, setEditedData: (res: FREntry) => void) {
    return (
        <div id="body-section">
            <div className="mb-6 grid gap-6 md:grid-cols-2">
                <DropdownInput 
                    name="Gender"
                    id="main-gender"
                    choices={[{
                        displayName: "Unspecified",
                        value: ""
                    }].concat(Object.keys(FRGender).map(gender => {
                        return { displayName: gender, value: gender }
                    }))}
                    defaultValue = {editedData.MainGender}
                    onChange={e => setEditedData({ ...editedData, MainGender: e == "" ? undefined : e as FRGender })}
                />
                <DropdownInput 
                    name="Number"
                    id="main-number"
                    choices={[{
                        displayName: "Unspecified",
                        value: ""
                    }].concat(Object.keys(FRNumber).map(numb => {
                        return { displayName: numb, value: numb }
                    }))}
                    defaultValue = {editedData.MainNumber ?? ""}
                    onChange={e => setEditedData({ ...editedData, MainNumber: e == "" ? undefined : e as FRNumber })}
                />
            </div>
            <div className="mb-6">
                <ExpandableWrapper toShowMsg="❯ Show Forms" toHideMsg="❮ Hide Forms">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th>Form</th>
                                <th>Key</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.values(FRGender).flatMap(gender =>
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
                                                                if(!(gender in editedDataClone.MainForms)) {
                                                                    editedDataClone.MainForms[gender] = {} as { [id in FRNumber] : FRForm }
                                                                }
                                                                editedDataClone.MainForms[gender]![number] = {
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
                            }
                        </tbody>
                    </table>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th>Form</th>
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
                                                            editedData.OtherForms.splice(idx, 1);
                                                            setEditedData(editedDataClone)
                                                        }}
                                                    >Delete</a>
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
                                        Add Form
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </ExpandableWrapper>
            </div>
        </div>
    )
}

function renderModalVerbBody(editedData: FRVerbEntry, setEditedData: (res: FREntry) => void) {
    return (
        <div id="body-section">
            <div className="mb-6">
                <DropdownInput 
                    name="Transitivity"
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
        </div>
    )
}

export default function FREntryModal({ data, setData, close }: FREntryModalProps) {
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
                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Edit Entry</h3>
                                <div className="mt-2 text-sm ">
                                    <form>
                                        { renderModalHeaderRow(editedData, setEditedData) }
                                        { 
                                            editedData.Class == Class.Noun ? <>{renderModalNounBody(editedData as FRNounEntry, setEditedData)}</> :
                                            editedData.Class == Class.Verb ? <>{renderModalVerbBody(editedData as FRVerbEntry, setEditedData)}</> :
                                            <></>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={() => { deleteEntry(); close(); }}>Delete</button>
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto" onClick={close}>Cancel</button>
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" onClick={() => { updateEntryData(); close(); }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
