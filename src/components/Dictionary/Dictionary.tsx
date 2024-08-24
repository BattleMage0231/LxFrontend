import { useParams } from 'react-router-dom'
import SearchBar from './SearchBar'
import EntryList from './entries/EntryList'
import { useTranslation } from 'react-i18next'
import { useEntryService } from '../../services/apiService'
import { useEffect, useState } from 'react'
import { BaseEntry } from '../../utilites/entries/BaseEntry'

export default function Dictionary() {
    const params = useParams()
    const { t } = useTranslation()
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
        <div className="mx-auto px-20">
            <div className="bg-base-200 px-4 pt-5">
                <div className="relative flex z-50">
                    <div className="w-2/3 absolute left-1/2 -translate-x-1/2 flex justify-center">
                        <SearchBar />
                    </div>
                    <div className="ml-auto">
                        <button className="btn btn-primary" onClick={() => {}}>{t('dictionary.create')}</button>
                    </div>
                </div>
                <EntryList searchResults={searchResults} setSearchResult={setSearchResult} />
            </div>
        </div>
    )
}
