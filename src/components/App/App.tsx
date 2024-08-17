import { Routes, Route, Outlet } from "react-router-dom";
import { LanguageContext } from "../../contexts/languageContext.ts";
import Dictionary from "../Dictionary/Dictionary.tsx";
import { Language } from "../../utilites/BaseEntry.ts";
import Navbar from "./Navbar.tsx";

export default function App() {
    return (
        <LanguageContext.Provider value={Language.FR}>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Dictionary />}></Route>
                    <Route path='search' element={<Dictionary />}></Route>
                    <Route path='search/:key' element={<Dictionary />}></Route>
                    <Route path='test' element={<h1>Test</h1>}></Route>
                </Route>
            </Routes>
        </LanguageContext.Provider>
    );
}

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}
