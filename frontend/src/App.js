import "./App.css";

import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import "./assets/style/mixin/_app.scss";
import AllRoute from "./routes";

function App() {
    return (
        <div className="App">
            {/* <Router>
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
            </Router> */}
            <AllRoute />
        </div>
    );
}

export default App;
