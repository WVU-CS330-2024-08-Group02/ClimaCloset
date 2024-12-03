import './TransparentBox.css'

/* Basic starter component for a transparent box, children and props are passed onto this */
export function TransparentBox({ className, children, ...props }) {
    return (
        <div className={`transparent-box ${className}`} {...props}>{children}</div>
    )
}