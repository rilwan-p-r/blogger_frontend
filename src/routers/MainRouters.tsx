import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "../pages/Home"

const MainRouters = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/home" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default MainRouters
