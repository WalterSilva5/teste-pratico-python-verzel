/* eslint-disable import/extensions */
/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from "@/components/Header";
import ListagemModulos from "@/components/ListagemModulos";
import Pagina404 from "@/pages/Pagina404";
import PaginaCadastro from "@/pages/PaginaCadastro";

function App() {
  let authToken = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!authToken) {
      authToken = localStorage.getItem('authToken');
    }
  }, []);
  return (
    <div className="container-fluid col-12 m-0 p-0">
      <header className="App-header">
        <Header />
        <Routes>
          <Route path="/" element={<ListagemModulos />} />
          <Route
            path="/cadastros"
            element={authToken ? <PaginaCadastro /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<Pagina404 />} />
        </Routes>

      </header>
    </div>
  );
}

export default App;
