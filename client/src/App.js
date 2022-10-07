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
import NavbarMenu from "./components/NavbarMenu";
import ResetPassword from "./pages/reset_password";
import NewPassword from "./pages/new_password";
import SidebarMenu from "./components/SidebarMenu";
import CreateFlashcard from "./pages/Flashcard/create_flashcard";
import EditFlashcard from "./pages/Flashcard/edit_flashcard";

function App() {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

<<<<<<< HEAD
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {auth.token && <SidebarMenu />}
        <div className="container">
          {auth.token && <NavbarMenu />}
          <Alert />
          <div className="container">
            <Routes>
              <Route path="/" element={auth.token ? <Home /> : <Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset_password" element={<ResetPassword />} />
              <Route
                path="/new_password/:resetToken"
                element={<NewPassword />}
              />

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
        </div>
      </div>
    </Router>
  );
=======
    return (
        <Router>
            <div style={{ display: "flex" }}>
                {auth.token && <SidebarMenu />}
                <div className="container">
                    {auth.token && <NavbarMenu />}
                    <Alert />
                    <div className="container">
                        <Routes>
                            <Route
                                path="/"
                                element={auth.token ? <Home /> : <Login />}
                            />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/reset_password"
                                element={<ResetPassword />}
                            />
                            <Route
                                path="/new_password/:resetToken"
                                element={<NewPassword />}
                            />
                            <Route
                                path="/create_flashcard"
                                element={<CreateFlashcard />}
                            />
                            <Route
                                path="/edit_flashcard"
                                element={<EditFlashcard />}
                            />
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
                </div>
            </div>
        </Router>
    );
>>>>>>> feat: format Flashcard Page
}

export default App;
