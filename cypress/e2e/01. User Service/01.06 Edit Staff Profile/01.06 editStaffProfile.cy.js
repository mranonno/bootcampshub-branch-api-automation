describe("Edit staff profile with status code 200", () => {
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
  it("Checking if should be able to edit staff profile", () => {
    cy.request({
      method: "PATCH",
      url: "/organization/staff/profile",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        personalInformation: {
          firstName: "MD",
          lastName: "Shimul",
          middleName: "",
          education: "HSC",
          gender: "male",
          dateOfBirth: "2024-08-14T08:29:02.815Z",
          jobTitle: "WD",
          employmentType: "Dev",
          hr: "",
          reportingManager: "",
          numberOfHolidays: 0,
          yearlyVacation: 2,
          resume: "",
          memberSince: "",
        },
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
