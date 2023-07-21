"use client";
import { Button, Card, Col, Container, Form, Nav, Row } from "react-bootstrap";
import {
    calculatePosition,
    calculateDependencies,
    defaultRecipeSelector,
} from "@/utils/data";
import hdData from "@/assets/output.json";
import { useState } from "react";
import ProductionNetwork from "@/components/RecipeGraph/ProductionNetwork";
import { useSearchParams } from "next/navigation";
const RecipeGraphScreen = ({ params }) => {
    const searchParams = useSearchParams();
    const paramRecipe = decodeURI(params?.recipe) ?? "Egg";
    let paramCount = parseInt(searchParams.get('count'));
    paramCount = Number.isInteger(paramCount) ? paramCount : 1;
    const [selRecipe, setSelRecipe] = useState(paramRecipe);
    const [selCount, setSelCount] = useState(paramCount);
    const [validationMsg, setValidationMsg] = useState("");

    const [current, setCurrent] = useState(paramRecipe);
    const [count, setCount] = useState(paramCount);
    const t = calculatePosition([hdData[current]], hdData);
    const s = calculateDependencies(
        [
            {
                product: current,
                count,
            },
        ],
        hdData
    );

    const handleGenerate = () => {
        if (!(selRecipe in hdData)) {
            setValidationMsg("Invalid recipe");
            return;
        }

        if (selCount < 1 || selCount > 1000) {
            setValidationMsg("Invalid quantity");
            return;
        }

        setValidationMsg("");
        setCurrent(selRecipe);
        setCount(selCount);
    };

    return (
        <Container className="mb-5">
            <h1 style={{ textAlign: "center" }}>Hayday Recipe Graph</h1>
            <Row>
                <Col xs="12" lg="4">
                    <Card>
                        <Card.Header>
                            <h2>Recipes</h2>
                        </Card.Header>
                        <Card.Body>
                            <datalist id="recipes">
                                {Object.keys(hdData).map((x) => (
                                    <option key={x}>{x}</option>
                                ))}
                            </datalist>
                            <Form.Label>Select recipes: </Form.Label>
                            <Form.Control
                                type="text"
                                list="recipes"
                                placeholder="Enter recipe name ..."
                                value={selRecipe}
                                onChange={(e) => setSelRecipe(e.target.value)}
                            />

                            <Form.Label>Quantity: </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter quantity ..."
                                min={1}
                                max={1000}
                                value={selCount}
                                onChange={(e) => setSelCount(e.target.value)}
                            />
                            <p style={{ color: "red" }}>{validationMsg}</p>
                        </Card.Body>
                        <Card.Footer>
                            <Button onClick={handleGenerate}>
                                Generate Graph!
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
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
            </Row>
        </Container>
    );
};

export default RecipeGraphScreen;
