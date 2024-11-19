import './CenterContainer.css'

/* Component to contain webpage content */
export function CenterContainer({ className, children, ...props }) {
    return (
        <>
            <div className={`center-container ${className}`} {...props}>{children}</div>
        </>
    )
}