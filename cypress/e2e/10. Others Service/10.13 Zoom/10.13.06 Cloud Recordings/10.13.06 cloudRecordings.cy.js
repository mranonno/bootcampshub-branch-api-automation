describe("Get cloud recordings with status code 200", () => {
  let accessToken;
  let branchId, zoomId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/zoomId.json").then((zoom) => {
      zoomId = zoom.zoomId;
    });
  });
  it("Checking if should be able to get cloud recordings", () => {
    cy.request({
      method: "GET",
      url: "/organization/integration/zoom/recordings?page=1&limit=5",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
        ZoomId: zoomId,
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
