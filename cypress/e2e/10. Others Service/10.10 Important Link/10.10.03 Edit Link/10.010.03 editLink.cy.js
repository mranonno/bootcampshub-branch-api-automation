describe("Update link with status code 200", () => {
  let accessToken;
  let branchId, linkId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/linkId.json").then((link) => {
      linkId = link.linkId;
    });
  });
  it("Checking if should be able to update link", () => {
    cy.request({
      method: "PATCH",
      url: `/link/edit/${linkId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "API Test Link Update",
        url: "https://staging-api.bootcampshub.ai/api/link/getall",
        image: "",
        programs: ["664a63c81a88ea0019515a20"],
        sessions: ["66491689e44f020019e08e4f"],
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
