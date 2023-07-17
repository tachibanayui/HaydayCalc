import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const ProductionPlannerFeatureCard = () => {
    return (
        <Card className="feature-card">
            <Card.Img
                variant="top"
                src="/question-mark.png"
                className="img-sized"
                style={{ objectFit: "cover" }}
            />
            <Card.Body>
                <Card.Title>Production Planner</Card.Title>
                <Card.Text>
                    The Production Planner is a valuable feature designed to streamline your
                    production process and optimize efficiency. Use this tool to maximize 
                    your profits and minimize your time spent on the game.
                </Card.Text>
                <Link to="/production-planner" className="btn btn-primary">
                    Try it out
                </Link>
            </Card.Body>
        </Card>
    )
}

export default ProductionPlannerFeatureCard
