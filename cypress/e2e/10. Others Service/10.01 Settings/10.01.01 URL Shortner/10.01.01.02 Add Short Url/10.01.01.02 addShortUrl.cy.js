describe("Get staff profile data with status code 201", () => {
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
  it("Checking if should be able to get staff profile data", () => {
    cy.request({
      method: "POST",
      url: "/short-url/add",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "api testing url",
        slug: "test-slug-url",
        redirectUrl: "https://github.com/vercel/next.js/issues/11993",
        isActive: true,
        description: "description",
        expirationDate: "Feb 08, 2025",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201, "Expected status code is 201");
      if (response.status === 201) {
        const { body, duration } = response;
        cy.writeFile("cypress/fixtures/shortenerUrlId.json", {
          shortenerUrlId: body.url._id,
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
