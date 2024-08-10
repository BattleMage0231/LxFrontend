import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from './SearchBar'

export default function Dictionary() {
    const params = useParams();
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState<string[]>([]);
    useEffect(() => {
        setSearchResults(performSearch(params.key ?? ""));
    }, [params]);
    function performSearch(key: string) {
        return ["abc", "def", key];
    }
    const searchResultsRendered = searchResults.map(result => <li>{result}</li>);
    return (
        <>
            <h1>List</h1>
            <SearchBar 
                performSearch={(x: string) => navigate(`/search/${x}`)}
            />
            <h2>Results:</h2>
            <ul>{searchResultsRendered}</ul>
        </>
    );
}
