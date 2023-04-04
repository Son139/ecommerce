import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import publicRoutes from "./routes/routes";
import adminRoutes from "./routes/adminRoutes";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Component = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Component />}
                            />
                        );
                    })}
                    {adminRoutes.map((route, index) => {
                        const Component = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Component />}
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
