

interface SpinnerProps{
    className?: string
}

const Spinner = ({className}:SpinnerProps) => {
    return (
        <div className={`fixed top-0 left-0 w-full h-screen bg-[#00000055] transition-all duration-300 flex items-center justify-center ${className}`}>
            <div className="w-32 h-32 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
        </div>
    );
}

export default Spinner