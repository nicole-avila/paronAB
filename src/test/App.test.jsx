import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";
import userEvent from "@testing-library/user-event";
import CreateStock from "../Pages/CreateStock/CreateStock";

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

  it("should be able to login and see 'Lagersaldo-component' ", async () => {
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

  it("should be able to click to 'Skapa' and navigate to CreateStock Page", async () => {
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
        screen.getByRole("heading", { name: "Lagersaldo" })
      ).toBeInTheDocument();
    });

    const SkapaElement = await screen.findByRole("link", { name: "Skapa" });
    expect(SkapaElement).toBeInTheDocument();

    await user.click(SkapaElement);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Skapa nytt" })
      ).toBeInTheDocument();

      expect(screen.getAllByRole("textbox")).toHaveLength(3);
      expect(screen.getAllByRole("button")).toHaveLength(3);
    });
  });
});

describe("Integration testing CreateStock-Page", () => {
  it.only("should be able to create a new stock", async () => {
    render(<CreateStock />);

    const user = userEvent.setup();
    expect(screen.getByRole("heading", "Skapa nytt")).toBeInTheDocument();

    const inputWarehouse = screen.getAllByRole("textbox")[0];
    expect(inputWarehouse).toBeInTheDocument();
    await user.type(inputWarehouse, "Uppsala");

    const inputProduct = screen.getAllByRole("textbox")[1];
    expect(inputProduct).toBeInTheDocument();
    await user.type(inputProduct, "Telefon");

    const inputQuantity = screen.getAllByRole("textbox")[2];
    expect(inputQuantity).toBeInTheDocument();
    await user.type(inputQuantity, "2000");

    const buttonElement = screen.getByRole("button", { name: "spara" });
    expect(buttonElement).toBeInTheDocument();
    // expect(buttonElement).not.toBeDisabled();

    await user.click(buttonElement);
    await waitFor(() => {
      // expect(buttonElement).toBeDisabled();
      // expect(screen.findByText("sparat!")).toBeInTheDocument();
    });
  });
});

// const newButton = await screen.findByRole("button", {
//   name: "invänta sparandet",
// });
