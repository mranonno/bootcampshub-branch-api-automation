describe("Create content with status code 200", () => {
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
  it("Checking if should be able to create content", () => {
    cy.request({
      method: "POST",
      url: "/content/add",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        name: "API testing by cypress",
        description: "API Testing description",
        category: "other",
        tags: ["SQA_Group"],
        dependencies: ["6638d74ef440fe001935a695"],
        attachments: [],
        groups: ["668b495587a84f002010f405"],
        courses: [],
        programs: ["6647be35e44f020019e06b65"],
        isFree: true,
        thumbnail: "",
        slide: "66252be2cd096c0019f46502",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200, "Expected status code is 200");
      if (response.status === 200) {
        const { body, duration } = response;
        cy.writeFile("cypress/fixtures/contentId.json", {
          contentId: body.content._id,
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
