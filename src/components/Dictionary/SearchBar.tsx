import { useState } from "react";

type SearchBarProps = {
    search: (x: string) => void
}

export default function SearchBar({ search } : SearchBarProps) {
    const [searchInput, setSearchInput] = useState("");
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        search(searchInput);
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
