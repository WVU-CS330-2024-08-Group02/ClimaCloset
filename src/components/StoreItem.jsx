

export function StoreItem({item}) {

    return (
        <>
            <div className="card" style={{backgroundColor: "gray", borderRadius: "20px"}}>
                <h1>{item.title}</h1>
                <p>{item.desc}</p>
                <button>${item.price}</button>
            </div>
        </>
    )
}