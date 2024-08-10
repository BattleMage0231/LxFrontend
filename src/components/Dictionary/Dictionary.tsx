import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context";
import FREntryService from "../../services/languages/fr-entry-service";
import { BaseEntry } from "../../utilites/base-entry";
import SearchBar from "./SearchBar";
import Entry from "./Entry";

export default function Dictionary() {
    const params = useParams();
    const navigate = useNavigate();
    const language = useLanguage();
    const [searchResults, setSearchResults] = useState<BaseEntry[]>([]);
    useEffect(() => {
        performSearch(params.key ?? "");
    }, [params]);
    function setSearchResult(index: number, newResult: BaseEntry) {
        setSearchResults(searchResults.map((result, idx) => {
            return index == idx ? newResult : result;
        }));
    }
    async function performSearch(key: string) {
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
            <h1>List</h1>
            <SearchBar 
                search={(x: string) => navigate(`/search/${x}`)}
            />
            <h2>Results:</h2>
            <ul>{searchResultsRendered}</ul>
            <h2>Language: {language}</h2>
            <p>Has rerendered? {Math.random()}</p>
        </>
    );
}
