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
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border"
                        type="search" 
                        placeholder="Search" 
                        onChange={handleChange} 
                        value={searchInput} 
                    />
                    <button className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 font-medium rounded-lg text-sm px-4 py-2" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
