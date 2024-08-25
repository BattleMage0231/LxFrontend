import { useParams } from 'react-router-dom'
import SearchBar from './SearchBar'
import EntryList from './entries/EntryList'
import { useEntryService } from '../../services/apiService'
import { useEffect, useState } from 'react'
import { BaseEntry } from '../../utilites/entries/BaseEntry'
import CreateEntryButton from './entries/CreateEntryButton'

export default function Dictionary() {
    const params = useParams()
    const entryService = useEntryService()
    const [searchResults, setSearchResults] = useState<BaseEntry[]>([])
    useEffect(() => {
        if(params.key) {
            entryService.search(params.key).then(results => setSearchResults(results ?? [])).catch(console.log)
        } else {
            entryService.getAllEntries().then(results => setSearchResults(results ?? [])).catch(console.log)
        }
    }, [params, entryService])
    function setSearchResult(index: number, newResult: BaseEntry | null) {
        let targetId = null
        if(newResult === null) {
            setSearchResults(searchResults.filter((res, idx) => {
                if(index == idx) {
                    targetId = res.Id!
                    return false
                }
                return true
            }))
            if(targetId) {
                entryService.deleteEntry(targetId).catch(console.log)
            }
        } else {
            setSearchResults(searchResults.map((res, idx) => {
                if(index == idx) {
                    targetId = res.Id!
                    return newResult
                } else {
                    return res
                }
            }))
            if(targetId) {
                entryService.updateEntry(targetId, newResult).catch(console.log)
            }
        }
    }
    return (
        <div className="mx-auto">
            <div className="bg-base-200 px-4 pt-5">
                <div className="flex flex-col sm:flex-row">
                    <div className="w-full px-5 z-40">
                        <SearchBar />
                    </div>
                    <div className="w-full sm:w-auto mt-4 sm:mt-auto px-5">
                        <CreateEntryButton />
                    </div>
                </div>
                <EntryList searchResults={searchResults} setSearchResult={setSearchResult} />
            </div>
        </div>
    )
}
