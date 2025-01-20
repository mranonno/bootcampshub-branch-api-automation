describe("Create group with status code 200", () => {
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
  it("Checking if should be able to create group", () => {
    cy.request({
      method: "POST",
      url: "/group/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "New group create",
        activeStatus: {
          isActive: true,
          activeUntill: "2025-01-29T07:23:15.697Z",
        },
        programs: ["6501f8b21c01cf0019303d0b"],
        sessions: ["66491689e44f020019e08e4f", "66491759e44f020019e08e87"],
        category: "global",
        description: "New group create",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200, "Expected status code is 200");
      if (response.status === 200) {
        const { body, duration } = response;

        cy.writeFile("cypress/fixtures/groupId.json", {
          groupId: body.group._id,
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
