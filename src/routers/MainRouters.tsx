import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "../pages/Home"
import BlogView from "../pages/BlogView"

const MainRouters = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/blog/:id" element={<BlogView />} />
            </Routes>
        </Router>
    )
}

export default MainRouters
