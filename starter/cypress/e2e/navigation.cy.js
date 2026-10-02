describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads the Home page by default", () => {
    cy.get('[data-cy="home_header"]').should("contain", "Study Night");
  });

  it("navigates to the Card Sets page", () => {
    cy.get('[data-cy="cardSetPage"]').click();
    cy.get('[data-cy="study-set-header"]').should(
      "contain",
      "Study Set Library"
    );
  });

  it("navigates to the About page", () => {
    cy.get('[data-cy="aboutPage"]').click();
    cy.get('[data-cy="about_page"]').should("contain", "About Study Night");
  });

  it("navigates back to the Home page", () => {
    cy.get('[data-cy="aboutPage"]').click();
    cy.get('[data-cy="homePage"]').click();
    cy.get('[data-cy="home_header"]').should("contain", "Study Night");
  });
});
