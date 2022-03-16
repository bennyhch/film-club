/* 
  Check is showing when prop show is passed true
  Check addWatchedFromHome is called with the value from the modal.
  Check X button closes modal
*/

import { fireEvent, render, screen } from '@testing-library/react';
import { start } from 'repl';
import { MovieContext } from '../App';
import Modal from './modal';

const props = {
  closeModal: jest.fn(() => {}),
  show: true,
  addWatch: jest.fn((movie) => movie),
};

const contextValue = {
  addWatchedFromHome: jest.fn((movie) => movie),
};

test('Modal displays correctly', () => {
  const { container } = render(
    <MovieContext.Provider value={contextValue}>
      <Modal {...props} />
    </MovieContext.Provider>
  );

  expect(
    screen.getByText('What did you think of the movie?')
  ).toBeInTheDocument();
  const divs = container.getElementsByTagName('div');
  expect(divs[0].classList).toContain('overlay');
  expect(divs[1].classList).toContain('modal');
});

test('addWatchedFromHome is called correctly', async () => {
  const { container } = render(
    <MovieContext.Provider value={contextValue}>
      <Modal {...props} />
    </MovieContext.Provider>
  );

  const stars = container.getElementsByTagName('span');
  console.log(stars[0]);

  fireEvent.click(stars[0]);

  await expect(contextValue.addWatchedFromHome.mock.calls.length).toBe(1);
});
