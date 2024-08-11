import { useState } from "react";
import { FREntry } from "../../../utilites/languages/fr-entry";

type FREntryModalProps = {
    data: FREntry,
    setData: (res: FREntry | null) => void,
    close: () => void
}

function renderModalHeaderRow(editedData: FREntry, setEditedData: (res: FREntry) => void) {
    return (
        <>
            <div className="mb-6">
                <label htmlFor="key" className="block mb-2 text-sm font-medium">Key</label>
                <input 
                    type="text" 
                    id="key" 
                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    defaultValue={editedData.Key} 
                    onChange={e => setEditedData({ ...editedData, Key: e.target.value })}
                />
            </div>
            <div className="mb-6">
                <label htmlFor="definition" className="block mb-2 text-sm font-medium">Definition</label>
                <input 
                    type="text" 
                    id="definition" 
                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    defaultValue={editedData.Definition} 
                    onChange={e => setEditedData({ ...editedData, Definition: e.target.value })}
                />
            </div>
        </>
    )
}

export default function FREntryModal({ data, setData, close }: FREntryModalProps) {
    const [editedData, setEditedData] = useState(data);
    function deleteEntry() {
        setData(null);
    }
    function updateEntryData() {
        setData(editedData);
    }
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
    );
}
