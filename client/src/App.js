import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Login from "./pages/login";
import Home from "./pages/home";
import Register from "./pages/register";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";
import Alert from "./components/alert";
import PrivateRouter from "./customRouter/PrivateRouter";

function App() {
  const { auth } = useSelector((state) => state);
  console.log(auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <div className="container">
        <Routes>
          <Route path="/" element={auth.token ? <Home /> : <Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/:page"
            element={
              <PrivateRouter>
                <PageRender />
              </PrivateRouter>
            }
          />
          <Route
            path="/:page/:id"
            element={
              <PrivateRouter>
                <PageRender />
              </PrivateRouter>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
