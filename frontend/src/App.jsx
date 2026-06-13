import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  AuthProvider
} from "./context/AuthContext";

import LoginPage
  from "./pages/LoginPage";

import RegisterPage
  from "./pages/RegisterPage";

import TareasPage
  from "./pages/TareasPage";

import TareaDetallePage
  from "./pages/TareaDetallePage";

import DashboardPage
  from "./pages/DashboardPage";

import NotFoundPage
  from "./pages/NotFoundPage";

import ProtectedRoute
  from "./routes/ProtectedRoute";

import TareaFormPage
  from "./pages/TareaFormPage";

import AdminRoute
  from "./routes/AdminRoute";

import TareaEditPage
  from "./pages/TareaEditPage";

import ProyectosPage
  from "./pages/ProyectosPage";

import ProyectoDetallePage
  from "./pages/ProyectoDetallePage";

import ProyectoCreatePage
  from "./pages/ProyectoCreatePage";

import ProyectoEditPage
  from "./pages/ProyectoEditPage";


function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          <Route
            path="/login"
            element={
              <LoginPage />
            }
          />

          <Route
            path="/register"
            element={
              <RegisterPage />
            }
          />

          <Route
            path="/tareas"
            element={
              <ProtectedRoute>
                <TareasPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tareas/nueva"
            element={
              <ProtectedRoute>
                <TareaFormPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tareas/:id"
            element={

              <ProtectedRoute>

                <TareaDetallePage />

              </ProtectedRoute>

            }
          />
          <Route
            path="/tareas/:id/editar"
            element={
              <ProtectedRoute>
                <TareaEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tareas/resumen"
            element={

              <AdminRoute>

                <DashboardPage />

              </AdminRoute>

            }
          />

          <Route
            path="/proyectos"
            element={
              <ProtectedRoute>

                <ProyectosPage />

              </ProtectedRoute>
            }
          />

          <Route
            path="/proyectos/nuevo"
            element={
              <AdminRoute>

                <ProyectoCreatePage />

              </AdminRoute>
            }
          />

          <Route
            path="/proyectos/:id/editar"
            element={
              <AdminRoute>

                <ProyectoEditPage />

              </AdminRoute>
            }
          />

          <Route
            path="/proyectos/:id"
            element={
              <ProtectedRoute>

                <ProyectoDetallePage />

              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <NotFoundPage />
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>

  );

}

export default App;