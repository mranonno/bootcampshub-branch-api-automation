describe("Add chapter with status code 200", () => {
  let accessToken;
  let branchId;
  let programId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/programId.json").then((program) => {
      programId = program.programId;
    });
  });
  it("Checking if should be able to add chapter", () => {
    cy.request({
      method: "POST",
      url: `/course/chapterv2/add/${programId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        type: "chapter",
        groups: ["668b495587a84f002010f405"],
        sessions: ["66491689e44f020019e08e4f"],
        isPreview: false,
        priority: "1",
        chapter: {
          name: "Create chapter",
          description: "Description",
          subTitle: "Enter Subtitle",
          subDescription: "afdsfadf",
          image: "",
          isFree: true,
        },
        category: "65eb80b2a048d99678800cfc",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200, "Expected status code is 200");
      if (response.status === 200) {
        const { body, duration } = response;
        cy.writeFile("cypress/fixtures/chapterId.json", {
          chapterId: body.chapter._id,
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
