
import { Button, Card, Col, Container, Form, Nav, Row } from "react-bootstrap"
import { useTranslations } from "next-intl"

const UniqueLayout = ({ form, children }) => {
    const ts = useTranslations("recipe-graph")
    return (
        <Container className="mb-5">
            <h1 style={{ textAlign: "center" }}>{ts("page-title")}</h1>
            <Row>
                <Col xs="12" lg="4">
                    <Card>
                        <Card.Header>
                            <h2>{ts("form-title")}</h2>
                        </Card.Header>
                        {form}
                    </Card>
                </Col>
                <Col xs="12" lg="8">
                    <Card>
                        <Card.Header>
                            <h2>{ts("graph-view-title")}</h2>
                        </Card.Header>
                        <Card.Body style={{ overflow: "hidden" }}>
                            <div style={{height: '100vh'}}>
                            {children}

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default UniqueLayout
