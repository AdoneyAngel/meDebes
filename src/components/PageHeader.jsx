import backIcon from "../icons/back.png"
import "../styles/pageHeader.css"

export default function PageHeader ({back}) {

    return (
        <header id="pageHeader">
            <button onClick={back}>
                <img src={backIcon} />
            </button>
        </header>
    )
}