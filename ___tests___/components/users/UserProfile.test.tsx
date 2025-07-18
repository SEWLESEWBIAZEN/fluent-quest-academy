import { it, expect, describe } from 'vitest'
import {fireEvent, render,screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import UserProfile from '../../../src/components/users/UserProfile'
import { AuthProvider } from "../../../src/contexts/AuthContext";
import {getInitials} from '../../../src/lib/getInitials'

describe('UserProfile Component', () => {
  const mockUser = {
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    role: "admin",
    avatar: "",
    verified: true,
    userId: "12345",
    id: "fb12345"
    };
    const mockAuthContext = {
      user: {
        userId: "12345",
        id: "fb12345"
      }
    };

    it('renders user profile with correct data', () => {
        render(
          <AuthProvider>
            <UserProfile user={mockUser} />
          </AuthProvider>
        );

        expect(screen.getByText(mockUser.name)).toBeInTheDocument();
        expect(screen.getByText(`@${mockUser.username}`)).toBeInTheDocument();
        expect(screen.getByText(mockUser.email)).toBeInTheDocument();
        expect(screen.getByText(mockUser.phoneNumber)).toBeInTheDocument();
        expect(screen.getByText(mockUser.role)).toBeInTheDocument();
    }); 

    it('renders user initials when avatar is not provided', () => {
        render(
          <AuthProvider>
            <UserProfile user={{ ...mockUser, avatar: "" }} />
          </AuthProvider>
        );

        const initials = getInitials(mockUser.name);
        expect(screen.getByText(initials)).toBeInTheDocument();
    });
    it('renders verified badge when user is verified', () => {
        render(
          <AuthProvider>
            <UserProfile user={mockUser} />
          </AuthProvider>
        );

        expect(screen.getByRole('img', { name: /verified/i })).toBeInTheDocument();
    });
    it('renders Update Avatar component', () => {
        render(
          <AuthProvider>
            <UserProfile user={mockUser} />
          </AuthProvider>
        );

        fireEvent.click(screen.getByRole('title',{name:/update avatar/i}));
        expect(screen.getByText(/update avatar/i)).toBeInTheDocument();        
    });
    
    it('renders DeleteUser component', () => {
        render(
          <AuthProvider>
            <UserProfile user={mockUser} />
          </AuthProvider>
        );

        expect(screen.getByText(/delete/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button',{name:/delete/i}));
        fireEvent.click(screen.getByRole('button',{name:/cancel/i}));
    });
    it('displays user role in a badge', () => {
        render(
          <AuthProvider>
            <UserProfile user={mockUser} />
          </AuthProvider>
        );

        expect(screen.getByText(mockUser.role)).toHaveClass('bg-blue-100');
    });
    it('matches snapshot', () => {
        const { asFragment } = render(
          <AuthProvider>
            <UserProfile user={mockUser} />
          </AuthProvider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
// This code is a test suite for the UserProfile component using Vitest and React Testing Library.