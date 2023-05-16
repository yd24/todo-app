import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '.';

describe('ToDo Component Tests', ()  => {
  test('render a header element as expected', () => {
    render(<Header />);

    let header = screen.getByTestId('todo-header');
    let h1 = screen.getByTestId('todo-h1');

    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
    expect(h1).toHaveTextContent('To Do List: 0 items pending');
  })
})