// import react for JSX
import React from 'react';
// import the below from RTL
import { screen, fireEvent, act, render } from '@testing-library/react';
import { BrowserRouter as Router, createMemoryRouter, createRoutesFromElements, Route, Routes, RouterProvider } from 'react-router-dom';
// import component you want to test
import Login from './Login';

// createRoot from React client won't work since we're using Browser Router, and it'll look at the component and try to use useNavigate

// hi praise <3 <3 <3 hi brisa <3
// <3 <3 <3

// creating routes for the app
const appRoutes = createRoutesFromElements(
  <>
    <Route path='/login' element={<Login />} />
  </>
);


describe('Login', () => {
  beforeEach(() => {
    // when you use Browser Router, it's a way to access routes
    const memoryRouter = createMemoryRouter(appRoutes, {initialEntries: ['/login']})
    render (<RouterProvider router={memoryRouter}/>)
  })
    // create a container to container the login elements
  // const container = document.createElement('div');
  // before everything in this code block (Login), do whatever's within it 
  // beforeAll(async () => {
  //   await act(() => {
  //     document.body.appendChild(container);
  //     const root = createRoot(container);
  //     root.render(<Login/>);
  //   })
  // })

  describe('testing username field', () => {
    it ('should have a username field rendered', () => {
      const email = screen.getByPlaceholderText('User Name');
      expect(email).toBeDefined();
    })
  })

  describe('testing password field', () => {
    it ('should have a password field rendered', () => {
        const password = screen.getByPlaceholderText('********');
        expect(password).toBeDefined();
    })
  })
})

