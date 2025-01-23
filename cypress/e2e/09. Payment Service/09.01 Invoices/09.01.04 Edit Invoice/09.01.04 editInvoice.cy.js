describe("Edit invoice with status code 200", () => {
  let accessToken;
  let branchId;
  let invoiceId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/invoiceId.json").then((invoice) => {
      invoiceId = invoice.invoiceId;
    });
  });
  it("Checking if should be able to edit invoice", () => {
    cy.request({
      method: "PATCH",
      url: `/invoice/edit/${invoiceId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        name: "Md Shimul",
        address: "Address",
        phone: "1401413137",
        tax: 6,
        user: "67920731a8fd0d0019ec85f7",
        courses: [
          {
            price: 199,
            _id: "67920731a8fd0d0019ec85f8",
            title: "first program",
            session: "Test_Sessions",
          },
        ],
        payments: [
          {
            amount: 12,
            _id: "67920731a8fd0d0019ec85f9",
            date: "2024-08-15T18:00:00.000Z",
            description: "",
            method: "cash",
          },
        ],
        loan: {
          received: 0,
          approved: 0,
        },
        country: "USA",
        enrollment: "6523d8d71eab265c60cf30ce",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200, "Expected status code is 200");
      if (response.status === 200) {
        const { body, duration } = response;
        expect(body.success).to.eq(true);
        expect(duration).to.be.lessThan(
          2000,
          "Response time should be less than 2 seconds"
        );
        cy.log("Response body (stringified):", JSON.stringify(body, null, 2));
        console.log(
          "Response body (stringified):",
          JSON.stringify(body, null, 2)
        );
      } else {
        cy.log("Request failed with status code:", response.status);
        cy.log(
          "Error details:",
          response.body.error || "No error details provided"
        );
      }
    });
  });
});
