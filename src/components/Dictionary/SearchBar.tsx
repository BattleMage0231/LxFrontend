import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import FREntryService from "../../services/languages/fr-entry-service"

export default function SearchBar() {
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState("")
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [suggestions, setSuggestions] = useState<string[]>([])
    const searchInputRef = useRef(searchInput)
    useEffect(() => { searchInputRef.current = searchInput }, [searchInput])
    useEffect(() => {
        const interval = setInterval(() => {
            if(searchInputRef.current) {
                FREntryService.suggestSearch(searchInputRef.current)
                    .then(res => setSuggestions(res ?? [])).catch(console.log)
            }
        }, 2000)
        return () => clearInterval(interval)
    }, [])
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setSearchInput(e.target.value)
    };
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        navigate(`/search/${searchInput}`)
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
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)} 
                        value={searchInput} 
                    />
                    <button className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 font-medium rounded-lg text-sm px-4 py-2" type="submit">Submit</button>
                    {
                        isInputFocused && suggestions.length > 0 &&
                        <ul className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg" onMouseDown={(e) => e.preventDefault()}>
                            {
                                suggestions.map(data => (
                                    <li
                                        key={`suggestion-${data}`} 
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                        onClick={() => {
                                            setSearchInput(data);
                                            (document.activeElement as HTMLElement).blur()
                                            navigate(`/search/${data}`)
                                        }}
                                    >{data}</li>
                                ))
                            }
                        </ul>
                    }
                </div>
            </form>
        </div>
    )
}
