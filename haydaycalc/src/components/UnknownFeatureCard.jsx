import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AiFillGithub } from "react-icons/ai"

const UnknownFeatureCard = () => {
    return (
        <Card className="feature-card">
            <Card.Img
                variant="top"
                src="/question-mark.png"
                className="img-sized"
                style={{ objectFit: "cover" }}
            />
            <Card.Body>
                <Card.Title>New tools coming soon!</Card.Title>
                <Card.Text>
                    Star my repository to show your appreciation and stay up to date with the latest
                    tools and features.
                </Card.Text>
                <a
                    href="https://github.com/tachibanayui/HaydayCalc"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary icon-align"
                >
                    <AiFillGithub />
                    Star on GitHub
                </a>
            </Card.Body>
        </Card>
    )
}

export default UnknownFeatureCard
