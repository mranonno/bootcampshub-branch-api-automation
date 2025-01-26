describe("Create link with status code 201", () => {
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
  it("Checking if should be able to create link", () => {
    cy.request({
      method: "POST",
      url: "/link/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "API Test Link",
        url: "https://staging-api.bootcampshub.ai/api/link/getall",
        image: "",
        programs: ["664a63c81a88ea0019515a20"],
        sessions: ["66491689e44f020019e08e4f"],
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201, "Expected status code is 201");
      if (response.status === 201) {
        const { body, duration } = response;
        cy.writeFile("cypress/fixtures/linkId.json", { linkId: body.link._id });
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
