import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InvoicesLines from "./InvoicesLines";

const Invoices = ({ users }) => {
  const [invoices, setInvoices] = useState([]);

  function refreshPage() {
    return window.location.reload();
  }

  useEffect(() => {
    async function getInvoices() {
      const response = await fetch(
        "https://bever-aca-assignment.azurewebsites.net/invoices"
      );
      const data = await response.json();

      setInvoices(data.value);
    }
    getInvoices();
  }, []);

  const myInvoices = invoices.filter((inv) => {
    return inv.UserId === users[0].UserId;
  });

  return (
    <>
      {users[0] ? (
        <div>
          <h1>{users[0].Name}</h1>
          <Link to="/">
            <button onClick={refreshPage}>Log out</button>
          </Link>
          <InvoicesLines invoices={myInvoices} />
        </div>
      ) : (
        <h2>...Loading </h2>
      )}
    </>
  );
};

export default Invoices;
