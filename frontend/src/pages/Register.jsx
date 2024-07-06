import Form from "../components/Form"
import NavbarR from "../components/NavbarR";
import FooterTop from "../components/FooterTop";
import FooterBottom from "../components/FooterBottom";
import Faq from "../components/Faq";

function Register() {
    return (
        <div>
            <header id="header" className="fixed-top ">
                    <NavbarR />
            </header>
            <main id="main">
                <Form route="/api/user/register/" method="register" />
                <Faq/>
            </main>
            <footer id="footer">
                <FooterTop/>
                <FooterBottom/>
            </footer>
        </div>
    );
    
}

export default Register