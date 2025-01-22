describe("Edit show n tell by admin with status code 200", () => {
  let accessToken;
  let branchId;
  let showNTell_id = "674c498d71d4980018001596";
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
  });
  it("Checking if should be able to edit show n tell by admin", () => {
    cy.request({
      method: "PATCH",
      url: `/show-tell/editbyadmin/${showNTell_id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "Sample Title 2 update",
        date: "2024-09-21T07:52:03.000Z",
        attachments: [""],
        agenda: "Sample Agenda",
        status: "pending",
        notifications: [
          {
            timeBefore: 5,
            methods: ["push"],
            chatGroups: [],
          },
        ],
        reviewDetails: {},
        users: [null, null],
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
