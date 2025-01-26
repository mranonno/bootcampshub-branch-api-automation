describe("Add e2e agenda with status code 201", () => {
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
  it("Checking if should be able to add e2e agenda", () => {
    cy.request({
      method: "POST",
      url: "/document/add",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        name: "Test for Api Testing",
        attachment: [],
        description: "afdfasd",
        priority: "medium",
        category: "e2e",
        program: "6643b7dba18d9300192c69a0",
        session: "66491739e44f020019e08e7c",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201, "Expected status code is 201");
      if (response.status === 201) {
        const { body, duration } = response;
        cy.writeFile("cypress/fixtures/agendaId.json", {
          agendaId: body.document._id,
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
