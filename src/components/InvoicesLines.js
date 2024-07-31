import React, { useEffect, useState } from "react";

import Products from "./Products";

const InvoicesLines = ({ invoices }) => {
  const [invoicesLines, setInvoicesLines] = useState([]);

  useEffect(() => {
    async function getInvoicesLines() {
      const response = await fetch(
        "https://bever-aca-assignment.azurewebsites.net/invoicelines"
      );
      const data = await response.json();

      setInvoicesLines(data.value);
    }
    getInvoicesLines();
  }, []);

  const myInvoicesLines = invoicesLines.filter((inv) => {
    for (let i = 0; i < invoices.length; i++) {
      if (inv.InvoiceId === invoices[i].InvoiceId) {
        return true;
      }
    }
  });

  return <Products propInvoices={invoices} lines={myInvoicesLines} />;
};

export default InvoicesLines;
