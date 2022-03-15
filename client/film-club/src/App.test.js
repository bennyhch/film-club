import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import React, { useEffect, useState } from "react";

function mockFetch (data) {

}

test("Renders Headline", () => {
  render(<App />);
  const linkElement = screen.getByText(/THE HOME OF FILM FANS/i);
  expect(linkElement).toBeInTheDocument();
});

test("Fetch response returns correctly", () => {
    
});



