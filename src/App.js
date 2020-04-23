import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      id: "1",
      title: "Novo repositorio ",
      url: "https://github.com/Leozartino/jogo-da-velha.git",
      techs: ["CSS", "Javascript", "HTML"],
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  return (
    <>
      <h1>Reposiorios</h1>
      <div>
        <ul data-testid="repository-list">
          {repositories.map((repository) => (
            <li key={repository.id}>{repository.title}</li>
          ))}
        </ul>
        <button onClick={() => handleRemoveRepository(1)}>Remover</button>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </>
  );
}

export default App;
