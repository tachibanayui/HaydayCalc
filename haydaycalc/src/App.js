import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainScreen from "./screens/MainScreen"
import RecipeGraphScreen from "./screens/RecipeGraphScreen"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/recipe-graph" element={<RecipeGraphScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
