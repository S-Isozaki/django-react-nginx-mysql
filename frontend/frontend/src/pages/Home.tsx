import { Link } from "react-router-dom"
import React, { useState } from "react"

export default function Home () {
    const [selectedLength, setSelectedLength] = useState<string>("25");
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedLength(value);
    }
    return (
        <>
            <select value={selectedLength} onChange={handleChange}>
                <option value={"25"}>25</option>
                <option value={"50"}>50</option>
                <option value={"100"}>100</option>
                <option value={"200"}>200</option>
            </select>
            <Link to={`/play?length=` + selectedLength}>start</Link>
        </>
    )
}