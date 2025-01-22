describe("Edit media with status code 201", () => {
  let accessToken;
  let branchId;
  let mediaId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/branchId.json").then((branch) => {
      branchId = branch.branchId;
    });
    cy.readFile("cypress/fixtures/mediaId.json").then((media) => {
      mediaId = media.mediaId;
    });
  });
  it("Checking if should be able to edit media", () => {
    cy.request({
      method: "PATCH",
      url: `/media/update/${mediaId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "Test for automation update",
        attachments: [],
        description: "hhhhhfhsfddafsah",
        mediaType: "video",
        thumbnail: "",
        users: [],
        program: "64fcb957b0cf6e9ae43d126d",
        session: "66491689e44f020019e08e4f",
        url: "https://player.vimeo.com/video/1010724906?h=e29f2e9074",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201, "Expected status code is 200");
      if (response.status === 201) {
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
