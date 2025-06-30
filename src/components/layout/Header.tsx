import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Brand from './Brand';
import { getInitials } from '@/lib/getInitials';
import OrbitProgress from 'react-loading-indicators/OrbitProgress';

const Header: React.FC = () => {
  const { user, isLoading, logout } = useAuth();
  const handleLogout = () => {
    logout();
    return <Navigate to="/login" replace />;
  };

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-brand-600 flex items-end">
            <Brand />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link to="/courses" className="text-gray-600 dark:text-gray-400 dark:hover:text-brand-800 hover:text-brand-600 transition-colors cursor-pointer">
            Courses
          </Link>
          <Link to="/teachers" className="text-gray-600 dark:text-gray-400 dark:hover:text-brand-800 hover:text-brand-600 transition-colors cursor-pointer">
            Teachers
          </Link>
          <Link to="/pricing" className="text-gray-600 dark:text-gray-400 dark:hover:text-brand-800 hover:text-brand-600 transition-colors cursor-pointer">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center">
          {user ? (
            <div className="flex items-center">
              <div className="hidden sm:flex mr-4 items-center">
                <div className="flex items-center mr-4">
                  <span className="mr-1">🔥</span>
                  <span className="text-sm font-medium">{user.days} days</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">⭐</span>
                  <span className="text-sm font-medium">{user.points} XP</span>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                    <Avatar>
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{getInitials(user?.name ?? "Guest User")}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs text-gray-500">{user?.role}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/dashboard">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                  <Link to="/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  {(user.role === 'teacher' || user.role === 'admin') && (
                    <Link to="/admin">
                      <DropdownMenuItem>Admin Panel</DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : isLoading ? (
            <OrbitProgress variant="dotted" color="#082f49" size="small" />
          ) : (
            <div className="flex space-x-2">
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
