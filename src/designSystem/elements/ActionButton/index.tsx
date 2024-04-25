import "./ActionButton.scss"

interface Props {
    label: string;
    className: string;
    onClick: () => void;
    disabled?: boolean
}

function ActionButton({label, disabled, onClick, className}: Props) {
    return (
        <button
            disabled={disabled}
            className={`action-button ${className}`}
            onClick={onClick}
        >
        {label}
        </button>
    )
}


export default ActionButton;