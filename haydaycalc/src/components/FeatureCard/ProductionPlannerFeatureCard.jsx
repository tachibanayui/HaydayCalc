import { Card } from "react-bootstrap";
import { Link } from "next/navigation";
import LocaleLink from "../LocaleLink";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ProductionPlannerFeatureCard = () => {
    const t = useTranslations("feature-cards.production-planner");
    const tt = useTranslations("feature-cards");

    return (
        <Card className="feature-card">
            <Image
                className="card-img-top img-sized"
                src="/question-mark.png"
                style={{ objectFit: "cover" }}
                alt="Feature image card"
                width={300}
                height={300}
            />
            <Card.Body>
                <Card.Title>{t("title")}</Card.Title>
                <Card.Text>{t("description")}</Card.Text>
                <LocaleLink
                    href="/production-planner"
                    className="btn btn-primary"
                >
                    {tt("try-button")}
                </LocaleLink>
            </Card.Body>
        </Card>
    );
};

export default ProductionPlannerFeatureCard;
