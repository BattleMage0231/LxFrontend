import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import EntryList from "./EntryList";

export default function Dictionary() {
    const params = useParams()
    return (
        <div className="container mx-auto px-6">
            <div className="bg-gray-100 px-4 pt-5 rounded-lg">
                <SearchBar />
                <h2>Results:</h2>
                <EntryList searchString={params.key ?? ""} />
            </div>
        </div>
    )
}
