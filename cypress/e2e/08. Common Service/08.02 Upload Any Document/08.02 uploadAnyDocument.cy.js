describe("Update any document with status code 200", () => {
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

  it("Should upload a file and update a document", () => {
    const filePath = "cypress.jpg"; // Path to your file in `cypress/fixtures`

    cy.fixture(filePath, "base64").then((fileContent) => {
      const formData = new FormData();
      const blob = Cypress.Blob.base64StringToBlob(fileContent);

      formData.append("file", blob, "cypress.jpg"); // Append the file to the formData object

      cy.request({
        method: "POST",
        url: "/document/useranydocument",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Branch: branchId,
          "Content-Type": "multipart/form-data", // Ensure the server recognizes this as a file upload
        },
        body: formData,
        failOnStatusCode: false,
        encoding: "binary",
      }).then((response) => {
        expect(response.status).to.eq(200, "Expected status code is 200");
        if (response.status === 200) {
          const { body, duration } = response;
          expect(duration).to.be.lessThan(
            2000,
            "Response time should be less than 2 seconds"
          );
          cy.log("Response body (stringified):", JSON.stringify(body, null, 2));
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
});
