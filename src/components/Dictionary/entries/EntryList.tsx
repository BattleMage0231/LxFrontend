import { useEffect, useState } from "react"
import { BaseEntry, Language } from "../../../utilites/entries/BaseEntry"
import { useLanguage } from "../../../contexts/languageContext"
import FREntryCell from "./FREntryCell"
import { FREntry } from "../../../utilites/entries/FRTypes"
import { useEntryService } from "../../../services/apiService"
import { useTranslation } from "react-i18next"

type EntryListProps = {
    searchString: string
}

export default function EntryList({ searchString }: EntryListProps) {
    const { language } = useLanguage()
    const { t } = useTranslation()
    const entryService = useEntryService()
    const [searchResults, setSearchResults] = useState<BaseEntry[]>([])
    useEffect(() => {
        if(searchString) {
            entryService.search(searchString).then(results => setSearchResults(results ?? [])).catch(console.log)
        } else {
            entryService.getAllEntries().then(results => setSearchResults(results ?? [])).catch(console.log)
        }
    }, [searchString, entryService])
    function setSearchResult(index: number, newResult: BaseEntry | null) {
        let targetId = null
        if(newResult === null) {
            setSearchResults(searchResults.filter((res, idx) => {
                if(index == idx) {
                    targetId = res.Id!
                    return false
                }
                return true
            }));
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
            }));
            if(targetId) {
                entryService.updateEntry(targetId, newResult as FREntry).catch(console.log)
            }
        }
    }
    const searchResultsRendered = searchResults.map((result, idx) => 
        <div key={result.Id}>
            {
                language == Language.FR &&
                <FREntryCell
                    data={result as FREntry}
                    setData={res => setSearchResult(idx, res)}
                />
            }
        </div>
    )
    return (
        <div>
            <p>{t('dictionary.results')}</p>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <ul className="list-disc list-inside">{searchResultsRendered}</ul>
        </div>
    )
}
