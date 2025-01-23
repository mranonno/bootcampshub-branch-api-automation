describe("Edit chapter with status code 200", () => {
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
  it("Checking if should be able to edit chapter", () => {
    cy.request({
      method: "PATCH",
      url: `/course/chapterv2/edit/${chapterId}/${programId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        type: "chapter",
        groups: ["668b495587a84f002010f405"],
        sessions: ["66491689e44f020019e08e4f"],
        isPreview: false,
        priority: 1,
        chapter: {
          name: "Create chapter Update",
          description: "Description",
          subTitle: "Enter Subtitle",
          subDescription: "afdsfadf",
          image: "",
          isFree: true,
        },
        action: "update",
      },
      // For Switching publish and unpublish
      // {"ids":["67923ce2c4576a0018142ba5"],"action":"publish","isPublished":false}

      // For Switching preview and unpreview
      // {"action":"preview","isPreview":true}
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
