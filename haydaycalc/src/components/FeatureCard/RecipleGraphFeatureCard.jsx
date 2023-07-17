import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const RecipeGraphFeatureCard = () => {
    return (
        <Card className="feature-card">
            <Card.Img variant="top" src="/feature-graph-view.png" className="img-sized" style={{objectFit: 'cover'}}/>
            <Card.Body>
                <Card.Title>Recipe Graph</Card.Title>
                <Card.Text>
                    The Recipe Graph is a powerful tool that helps you navigate and understand
                    complex recipes with ease. This graph visualization
                    will guide you through the step-by-step process of creating various recipes.
                </Card.Text>
                <Link to="/recipe-graph" className="btn btn-primary">Try it out</Link>
            </Card.Body>
        </Card>
    )
}

export default RecipeGraphFeatureCard
