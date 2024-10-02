import { render, screen } from '@testing-library/react';
import Login from '../components/Login';
import { AuthProvider } from '../context/AuthContext'; // Adjust the import path as necessary

test('renders login form', () => {
    render(
        <AuthProvider>
            <Login />
        </AuthProvider>
    );
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByText(/login/i);

    // Check if the email input is in the document
    expect(emailInput).toBeInTheDocument();

    // Check if the password input is in the document
    expect(passwordInput).toBeInTheDocument();

    // Check if the login button is in the document
    expect(loginButton).toBeInTheDocument();
});
