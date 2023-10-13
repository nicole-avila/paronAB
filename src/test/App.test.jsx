import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";
import userEvent from "@testing-library/user-event";

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

  it("should be able to login and se 'Lagersaldo-component' ", async () => {
    render(<App />);

    const user = userEvent.setup();
    const LogIn = screen.getByRole("link", "Logga");
    expect(LogIn).toBeInTheDocument();

    await user.click(LogIn);

    const inputLogin = screen.getByPlaceholderText("email");
    await user.type(inputLogin, "nicoleavila@paron.se");

    const inputPassword = screen.getByPlaceholderText("password");
    await user.type(inputPassword, "123456");

    const loginButton = screen.getByRole("button", { name: "logga in" });

    await user.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Logga ut" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Lagersaldo" })
      ).toBeInTheDocument();
    });
  });
});
