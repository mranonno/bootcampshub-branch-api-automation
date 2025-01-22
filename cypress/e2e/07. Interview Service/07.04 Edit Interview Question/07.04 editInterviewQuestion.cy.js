describe("Edit interview question with status code 200", () => {
  let accessToken;
  let branchId;
  let interviewId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/interviewId.json").then((interview) => {
      interviewId = interview.interviewId;
    });
  });
  it("Checking if should be able to edit interview question", () => {
    cy.request({
      method: "PATCH",
      url: `/interview/edit/${interviewId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        name: "Create interview question for API testing update",
        isActive: true,
        index: 1,
        type: "ai",
        groups: ["676c60516e5fbf880cbecf24"],
        aiData: {
          instruction: "checking",
          duration: 19,
          complexity: "Easy",
          customQuestions: "",
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
