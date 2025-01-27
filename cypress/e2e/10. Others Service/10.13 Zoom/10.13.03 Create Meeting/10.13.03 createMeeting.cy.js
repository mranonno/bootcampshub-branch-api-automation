describe("Create meeting with status code 200", () => {
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
  it("Checking if should be able to create meeting", () => {
    cy.request({
      method: "POST",
      url: "/organization/integration/zoom/meeting-create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
        ZoomId: zoomId,
      },
      body: {
        topic: "Create meetings for api testing",
        agenda: "testing",
        start_time: "2025-02-07T14:57:47.900Z",
        duration: 30,
        meeting_invitees: ["shuvajitmaitra@gmail.com"],
        waiting_room: true,
        meeting_authentication: true,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200, "Expected status code is 200");
      if (response.status === 200) {
        const { body, duration } = response;
        cy.writeFile("cypress/fixtures/meetingId.json", {
          meetingId: body.meetingData.id,
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
