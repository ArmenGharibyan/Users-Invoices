export const GetInvoiceLines = (invId, lines) => {
  let selectedLines = lines.filter((line) => {
    return line.InvoiceId === invId;
  });
  return selectedLines;
};

const AboutInvoice = ({ invId, lines, products }) => {
  return (
    <table border={2}>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((pr) => {
          let invoiceLines = GetInvoiceLines(invId, lines);

          for (let i = 0; i < invoiceLines.length; i++) {
            if (pr.ProductId === invoiceLines[i].ProductId) {
              return (
                <tr key={i}>
                  <td>{pr.Name}</td>
                  <td>{pr.Price}</td>
                  <td>{invoiceLines[i].Quantity}</td>
                  <td>
                    {parseInt(pr.Price) * parseInt(invoiceLines[i].Quantity)}
                  </td>
                </tr>
              );
            }
          }
        })}
      </tbody>
    </table>
  );
};

export default AboutInvoice;
