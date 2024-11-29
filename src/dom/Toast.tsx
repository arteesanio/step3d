interface ToastProps {
    message: string;
    onClose: () => void;
}

export const Toast = ({ message, onClose }: ToastProps) => {
    return (
        <div className="pr-8 pl-4  py-2" style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            maxWidth: "300px",
            background: "rgba(0,0,0,0.8)",
            color: "white",
            borderRadius: "5px",
            textAlign: "center",
            zIndex: 1000
        }}>
            <div 
            style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer",
                padding: "0 5px"
            }} onClick={onClose}>×</div>
            {message}
        </div>
    );
}; 