import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React, { createContext, useEffect, useState } from "react";
import { mockMovie, mockMovies } from "../mock-for-home";
import Reel from "./Reel";

const MovieContext = createContext({});

/* 
  Basic state, working.
*/
const contextValue = {
  deleteMovieFromHome: (element) => element,
  addWatchlistFromHome: (element) => element,
  watchedToggle: (element) => element,
  ratingToggle: (element) => element,
};

test("Test that the movies are mapped", async () => {
  render(
    <MovieContext.Provider value={contextValue}>
      <Reel modal={() => {}} movies={mockMovies.slice(0, 20)} />
    </MovieContext.Provider>
  );
  const watchedTexts = await screen.findAllByText("Watched");
  expect(watchedTexts).toHaveLength(20);
});

test("Creates Reel correctly", async () => {
  render(
    <MovieContext.Provider value={contextValue}>
      <Reel modal={() => {}} movies={mockMovies.slice(0, 20)} />
    </MovieContext.Provider>
  );
  expect(screen.getByRole("list")).toBeInTheDocument();
});

/* 
  Pass in faulty values as props.
*/
