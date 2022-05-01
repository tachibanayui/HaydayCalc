import "./App.css"
import { calculatePosition, calculateDependencies, defaultRecipeSelector } from "./utils/data"
import hdData from "./assets/output.json"
import { useState } from "react"
import ProductionNetwork from "./components/ProductionNetwork"
import ProductionNode from "./components/ProductionNode"

function App() {
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
    for (const is in s) {
        // s[is].source = undefined
    }
    return (
        <div>
            <select value={current} onChange={e => setCurrent(e.target.value)}>
                {Object.keys(hdData).map(x => (
                    <option key={x}>{x}</option>
                ))}
            </select>
            <input type="text" value={count} onChange={e => setCount(e.target.value)} />
            {/* <p>{JSON.stringify(t)}</p> */}
            {/* <p>{JSON.stringify(s)}</p> */}
            <br />

            <ProductionNetwork
                goodsList={hdData}
                nodeData={s}
                nodePoses={t}
                recipeSelector={defaultRecipeSelector}
            />

            <svg>
                <ProductionNode
                    goodsList={hdData}
                    count={10}
                    img={hdData[current].imageUrl}
                    x={0}
                    y={0}
                />
            </svg>
        </div>
    )
}

export default App
