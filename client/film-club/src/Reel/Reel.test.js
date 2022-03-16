import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { createContext, useEffect, useState } from 'react';
import { mockMovie, mockMovies, mockMovieSeen } from '../mock-for-home';
import Reel from './Reel';
import { MovieContext } from '../App';

describe('Reel', () => {
  const contextValue = {
    deleteMovieFromHome: jest.fn((element) => element),
    addWatchlistFromHome: jest.fn((element) => element),
    watchedToggle: jest.fn((element) => element),
    ratingToggle: jest.fn((element) => element),
  };

  const modalFunction = jest.fn(() => {});

  test('Test that the movies are mapped', async () => {
    render(
      <MovieContext.Provider value={contextValue}>
        <Reel openModal={() => {}} movies={mockMovies.slice(0, 20)} />
      </MovieContext.Provider>
    );
    const watchedTexts = await screen.findAllByText('Watched');
    expect(watchedTexts).toHaveLength(20);
  });

  test('Creates Reel list correctly', async () => {
    render(
      <MovieContext.Provider value={contextValue}>
        <Reel openModal={() => {}} movies={mockMovies.slice(0, 20)} />
      </MovieContext.Provider>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  test('Render different watchlist click handlers for seen and not seen', async () => {
    render(
      <MovieContext.Provider value={contextValue}>
        <Reel modal={() => {}} movies={[mockMovie, mockMovieSeen]} />
      </MovieContext.Provider>
    );

    expect(screen.getByRole('add-watchlist-button')).toBeInTheDocument();
    expect(screen.getByRole('delete-button')).toBeInTheDocument();
  });

  test('Movie titles are rendered correctly', async () => {
    const { container } = render(
      <MovieContext.Provider value={contextValue}>
        <Reel openModal={modalFunction} movies={[mockMovie, mockMovieSeen]} />
      </MovieContext.Provider>
    );

    const titles = container.getElementsByClassName('movie-title-text');
    expect(titles[0].innerHTML).toBe('A Random Film');
    expect(titles[1].innerHTML).toBe('Film I have seen');
  });

  test('Button handlers are called correctly', async () => {
    render(
      <MovieContext.Provider value={contextValue}>
        <Reel openModal={modalFunction} movies={[mockMovie, mockMovieSeen]} />
      </MovieContext.Provider>
    );

    const addWatchlistButton = await screen.findByRole('add-watchlist-button');
    const deleteFromWatchlistButton = await screen.findByRole('delete-button');
    const addToSeenButton = await screen.findByRole('add-seen');
    const deleteSeenButton = await screen.findByRole('delete-seen');

    fireEvent.click(addWatchlistButton);
    await expect(contextValue.addWatchlistFromHome.mock.calls.length).toBe(1);

    fireEvent.click(deleteFromWatchlistButton);
    await expect(contextValue.deleteMovieFromHome.mock.calls.length).toBe(1);

    fireEvent.click(deleteSeenButton);
    await expect(contextValue.deleteMovieFromHome.mock.calls.length).toBe(2);

    fireEvent.click(addToSeenButton);
    await expect(contextValue.addWatchlistFromHome.mock.calls.length).toBe(1);
  });
});
