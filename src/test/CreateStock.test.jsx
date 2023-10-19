import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import CreateStock from "../Pages/CreateStock/CreateStock";
import App from "../App";

describe("Integration testing CreateStock-Page", () => {
  it("should render title and input fields ", async () => {
    render(<CreateStock />);

    expect(
      screen.getByRole("heading", { name: "Skapa nytt" })
    ).toBeInTheDocument();

    expect(screen.getAllByRole("textbox")).toHaveLength(3);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("should be able to add more produkt ", async () => {
    render(<CreateStock />);
    const user = userEvent;

    const addProduct = screen.getByRole("button", {
      name: "lägg till en ny produkt",
    });
    expect(addProduct).toBeInTheDocument();

    await user.click(addProduct);
    expect(screen.getAllByRole("textbox")).toHaveLength(5);
  });

  it("should be able LOGIN, then click at SKAPA in navbar and CREATE a new stock", async () => {
    render(<App />, { authUser: { email: "nicoleavila@paron.se" } });
    const user = userEvent.setup();
    const LogIn = screen.getByRole("link", "Logga");
    expect(LogIn).toBeInTheDocument();

    await user.click(LogIn);

    const inputLogin = screen.getByPlaceholderText("email");
    expect(inputLogin).toBeInTheDocument();

    const inputPassword = screen.getByPlaceholderText("password");
    expect(inputLogin).toBeInTheDocument();

    await user.type(inputLogin, "nicoleavila@paron.se");
    await user.type(inputPassword, "123456");

    const loginButton = screen.getByRole("button", { name: "logga in" });

    await user.click(loginButton);

    const stockOverviewTitle = await screen.findByRole("heading", {
      name: "Lagersaldo",
    });
    expect(stockOverviewTitle).toBeInTheDocument();

    const linkCreate = screen.getByRole("link", { name: "Skapa" });
    expect(linkCreate).toBeInTheDocument();

    await user.click(linkCreate);

    expect(
      screen.getByRole("heading", { name: "Skapa nytt" })
    ).toBeInTheDocument();

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
    // expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toBeDisabled();

    await user.click(buttonElement);

    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveTextContent("invänta sparandet");
  });
});
