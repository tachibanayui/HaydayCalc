"use client";

import { useTranslations } from "next-intl";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import RecipeGraphFeatureCard from "@/components/FeatureCard/RecipleGraphFeatureCard";
import ProductionPlannerFeatureCard from "@/components/FeatureCard/ProductionPlannerFeatureCard";
import UnknownFeatureCard from "@/components/FeatureCard/UnknownFeatureCard";
import Image from "next/image";

const HomePage = () => {
    const t = useTranslations("homepage");
    return (
        <Container className="my-5">
            <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
                    <h1 class="display-4 fw-bold lh-1">Hayday Calculators</h1>
                    <p class="lead">{t("hero-text")}</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                        <a
                            class="btn btn-primary btn-lg px-4 me-md-2 fw-bold align-icons"
                            href="https://hayday.fandom.com/wiki/Hay_Day_Wiki"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <BsFillJournalBookmarkFill />
                            {t("hero-action-wiki")}
                        </a>
                        <a
                            class="btn btn-outline-secondary btn-lg px-4 align-icons"
                            href="https://github.com/tachibanayui/HaydayCalc"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <AiFillGithub />
                            {t("hero-action-source-code")}
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                    <Image
                        class="rounded-lg-3"
                        src="/banner.png"
                        alt=""
                        width={720}
                        height={720 * 0.47}
                    />
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
    );
};

export default HomePage;
