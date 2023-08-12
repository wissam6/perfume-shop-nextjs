import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SignIn } from './SignIn'; // Adjust the path to the correct location of your SignIn component
import { collection, getDocs } from 'firebase/firestore'; // Import the necessary functions from Firebase mocks
import { BrowserRouter } from 'react-router-dom'; // If you use BrowserRouter in your application

// Mock the necessary dependencies (for demonstration purposes)
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(() => ({
    forEach: jest.fn(),
  })),
}));
jest.mock('@progress/kendo-react-inputs', () => ({
  Input: (props) => <input {...props} />,
}));
jest.mock('@progress/kendo-react-form', () => ({
  Form: ({ onSubmit, render }) => render({ handleSubmit: onSubmit }),
  FormElement: ({ children }) => <form>{children}</form>,
  Field: ({ name, component, label, type, required }) => (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      {React.createElement(component, {
        id: name,
        name,
        type,
        required,
      })}
    </div>
  ),
  FormRenderProps: {},
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('SignIn Component', () => {
  test('should show error message for incorrect email', async () => {
    // Mock the Firebase response to simulate no matching email in the database
    getDocs.mockResolvedValueOnce({
      forEach: jest.fn(),
    });

    render(<SignIn />, { wrapper: BrowserRouter }); // Add the BrowserRouter wrapper if you use it in your component
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'incorrect@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('incorrect email')).toBeInTheDocument();
      expect(screen.queryByText('incorrect password')).not.toBeInTheDocument();
    });
  });

  test('should show error message for incorrect password', async () => {
    // Mock the Firebase response to simulate a matching email with incorrect password
    getDocs.mockResolvedValueOnce({
      forEach: jest.fn((callback) =>
        callback({
          data: () => ({
            email: 'user@example.com',
            password: 'hashedPassword', // Replace with an actual hashed password
          }),
        })
      ),
    });

    render(<SignIn />, { wrapper: BrowserRouter }); // Add the BrowserRouter wrapper if you use it in your component
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'incorrectPassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('incorrect password')).toBeInTheDocument();
      expect(screen.queryByText('incorrect email')).not.toBeInTheDocument();
    });
  });

  // Add more test cases for other scenarios, if necessary
});
