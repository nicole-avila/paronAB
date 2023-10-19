import { getByRole, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { Navigate } from "react-router-dom";
import AuthLogin from "../Pages/Auth/AuthLogin";
import Home from "../Pages/Home/Home";
import { v4 as uuidv4 } from "uuid";

describe("Testing App", () => {
  it("should render title Päron AB", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "päron ab" })
    ).toBeInTheDocument();
  });

  it("should display Login Component when clicken on 'Login-button' on the top", async () => {
    render(<App />);
    const user = userEvent.setup();
    const LogIn = screen.getByRole("link", "Logga");
    expect(LogIn).toBeInTheDocument();

    await user.click(LogIn);

    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "logga in" })
    ).toBeInTheDocument();
    expect(screen.getByText("skapa ett konto")).toBeInTheDocument();
  });

  /*
  I testingen här nedan bör det användas en unik e-postadress för varje testkörning.
  För att lösa det använder jag en unik e-postadress för varje testfall för att förhindra att Firebase rapporterar felet: "email-already-in-use" error.
  Jag installerade ”uuid"-biblioteket som ett beroende i mitt projekt för att generera unika e-postadresser.
  Så nu genererar det en unik e-postadress för varje testkörning för att undvika konflikter med befintliga konton och utför en lyckad testing vid signering.
  */

  it("should be able to sign up and with success signup and navigate to 'Lagersaldo-komponent", async () => {
    const uniqueEmail = `email-${uuidv4()}@paron.se`;
    render(<App />, { authUser: { email: uniqueEmail } });

    const user = userEvent.setup();
    const LogIn = screen.getByRole("link", "Logga in");
    expect(LogIn).toBeInTheDocument();
    await user.click(LogIn);

    const title = screen.getAllByRole("heading", "Logga in")[0];
    expect(title).toBeInTheDocument();

    const signUpText = screen.getByText("skapa ett konto");
    expect(signUpText).toBeInTheDocument();

    await user.click(signUpText);

    expect(
      screen.getByRole("heading", { name: "Skapa ett konto" })
    ).toBeInTheDocument();

    const inputLogin = screen.getByPlaceholderText("email");
    expect(inputLogin).toBeInTheDocument();
    await user.type(inputLogin, uniqueEmail);

    const inputPassword = screen.getByPlaceholderText("password");
    expect(inputLogin).toBeInTheDocument();
    await user.type(inputPassword, "123456");

    const signUpBtn = screen.getByRole("button", { name: "Skapa konto" });
    expect(signUpBtn).toBeInTheDocument();

    await user.click(signUpBtn);

    const stockOverviewTitle = await screen.findByRole("heading", {
      name: "Lagersaldo",
    });
    expect(stockOverviewTitle).toBeInTheDocument();
  });
});
