describe("Edit support with status code 201", () => {
  let accessToken;
  let branchId, helpId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/helpId.json").then((help) => {
      helpId = help.helpId;
    });
  });
  it("Checking if should be able to edit support", () => {
    cy.request({
      method: "PATCH",
      url: `/document/edit/${helpId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        name: "For API Testing Update",
        attachment: [],
        description: "fdgdfg",
        priority: "high",
        category: "help",
        program: "664a63c81a88ea0019515a20",
        session: "66491689e44f020019e08e4f",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201, "Expected status code is 201");
      if (response.status === 201) {
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
