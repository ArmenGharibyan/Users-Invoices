import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";

import Invoices from "./components/Invoices";

const App = () => {
  const [users, setUsers] = useState([] || ``);
  const [inpName, setInpName] = useState();
  const [inpPassword, setInpPassword] = useState();

  function refreshPage() {
    if (window.location.href === `http://localhost:3000/`) {
      return window.location.reload();
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    const response = await fetch(
      "https://bever-aca-assignment.azurewebsites.net/users"
    );
    const data = await response.json();
    const user = data.value.filter((user) => {
      return user.Name === inpName && user.Password === inpPassword;
    });
    setUsers(user);
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <input
                onChange={(e) => {
                  setInpName(e.target.value);
                }}
                type="text"
              />
              <input
                onChange={(e) => {
                  setInpPassword(e.target.value);
                }}
                type="text"
              />

              <Link to="Invoices">
                <button onClick={getCurrentUser}>click</button>
              </Link>
            </div>
          }
        />
        <Route
          path="/Invoices"
          element={
            <div>
              {users[0] ? (
                <Invoices users={users} />
              ) : (
                <div>
                  <p>No User</p>
                  <Link to="/">
                    <button onClick={refreshPage}>log out</button>
                  </Link>
                </div>
              )}
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
