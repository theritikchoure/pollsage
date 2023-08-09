// cypress/integration/adminLogin.spec.js

describe("Admin Login Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/admin/loginxyz"); // Assuming the URL for admin login page
    });
  
    it("should display the login form", () => {
      cy.get("input[name=username]").should("exist");
      cy.get("input[name=password]").should("exist");
      cy.get("input[type=submit]").should("exist");
    });
  
    it("should show error messages on invalid login", () => {
      cy.get("input[name=username]").type("default_admins");
      cy.get("input[name=password]").type("admin@12345");
      cy.get("input[type=submit]").click();
    });
  
    it("should log in successfully with valid credentials", () => {
      cy.get("input[name=username]").type("admin_default");
      cy.get("input[name=password]").type("admin@1234");
      cy.get("input[type=submit]").click();
  
      cy.url().should("include", "/admin/dashboard");
    });
  });
  