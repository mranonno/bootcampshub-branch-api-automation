describe("Start attendance with status code 200", () => {
  let accessToken;
  let branchId;
  let currentDate;
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
  });
  it("Checking if should be able to start attendance", () => {
    cy.request({
      method: "POST",
      url: "/staff-attendance/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        date: currentDate,
        title: "",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200, "Expected status code is 200");
      if (response.status === 200) {
        const { body, duration } = response;
        const filterEvent = body.attendance.events.find((event) => !event.end);
        cy.writeFile("cypress/fixtures/attendanceId.json", {
          attendanceId: body.attendance._id,
        });
        cy.writeFile("cypress/fixtures/attendanceEvent.json", {
          attendanceEvent: filterEvent._id,
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
