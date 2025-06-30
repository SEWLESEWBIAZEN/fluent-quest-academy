import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ThemeToggle from "@/components/layout/ThemeToggle";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-200 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 dark:text-blue-100 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
      <div className='fixed right-4 bottom-4'>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NotFound;
