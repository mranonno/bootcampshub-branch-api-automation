describe("Delete chapter with status code 200", () => {
  let accessToken;
  let branchId;
  let programId;
  let chapterId;
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
    cy.readFile("cypress/fixtures/chapterId.json").then((chapter) => {
      chapterId = chapter.chapterId;
    });
  });
  it("Checking if should be able to delete chapter", () => {
    cy.request({
      method: "DELETE",
      url: `/course/chapterv2/delete/${chapterId}/${programId}}?ids[]=${chapterId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
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
