import { it, expect, describe, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react';
import DeleteUser from '../../../src/components/users/DeleteUser';

describe('DeleteUser Component', () => {
  // Add your tests here
it('renders delete user button', async () => { 
  render(
    <DeleteUser ids={{ dbid: '123', fbid: '456' }} accessToken="mockAccessToken" />
  );

  const button = await screen.findByRole('button', { name: /delete/i });
  expect(button).toBeInTheDocument(); // Actual assertion
});

afterEach(() => {
  vi.restoreAllMocks();
});
})

