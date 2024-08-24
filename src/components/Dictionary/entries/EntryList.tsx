import { BaseEntry, Language } from '../../../utilites/entries/BaseEntry'
import { useLanguage } from '../../../contexts/useLanguage'
import FREntryCell from './FREntryCell'
import { FREntry } from '../../../utilites/entries/FRTypes'
import { Fragment } from 'react/jsx-runtime'

type EntryListProps = {
    searchResults: BaseEntry[],
    setSearchResult: (idx: number, x: BaseEntry | null) => void
}

export default function EntryList({ searchResults, setSearchResult }: EntryListProps) {
    const { language } = useLanguage()
    const searchResultsRendered = searchResults.map((result, idx) => 
        <Fragment key={result.Id}>
            {
                language == Language.FR &&
                <FREntryCell
                    data={result as FREntry}
                    setData={res => setSearchResult(idx, res)}
                />
            }
        </Fragment>
    )
    return <ul>{searchResultsRendered}</ul>
}
