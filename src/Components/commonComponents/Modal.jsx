const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000, //the layer
        }}
      > 
        <div className=""
          style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "100%",
              maxWidth: "400px",
              zIndex:1001,
            }}
        >
            <h2 className='text-3xl text-white text-center mb-4 font-semibold border-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-sky-300'>
        My Reminders
      </h2>
          {children}
            <div className="flex justify-center">
                <button
                className="text-white bg-blue-600 w-40"
                onClick={onClose}
                style={{
                    borderRadius: "5px",
                    padding: 5,
                    marginTop: "10px",
                    display: "block",
                    }}
                    >
                    Close
                </button>
            </div>
        </div>
      </div>
    );
  };
  export default Modal;