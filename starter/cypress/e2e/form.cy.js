describe("Create Set Form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="cardSetPage"]').click();
    cy.get('[data-cy="toggle_form"]').click();
  });

  it("creates a new card set with valid input", () => {
    cy.get('[data-cy="titleInput"]').type("Cypress Test Set");
    cy.get('[data-cy="set_submit"]').click();
    cy.get('[data-cy="set_container"]').should("contain", "Cypress Test Set");
  });

  it("renders an error when the title is empty", () => {
    cy.get('[data-cy="set_submit"]').click();
    cy.get('[data-cy="form_error"]').should("contain", "TITLE CANNOT BE EMPTY");
  });
});

describe("Add Card Form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="cardSetPage"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="toggle_form"]').click();
  });

  it("adds a new card with valid input", () => {
    cy.get('[data-cy="termInput"]').type("New Term");
    cy.get('[data-cy="descriptionInput"]').type("New Description");
    cy.get('[data-cy="card_submit"]').click();
    cy.get('[data-cy="card_term"]').should("contain", "New Term");
  });

  it("renders an error when both inputs are empty", () => {
    cy.get('[data-cy="card_submit"]').click();
    cy.get('[data-cy="form_error"]').should(
      "contain",
      "TERM AND DESCRIPTION CANNOT BE EMPTY"
    );
  });

  it("renders an error when only the term is empty", () => {
    cy.get('[data-cy="descriptionInput"]').type("Only a description");
    cy.get('[data-cy="card_submit"]').click();
    cy.get('[data-cy="form_error"]').should("contain", "TERM CANNOT BE EMPTY");
  });

  it("renders an error when only the description is empty", () => {
    cy.get('[data-cy="termInput"]').type("Only a term");
    cy.get('[data-cy="card_submit"]').click();
    cy.get('[data-cy="form_error"]').should(
      "contain",
      "DESCRIPTION CANNOT BE EMPTY"
    );
  });
});
