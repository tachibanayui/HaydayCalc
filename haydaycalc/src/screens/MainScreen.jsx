import { Col, Container, Row } from "react-bootstrap"
import Header from "../components/Header"
import DefaultLayout from "../layouts/DefaultLayout"

import { AiFillGithub } from "react-icons/ai"
import { BsFillJournalBookmarkFill } from "react-icons/bs"
import RecipeGraphFeatureCard from "../components/FeatureCard/RecipleGraphFeatureCard"
import ProductionPlannerFeatureCard from "../components/FeatureCard/ProductionPlannerFeatureCard"
import UnknownFeatureCard from "../components/FeatureCard/UnknownFeatureCard"

const MainScreen = () => {
    return (
        <DefaultLayout>
            <Container className="my-5">
                <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
                        <h1 class="display-4 fw-bold lh-1">Hayday Calculators</h1>
                        <p class="lead">
                            Welcome to the Hayday Production Chain Graph website! This tool allows
                            you to explore the intricate production chain involved in creating
                            various items in the popular farm simulator game, Hayday. Whether you're
                            a seasoned player or just starting out, this graph will help you
                            understand the step-by-step process of turning basic ingredients into
                            the final products.
                        </p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                            <a
                                class="btn btn-primary btn-lg px-4 me-md-2 fw-bold align-icons"
                                href="https://hayday.fandom.com/wiki/Hay_Day_Wiki"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <BsFillJournalBookmarkFill />
                                Hayday Wiki
                            </a>
                            <a
                                class="btn btn-outline-secondary btn-lg px-4 align-icons"
                                href="https://github.com/tachibanayui/HaydayCalc"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <AiFillGithub />
                                Source code
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                        <img class="rounded-lg-3" src="/banner.png" alt="" width="720" />
                    </div>
                </div>

                <h2 className="text-center mt-3">Explore Tools</h2>
                <Row className="g-3">
                    <Col xs="12" xxl="3" xl="4" sm="6">
                        <RecipeGraphFeatureCard />
                    </Col>
                    <Col xs="12" xxl="3" xl="4" sm="6">
                        <ProductionPlannerFeatureCard />
                    </Col>
                    <Col xs="12" xxl="3" xl="4" sm="6">
                        <UnknownFeatureCard />
                    </Col>
                </Row>
            </Container>
        </DefaultLayout>
    )
}

export default MainScreen
