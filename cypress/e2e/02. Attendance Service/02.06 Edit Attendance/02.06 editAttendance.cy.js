describe("Edit attendance event with status code 200", () => {
  let accessToken;
  let branchId;
  let currentDate;
  let attendanceEvent;
  let attendanceId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/currentDate.json").then((date) => {
      currentDate = date.currentDate;
    });
    cy.readFile("cypress/fixtures/attendanceEvent.json").then((event) => {
      attendanceEvent = event.attendanceEvent;
    });
    cy.readFile("cypress/fixtures/attendanceId.json").then((attendance) => {
      attendanceId = attendance.attendanceId;
    });
  });
  it("Checking if should be able to edit attendance event", () => {
    cy.request({
      method: "PATCH",
      url: `/staff-attendance/edit/${attendanceId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        events: [
          {
            title: "saddfdf gsdfg",
            description: "",
            _id: attendanceEvent,
            start: currentDate,
            end: currentDate,
          },
        ],
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
