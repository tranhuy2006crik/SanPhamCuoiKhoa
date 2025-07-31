import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/common/AuthContext';
import { AdminAuthProvider, AdminAuthContext } from './components/common/AdminAuthContext';
import HomePage from './components/home/HomePage';
import LoginRegister from './components/home/LoginRegister';
import MemberRegisterStep1 from './components/member/MemberRegisterStep1';
import MemberRegisterStep2 from './components/member/MemberRegisterStep2';
import MemberRegisterStep3 from './components/member/MemberRegisterStep3';
import MemberCreditOption from './components/member/MemberCreditOption';
import MemberCreditCardForm from './components/member/MemberCreditCardForm';
import MomoSetup from './components/member/MomoSetup';
import AdminPage from './components/admin/AdminPage';
import AdminAuth from './components/admin/AdminAuth';
import MoviesPage from './components/movies/MoviesPage';
import MoviePlayerPage from './components/movies/MoviePlayerPage';

function ProtectedAdminRoute({ children }) {
  const { isAuthenticated } = React.useContext(AdminAuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* User routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<LoginRegister />} />
          <Route path="/register-member" element={<MemberRegisterStep1 />} />
          <Route path="/register-member/step-2" element={<MemberRegisterStep2 />} />
          <Route path="/register-member/step-3" element={<MemberRegisterStep3 />} />
          <Route path="/register-member/creditoption" element={<MemberCreditOption />} />
          <Route path="/register-member/creditcard" element={<MemberCreditCardForm />} />
          <Route path="/register-member/momo" element={<MomoSetup />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MoviePlayerPage />} />

          {/* Admin routes dùng context riêng */}
          <Route path="/admin/*" element={
            <AdminAuthProvider>
              <Routes>
                <Route path="" element={<AdminAuth />} />
                <Route path="page" element={
                  <ProtectedAdminRoute>
                    <AdminPage />
                  </ProtectedAdminRoute>
                } />
              </Routes>
            </AdminAuthProvider>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
