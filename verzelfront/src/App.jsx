/* eslint-disable import/extensions */
/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
import React from "react";
import Header from "@/components/Header";
import ListagemModulos from "@/components/ListagemModulos";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <ListagemModulos />
      </header>
    </div>
  );
}

export default App;
