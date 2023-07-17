import { Button, Card, Col, Container, Form, Nav, Row } from "react-bootstrap"
import DefaultLayout from "../layouts/DefaultLayout"
import { calculatePosition, calculateDependencies, defaultRecipeSelector } from "../utils/data"
import hdData from "../assets/output.json"
import { useState } from "react"
import ProductionNetwork from "../components/ProductionNetwork"

const RecipeGraphScreen = () => {
    const [selRecipe, setSelRecipe] = useState("Egg")
    const [selCount, setSelCount] = useState(1)
    const [validationMsg, setValidationMsg] = useState("")

    const [current, setCurrent] = useState("Egg")
    const [count, setCount] = useState(1)
    const t = calculatePosition([hdData[current]], hdData)
    const s = calculateDependencies(
        [
            {
                product: current,
                count,
            },
        ],
        hdData
    )
    // for (const is in s) {
    //     // s[is].source = undefined
    // }

    const handleGenerate = () => {
        if (!(selRecipe in hdData)) {
            setValidationMsg("Invalid recipe")
            return
        }

        if (selCount < 1 || selCount > 1000) {
            setValidationMsg("Invalid quantity")
            return
        }

        setValidationMsg("")
        setCurrent(selRecipe)
        setCount(selCount)
    }

    return (
        <DefaultLayout>
            <h1 style={{ textAlign: "center" }}>Hayday Recipe Graph</h1>
            <Container>
                <Row>
                    <Col xs="12" lg="8">
                        <Card>
                            <Card.Header>
                                <h2>Graph View</h2>
                            </Card.Header>
                            <Card.Body style={{ overflow: "hidden" }}>
                                <ProductionNetwork
                                    goodsList={hdData}
                                    nodeData={s}
                                    nodePoses={t}
                                    recipeSelector={defaultRecipeSelector}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs="12" lg="4">
                        <Card>
                            <Card.Header>
                                <h2>Recipes</h2>
                            </Card.Header>
                            <Card.Body>
                                <datalist id="recipes">
                                    {Object.keys(hdData).map(x => (
                                        <option key={x}>{x}</option>
                                    ))}
                                </datalist>
                                <Form.Label>Select recipes: </Form.Label>
                                <Form.Control
                                    type="text"
                                    list="recipes"
                                    placeholder="Enter recipe name ..."
                                    value={selRecipe}
                                    onChange={e => setSelRecipe(e.target.value)}
                                />

                                <Form.Label>Quantity: </Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter quantity ..."
                                    min={1}
                                    max={1000}
                                    value={selCount}
                                    onChange={e => setSelCount(e.target.value)}
                                />
                                <p style={{color: 'red'}}>{validationMsg}</p>
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={handleGenerate}>Generate Graph!</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </DefaultLayout>
    )
}

export default RecipeGraphScreen
