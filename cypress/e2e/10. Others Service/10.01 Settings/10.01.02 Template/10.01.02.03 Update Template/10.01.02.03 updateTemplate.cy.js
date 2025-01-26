describe("Update template with status code 201", () => {
  let accessToken;
  let branchId, templateId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/templateId.json").then((template) => {
      templateId = template.templateId;
    });
  });
  it("Checking if should be able to update template", () => {
    cy.request({
      method: "PATCH",
      url: `/template/edit/${templateId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "Create templates for api testing update",
        users: ["66371222546f7b001a63cd2b"],
        category: "Test-1",
        isActive: true,
        attachments: [],
        programs: ["64fcb957b0cf6e9ae43d126d"],
        sessions: ["66491689e44f020019e08e4f"],
        description: "Description",
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
