import React, { useEffect, useState } from "react";

import AboutInvoice from "./AboutInvoice";

const Products = ({ lines, propInvoices }) => {
  const [products, setProducts] = useState([]);

  const [tag, setTag] = useState();

  let allSpendedMoney = ``;

  let allSpendedMoneyArray = [];

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(
        "https://bever-aca-assignment.azurewebsites.net/products"
      );
      const products = await response.json();
      setProducts(products.value);
    }
    getProducts();
  }, []);

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < products.length; j++) {
      if (lines[i].ProductId === products[j].ProductId) {
        allSpendedMoney +=
          `,` + parseInt(products[j].Price) * parseInt(lines[i].Quantity);
      }
    }
  }

  allSpendedMoney = allSpendedMoney.split(`,`);

  allSpendedMoney = allSpendedMoney.filter((val) => val);

  for (let i = 0; i < allSpendedMoney.length; i += products.length) {
    allSpendedMoneyArray.push(
      parseInt(allSpendedMoney[i]) +
        parseInt(allSpendedMoney[i + 1]) +
        parseInt(allSpendedMoney[i + 2])
    );
  }

  return (
    <div>
      {products[0] ? (
        <>
          <table border={2}>
            <thead>
              <tr>
                <th></th>
                <th>Invoice Name</th>
                <th>Paid Date</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {propInvoices.map((invoice, index) => (
                <tr key={index}>
                  <td>
                    <input
                      onClick={() => {
                        setTag(() => (
                          <AboutInvoice
                            invId={invoice.InvoiceId}
                            lines={lines}
                            products={products}
                          />
                        ));
                      }}
                      type="radio"
                      name="check"
                    />
                  </td>
                  <td>{invoice.Name}</td>
                  <td>
                    {invoice.PaidDate.substring(
                      0,
                      invoice.PaidDate.indexOf(`T`)
                    )}
                  </td>
                  <td>{allSpendedMoneyArray[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>{tag}</div>
        </>
      ) : (
        <p>...loading</p>
      )}
    </div>
  );
};

export default Products;
