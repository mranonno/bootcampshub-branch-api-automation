describe("Edit document with status code 201", () => {
  let accessToken;
  let branchId;
  let documentId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/documentId.json").then((document) => {
      documentId = document.documentId;
    });
  });
  it("Checking if should be able to edit document", () => {
    cy.request({
      method: "PATCH",
      url: `/document/edit/${documentId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        name: "API testing by cypress update",
        attachment: [],
        description: "Api testing automation",
        priority: "medium",
        thumbnail:
          "https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/document-sending/1737450767382-Space-Gray-Apple-Laptop-Mockup.jpg",
        program: "6518fcfa8e86b35c04b6625d",
        session: "66491739e44f020019e08e7c",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201, "Expected status code is 200");
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
