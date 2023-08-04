import Header from "../Header";
import Footer from "../Footer";

const DefaultLayout = ({ children }) => {
    return (
        <div data-bs-theme="dark">
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default DefaultLayout;