import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainScreen from "./screens/MainScreen"
import RecipeGraphScreen from "./screens/RecipeGraphScreen"
import NotFoundScreen from "./screens/NotFoundScreen"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/recipe-graph" element={<RecipeGraphScreen />} />
                <Route path="*" element={<NotFoundScreen/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
