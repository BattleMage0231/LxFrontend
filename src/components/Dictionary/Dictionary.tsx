import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../contexts/language-context";
import FREntryService from "../../services/languages/fr-entry-service";
import SearchBar from "./SearchBar";

export default function Dictionary() {
    const params = useParams();
    const navigate = useNavigate();
    const language = useLanguage();
    const [searchResults, setSearchResults] = useState<string[]>([]);
    useEffect(() => {
        performSearch(params.key ?? "");
    }, [params]);
    async function performSearch(key: string) {
        const results = await FREntryService.getAllEntries();
        const str = results!.map(res => JSON.stringify(res));
        console.log(str);
        setSearchResults(str);
    }
    const searchResultsRendered = searchResults.map(result => <li>{result}</li>);
    return (
        <>
            <h1>List</h1>
            <SearchBar 
                search={(x: string) => navigate(`/search/${x}`)}
            />
            <h2>Results:</h2>
            <ul>{searchResultsRendered}</ul>
            <h2>Language: {language}</h2>
        </>
    );
}
