import { useEffect, useState } from "react";
import { BaseEntry } from "../../utilites/base-entry";
import FREntryService from "../../services/languages/fr-entry-service";
import Entry from "./Entry";

type EntryListProps = {
    key: string
}

export default function EntryList({ key }: EntryListProps) {
    const [searchResults, setSearchResults] = useState<BaseEntry[]>([]);
    useEffect(() => {
        performSearch(key).catch(err => console.log(err));
    }, [key]);
    function setSearchResult(index: number, newResult: BaseEntry) {
        setSearchResults(searchResults.map((result, idx) => {
            return index == idx ? newResult : result;
        }));
    }
    async function performSearch(key: string) {
        console.log(key);
        const results = await FREntryService.getAllEntries();
        setSearchResults(results ?? []);
    }
    const searchResultsRendered = searchResults.map((result, idx) => 
        <Entry 
            data={result} 
            setData={(res: BaseEntry) => setSearchResult(idx, res)}
        />
    );
    return (
        <>
            <h2>Results:</h2>
            <ul>{searchResultsRendered}</ul>
            <p>Child has rerendered? {Math.random()}</p>
        </>
    );
}
