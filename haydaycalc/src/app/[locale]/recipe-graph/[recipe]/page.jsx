"use client"
import { Button, Card, Col, Container, Form, Nav, Row } from "react-bootstrap"
import { calculatePosition, calculateDependencies, defaultRecipeSelector } from "@/utils/data"
import hdData from "@/assets/output.json"
import { useState } from "react"
import ProductionNetwork from "@/components/RecipeGraph/ProductionNetwork"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import UniqueLayout from "./UniqueLayout"

export const generateStaticParams = async () => {
    return Object.keys(hdData).map(x => ({
        recipe: x,
    }))
}
const RecipeGraphScreen = ({ params }) => {
    const router = useRouter()
    const ts = useTranslations("recipe-graph")

    const searchParams = useSearchParams()
    const paramRecipe = decodeURI(params?.recipe) ?? "Egg"
    let paramCount = parseInt(searchParams.get("count"))
    paramCount = Number.isInteger(paramCount) ? paramCount : 1
    const [selRecipe, setSelRecipe] = useState(paramRecipe)
    const [selCount, setSelCount] = useState(paramCount)
    const [validationMsg, setValidationMsg] = useState("")

    const [current, setCurrent] = useState(paramRecipe)
    const [count, setCount] = useState(paramCount)
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

    const handleGenerate = () => {
        if (!(selRecipe in hdData)) {
            setValidationMsg(ts("vmsg-recipe"))
            return
        }

        if (selCount < 1 || selCount > 1000) {
            setValidationMsg(ts("vmsg-quantity"))
            return
        }

        setValidationMsg("")
        setCurrent(selRecipe)
        setCount(selCount)
        router.push(`/${params.locale}/recipe-graph/${encodeURI(selRecipe)}?count=${selCount}`)
    }

    return (
        // <main>asd</main>
        <UniqueLayout
            form={
                <>
                    <Card.Body>
                        <datalist id="recipes">
                            {Object.keys(hdData).map(x => (
                                <option key={x}>{x}</option>
                            ))}
                        </datalist>
                        <Form.Label>{ts("input-recipe")}</Form.Label>
                        <Form.Control
                            type="text"
                            list="recipes"
                            placeholder={ts("input-recipe")}
                            value={selRecipe}
                            onChange={e => setSelRecipe(e.target.value)}
                        />

                        <Form.Label>{ts("input-quantity")}</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder={ts("input-quantity")}
                            min={1}
                            max={1000}
                            value={selCount}
                            onChange={e => setSelCount(e.target.value)}
                        />
                        <p style={{ color: "red" }}>{validationMsg}</p>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={handleGenerate}>{ts("btn-generate")}</Button>
                    </Card.Footer>
                </>
            }
        >
            <ProductionNetwork
                goodsList={hdData}
                nodeData={s}
                nodePoses={t}
                recipeSelector={defaultRecipeSelector}
            />
        </UniqueLayout>
    )
}

export default RecipeGraphScreen

