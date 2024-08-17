import { useEffect, useState } from "react"
import { BaseEntry, Language } from "../../utilites/BaseEntry"
import FREntryService from "../../services/languages/FREntryService"
import { useLanguage } from "../../contexts/languageContext"
import FREntryCell from "./languages/FREntryCell"
import { FREntry } from "../../utilites/languages/FRTypes"

type EntryListProps = {
    searchString: string
}

export default function EntryList({ searchString }: EntryListProps) {
    const language = useLanguage()
    const [searchResults, setSearchResults] = useState<BaseEntry[]>([])
    useEffect(() => {
        if(searchString) {
            FREntryService.search(searchString).then(results => setSearchResults(results ?? [])).catch(console.log)
        } else {
            FREntryService.getAllEntries().then(results => setSearchResults(results ?? [])).catch(console.log)
        }
    }, [searchString])
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
                FREntryService.deleteEntry(targetId).catch(console.log)
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
                FREntryService.updateEntry(targetId, newResult as FREntry).catch(console.log)
            }
        }
    }
    const searchResultsRendered = searchResults.map((result, idx) => 
        <div key={result.Id}>
            {
                language == Language.FR &&
                <FREntryCell
                    data={result as FREntry}
                    setData={(res: FREntry | null) => setSearchResult(idx, res)}
                />
            }
        </div>
    )
    return (
        <div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <ul className="list-disc list-inside">{searchResultsRendered}</ul>
        </div>
    )
}
