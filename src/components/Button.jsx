/* Test code: can be deleted if no use is found */

export function Button({show, setShow, color}) {

    return (
        <>
            <button onClick={() => setShow(!show)} style ={{backgroundColor: color}}>
                <p>{show == true ? "Hide Item" : "Show Item"}</p>
            </button>
        </>
    )
}