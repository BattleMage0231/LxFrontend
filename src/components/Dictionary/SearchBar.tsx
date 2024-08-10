import { useState } from "react";

type SearchBarProps = {
    performSearch: (x: string) => void
};

export default function SearchBar({ performSearch } : SearchBarProps) {
    const [searchInput, setSearchInput] = useState("");
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        performSearch(searchInput);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Search" 
                    onChange={handleChange} 
                    value={searchInput} 
                />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}
