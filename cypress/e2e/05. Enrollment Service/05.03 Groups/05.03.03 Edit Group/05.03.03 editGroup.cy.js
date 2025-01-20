describe("Edit group with status code 200", () => {
  let accessToken;
  let branchId;
  let groupId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/groupId.json").then((group) => {
      groupId = group.groupId;
    });
  });
  it("Checking if should be able to edit group", () => {
    cy.request({
      method: "PATCH",
      url: `/group/edit/${groupId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "test mock test",
        users: [
          "650e70e7165fc20019352988",
          "66371222546f7b001a63cd2b",
          "64f6239ac137da40e427e73e",
          "650e70e7165fc20019352988",
          "65be497166b89f00194fde0d",
          "64ef676669eaf6370c11429c",
          "650e70e7165fc20019352988",
          "657b56272531d317382ab01c",
          "657b55552531d317382ab00c",
          "64ef676669eaf6370c11429c",
        ],
        activeStatus: {
          isActive: true,
          activeUntill: "2025-12-01T09:11:03.909Z",
        },
        programs: ["64fcb957b0cf6e9ae43d126d"],
        sessions: ["66491689e44f020019e08e4f"],
        category: "global",
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
