describe("Update short url with status code 200", () => {
  let accessToken;
  let branchId, shortenerUrlId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/shortenerUrlId.json").then((url) => {
      shortenerUrlId = url.shortenerUrlId;
    });
  });
  it("Checking if should be able to update short url", () => {
    cy.request({
      method: "PATCH",
      url: `/short-url/update/${shortenerUrlId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "api testing url update",
        slug: "test-slug-url",
        redirectUrl: "https://github.com/vercel/next.js/issues/11993",
        isActive: true,
        description: "description",
        expirationDate: "Feb 08, 2025",
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
