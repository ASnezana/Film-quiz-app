import "./Header.scss"
import logo from "../../assets/logo.svg";
import videoCamera from "../../assets/video-camera.gif";
const Header = () => {

    return(
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <img src={videoCamera} className="Camera-logo" alt="camera-logo"/>
            <p>
                Film Quiz App
            </p>
        </header>
    );
}

export default Header;