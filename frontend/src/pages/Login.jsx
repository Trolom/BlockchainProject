import Form from "../components/Form"
import NavbarR from "../components/NavbarR";
import FooterTop from "../components/FooterTop";
import FooterBottom from "../components/FooterBottom";
import Faq from "../components/Faq";

function Login() {
    return (
        <div>
            <header id="header" className="fixed-top ">
                    <NavbarR />
            </header>
            <main id="main">
                <Form route="/api/token/" method="login" />
                <Faq/>
            </main>
            <footer id="footer">
                <FooterTop/>
                <FooterBottom/>
            </footer>
        </div>
    );
}

export default Login