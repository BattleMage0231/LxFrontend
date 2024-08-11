import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import EntryList from "./EntryList";

export default function Dictionary() {
    const params = useParams();
    const navigate = useNavigate();
    return (
        <div className="container mx-auto px-6">
            <div className="bg-gray-100 px-4 pt-5 rounded-lg">
                <SearchBar 
                    search={(x: string) => navigate(`/search/${x}`)}
                />
                <h2>Results:</h2>
                <EntryList key={params.key ?? ""} />
                <p>Parent has rerendered? {Math.random()}</p>
            </div>
        </div>
    );
}
