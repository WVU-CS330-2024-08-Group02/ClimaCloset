import '../components/CenterContainer.css'

/* Component to contain webpage content */
export function CenterContainer({ children }) {
    return (
        <>
            <div className="center-container">{children}</div>
        </>
    )
}