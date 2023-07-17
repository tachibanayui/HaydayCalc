import FluidContainer from "react-bootstrap"
import Header from "../components/Header"
import Footer from "../components/Footer"

const DefaultLayout = ({ children }) => {
    return (
        <div data-bs-theme="dark">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default DefaultLayout
