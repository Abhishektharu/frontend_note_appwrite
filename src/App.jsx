import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import AuthSlider from "./pages/AuthSlider"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

import { Provider } from "react-redux"

import store from './store/Store'
function App() {
  return (
    <Provider store={store}>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<AuthSlider />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
