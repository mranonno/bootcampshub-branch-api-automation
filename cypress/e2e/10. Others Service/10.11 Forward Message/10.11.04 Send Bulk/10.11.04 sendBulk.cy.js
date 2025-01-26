describe("Send bulk with status code 200", () => {
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
  it("Checking if should be able to send bulk", () => {
    cy.request({
      method: "POST",
      url: "/chat/sendbulk",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Branch: branchId,
      },
      body: {
        title: "testing",
        text: "dafds",
        bot: "66d890150b6a580019e2bda1",
        files: [],
        channels: [
          {
            membersCount: 3,
            isArchived: false,
            organization: "64fcb2e60d2f877aaccb3b26",
            memberScope: "custom",
            latestMessage: {
              type: "message",
              status: "delivered",
              _id: "678368957bc948001b7c8f6c",
              sender: {
                profilePicture:
                  "https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/1735194459032-image1.png",
                lastName: "Shimul",
                _id: "64ef676669eaf6370c11429c",
                firstName: "Md",
                fullName: "Md Shimul",
              },
              text: "https://staging-branch.bootcampshub.ai/channel-invitation/submc-677e903f526790001afece81",
              files: [],
              emoji: [],
              createdAt: "2025-01-12T07:00:37.507Z",
              id: 3,
            },
            _id: "677e903f526790001afece81",
            isChannel: true,
            isReadOnly: false,
            isPublic: false,
            description: "",
            name: "Hoee",
            branch: "64fcb4e8944cf215d8d32f95",
            unreadCount: 0,
            myData: {
              user: "64ef676669eaf6370c11429c",
              isFavourite: false,
              isBlocked: false,
              role: "owner",
              mute: {
                isMuted: false,
              },
            },
            sendToChannel: true,
            sendToMember: false,
          },
        ],
        members: [
          {
            profilePicture:
              "https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/1723963877157-IMG_0019.JPG",
            lastName: "Maitra",
            _id: "66371222546f7b001a63cd2b",
            email: "shuvajitmaitra@gmail.com",
            firstName: "Shuvajit",
            fullName: "Shuvajit Maitra",
            canDelete: true,
          },
        ],
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
