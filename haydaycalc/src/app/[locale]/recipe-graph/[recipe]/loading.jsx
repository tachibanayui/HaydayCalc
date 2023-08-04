"use client"
import { Button, Card, Col, Container, Form, Nav, Row } from "react-bootstrap"
import UniqueLayout from "./UniqueLayout"

const Loading = () => {
    return (
        <UniqueLayout
            form={
                <>
                    <Card.Body>
                        <p className="placeholder-wave">
                            <span className="placeholder col-4" />
                        </p>

                        <p className="placeholder-wave form-control">
                            <span className="placeholder col-6" />
                        </p>

                        <p className="placeholder-wave ">
                            <span className="placeholder col-4" />
                        </p>

                        <p className="placeholder-wave form-control">
                            <span className="placeholder col-2" />
                        </p>
                    </Card.Body>
                    <Card.Footer>
                        <a
                            className="btn btn-primary disabled placeholder col-4"
                            aria-disabled="true"
                        />
                    </Card.Footer>
                </>
            }
        >
            <div className="flex-center" style={{ height: "100%" }}>
                <div
                    className="spinner-grow text-secondary"
                    role="status"
                    style={{ width: "10vh", height: "10vh" }}
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </UniqueLayout>
    )
}

export default Loading
