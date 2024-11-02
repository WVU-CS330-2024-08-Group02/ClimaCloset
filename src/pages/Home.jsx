import { useState } from "react"
import { Navbar } from "../components/Shelf"
import { Shelf } from "../components/Shelf"

export function Home()  {
    return (
        <>
            <Navbar />
            <h1>This is the home page</h1>
            <Shelf />
        </>
    )
}
