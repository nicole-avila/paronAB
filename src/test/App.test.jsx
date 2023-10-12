import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import AuthLogin from "../Pages/Auth/AuthLogin";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  it("should render title Päron AB", () => {
    render(<App />);

    expect(screen.getByRole("heading", "Päron Ab"));
  });

  it("should display Login Component when clicken on 'Login-button', Login-Link", async () => {
    render(<App />);

    const user = userEvent;
    const LogIn = screen.getByRole("link", "Logga in");
    expect(LogIn).toBeInTheDocument();

    user.click(LogIn);

    // await waitFor(() => {
    //   expect(screen.getByRole("textbox", "email")).toBeInTheDocument();
    //   expect(screen.getByRole("textbox", "password")).toBeInTheDocument();
    //   expect(screen.getByRole("button", "logga in")).toBeInTheDocument();
    // });
  });
});

// it("should navigate", () => {
//     //     const entries = "/paronAB/";

//     //     <MemoryRouter initialEntries={[entries]}>
//     //     <Routes>
//     //       <Route path="/paronAB/" element={<Home />} />
//     //       <Route path="/paronAB/auth" element={<Auth />} />
//     //     </Routes>
//     //   </MemoryRouter>
//     render(<App />);
//     const user = userEvent;
//   });
