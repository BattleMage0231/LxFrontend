import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import EntryList from "./EntryList";

export default function Dictionary() {
    const params = useParams();
    const navigate = useNavigate();
    return (
        <>
            <h1>List</h1>
            <SearchBar 
                search={(x: string) => navigate(`/search/${x}`)}
            />
            <h2>Results:</h2>
            <EntryList key={params.key ?? ""} />
            <p>Parent has rerendered? {Math.random()}</p>
        </>
    );
}
