import LoadingIcon from "./LoadingIcon"
import "../styles/fullScreenLoading.css"

export default function fullScreenLoading ({text}) {

    return (
        <div id="fullScreenLoading">
            <LoadingIcon />
        </div>
    )
}