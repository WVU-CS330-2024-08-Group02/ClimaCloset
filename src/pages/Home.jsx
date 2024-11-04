import { useState } from "react"
import { Shelf } from "../components/Shelf"

export function Home()  {
    return (
        <>
        <div>
            <h1>This is the home page</h1>
            <Shelf />
        </div>
        <div>
            <h1>The Weather Today</h1>
        </div>
        </>
    )
}
