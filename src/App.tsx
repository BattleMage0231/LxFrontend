import { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import './App.css'

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />}></Route>
                <Route path='test' element={<h1>Test</h1>}></Route>
            </Route>
        </Routes>
    )
}

function Layout() {
    return (
        <>
            <h1>Lx</h1>
            <Outlet />
        </>
    )
}

function Home() {
    const [count, setCount] = useState(0)
    return (
        <>
            <h1>Home</h1>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
        </>
    )
}
