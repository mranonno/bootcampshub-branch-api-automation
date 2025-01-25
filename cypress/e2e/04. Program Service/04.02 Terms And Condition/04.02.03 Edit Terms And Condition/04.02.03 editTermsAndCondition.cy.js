describe("Edit terms and conditions with status code 200", () => {
  let accessToken;
  let branchId;
  let termsId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/termsId.json").then((terms) => {
      termsId = terms.termsId;
    });
  });
  it("Checking if should be able to edit terms and conditions", () => {
    cy.request({
      method: "PATCH",
      url: `/terms-conditions/edit/${termsId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "Testing Terms for API Testing",
        isActive: true,
        programs: ["64fcb957b0cf6e9ae43d126d", "6643b7dba18d9300192c69a0"],
        sessions: [],
        description: "Terms And Condition Description",
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
