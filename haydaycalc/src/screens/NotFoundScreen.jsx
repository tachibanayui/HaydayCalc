import { Button, Container } from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import { Link } from "react-router-dom";

const NotFoundScreen = () => {
    return (
        <DefaultLayout>
            <Container className="my-5">
                <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
                    <h1 style={{ fontSize: "5rem" }}>404</h1>
                    <div class="vr my-5 mx-3"></div>
                    <div>
                        <h2>Not found</h2>

                        <p>
                            We have searched far and wide but couldn't find the page you requested!
                        </p>
                        <Link to="/" className="btn btn-primary">
                            Return home!
                        </Link>
                    </div>
                </div>
                <img
                    src="/Chicken_Walking.webp"
                    alt="Not found message"
                    className="w-50 d-block mx-auto"
                />
            </Container>
        </DefaultLayout>
    )
}
 
export default NotFoundScreen;