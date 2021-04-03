import { FC } from "react";


const Footer: FC = () => {
    return (
        <div className="footer-wrapper">
            <footer>
                <div className="flex-wrapper">
                    <h1>ChatZilla</h1>
                    <div className="info">
                        <ul>
                            <li><h2>Contact</h2></li>
                            <li><h2>Support</h2></li>
                            <li><h2>License</h2></li>
                            <li><h2>Privates</h2></li>
                        </ul>
                    </div>
                    <div className="copyright">
                        <h2>ChatZilla &#169;, {new Date().getFullYear()} all rights reserved</h2>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;