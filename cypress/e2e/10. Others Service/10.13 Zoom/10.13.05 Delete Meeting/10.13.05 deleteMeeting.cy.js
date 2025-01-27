describe("Delete meetings with status code 200", () => {
  let accessToken;
  let branchId, zoomId, meetingId;
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
    cy.readFile("cypress/fixtures/meetingId.json").then((meeting) => {
      meetingId = meeting.meetingId;
    });
  });
  it("Checking if should be able to delete meetings", () => {
    cy.request({
      method: "DELETE",
      url: `/organization/integration/zoom/meeting-delete/${meetingId}`,
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
