import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/access/LoginPage';
import RegisterPage from './pages/access/RegisterPage';
import { AuthProvider } from './context/AuthContext';

import ViajeFormPage from './pages/empleados/ViajeFormPage';

import ProtectedRoute from './ProtectedRoute';

import { ViajeProvider } from './context/ViajesContext';
import ViajesUsers from './pages/users/ViajesUsers';
import BoletoUser from './pages/users/BoletoUser';
import BoletosComprados from './pages/empleados/BoletosComprados';
import { BoletoProvider } from './context/BoletosContext';
import RegisterEmpleado from './pages/admin/RegisterEmpleado';
import ViajesEmpleados from './pages/empleados/ViajesEmpleados';
import AsientosVendidos from './pages/empleados/AsientosVendidos';
import BoletosEmpleados from './pages/empleados/BoletosEmpleados';
import ViajesPage from './pages/admin/ViajesPage';
import EmpleadosPage from './pages/admin/EmpleadosPage';
import AdminPage from './pages/admin/AdminPage';
import SedesPage from './pages/admin/SedesPage';
import RegisterSede from './pages/admin/RegisterSede';
import RegisterAdmin from './pages/admin/RegisterAdmin';



function App() {


  return (
    <AuthProvider>

      <ViajeProvider>
        <BoletoProvider>
         
            <HashRouter>
              <Routes>
                <Route path='/' element={<LoginPage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>


                <Route element={<ProtectedRoute></ProtectedRoute>}>
                <Route path='/viajes/sedes' element={<SedesPage></SedesPage>}></Route>
                  <Route path='/viajes/admin/:id' element={<ViajesPage></ViajesPage>}></Route>
                  <Route path='/viajes/administradores' element={<AdminPage></AdminPage>}></Route>
                  <Route path='/viajes/empleados/:id' element={<EmpleadosPage></EmpleadosPage>}></Route>
                  
                  <Route path='/viajes/sedes/add' element={<RegisterSede></RegisterSede>}></Route>
                  <Route path='/viajes/admin/add' element={<RegisterAdmin></RegisterAdmin>}></Route>
                  <Route path='/viajes/empleados/add' element={<RegisterEmpleado></RegisterEmpleado>}></Route>




                  <Route path='/viajes/:id' element={<ViajesUsers></ViajesUsers>}></Route>
                  <Route path='/viajes/edit/:id' element={<ViajeFormPage />}></Route>
                  <Route path='/viajes/new/:id' element={<ViajeFormPage />}></Route>
                  <Route path='/boleto/:id' element={<BoletoUser></BoletoUser>}></Route>
                  <Route path='/boletosComprados' element={<BoletosComprados></BoletosComprados>}></Route>
                  <Route path='/boletosEmpleados/:id' element={<BoletosEmpleados></BoletosEmpleados>}></Route>
                  <Route path='/viajes/empleado/new' element={<RegisterEmpleado />}></Route>
                  <Route path='/viajes/boleteros/:id' element={<ViajesEmpleados></ViajesEmpleados>}></Route>
                  <Route path='/boleto/vendidos/:id' element={<AsientosVendidos></AsientosVendidos>}></Route>

                </Route>
              </Routes>

            </HashRouter>
          
        </BoletoProvider>
      </ViajeProvider>

    </AuthProvider>


  )
}

export default App
