describe("Create invoice with status code 200", () => {
  let accessToken;
  let branchId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
  });
  it("Checking if should be able to create invoice", () => {
    cy.request({
      method: "POST",
      url: "/invoice/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        name: "Md Shimul",
        address: "",
        phone: "1401413137",
        tax: 6,
        user: "create",
        courses: [
          {
            title: "first program",
            price: 199,
            session: "Test_Sessions",
          },
        ],
        payments: [
          {
            date: "2024-08-15T18:00:00.000Z",
            description: "",
            method: "cash",
            amount: 12,
          },
        ],
        loan: {
          approved: 0,
          received: 0,
        },
        country: "USA",
        enrollment: "6523d8d71eab265c60cf30ce",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200, "Expected status code is 200");
      if (response.status === 200) {
        const { body, duration } = response;
        cy.writeFile("cypress/fixtures/invoiceId.json", {
          invoiceId: body.invoice._id,
        });
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
