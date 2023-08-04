import Header from "../Header"
import Footer from "../Footer"

const DefaultLayout = ({ children }) => {
    return (
        <div data-bs-theme="dark" className="fill d-flex flex-column position-relative">
            <div className="fw-static sticky-top">
                <Header />
            </div>
            <div className="fw-grow">{children}</div>
            <div className="fw-static">
                <Footer />
            </div>
        </div>
    )
}

export default DefaultLayout
