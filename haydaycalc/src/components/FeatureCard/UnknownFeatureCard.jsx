import Image from "next/image";
import { Button, Card } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { useTranslations } from "next-intl";

const UnknownFeatureCard = () => {
    const t = useTranslations("feature-cards.comming-soon");

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
                <a
                    href="https://github.com/tachibanayui/HaydayCalc"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary icon-align"
                >
                    <AiFillGithub />
                    {t("star-github")}
                </a>
            </Card.Body>
        </Card>
    );
};

export default UnknownFeatureCard;
