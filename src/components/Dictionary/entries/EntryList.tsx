import { BaseEntry, Language } from "../../../utilites/entries/BaseEntry"
import { useLanguage } from "../../../contexts/useLanguage"
import FREntryCell from "./FREntryCell"
import { FREntry } from "../../../utilites/entries/FRTypes"
import { useTranslation } from "react-i18next"

type EntryListProps = {
    searchResults: BaseEntry[],
    setSearchResult: (idx: number, x: BaseEntry | null) => void
}

export default function EntryList({ searchResults, setSearchResult }: EntryListProps) {
    const { language } = useLanguage()
    const { t } = useTranslation()
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
