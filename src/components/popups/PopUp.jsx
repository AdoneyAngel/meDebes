import "../../styles/popup.css"

export default function PopUp ({onClick, children}) {

    return (
        <div id="popup">
            <div className="onclikArea" onClick={onClick}></div>
            <div id="popupChild">
                <div className="popupcontent">
                    {children}
                </div>
            </div>
        </div>
    )
}