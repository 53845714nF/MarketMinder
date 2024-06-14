import React from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import Login from "./components/auth/Login.tsx";
import Signup from "./components/auth/Signup.tsx";
import Default from "./components/Default.tsx";
import Lists from "./components/list/Lists.tsx"
import ShoppingList from "./components/list/ShoppingList.tsx"
import MenuAppBar from "./components/MenuAppBar.tsx"

const queryClient = new QueryClient();

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#178720',
        },
        secondary: {
            main: '#e0e0e0',
        },
    },
});

const App: React.FC = () => {
  return (
    <>
    <ThemeProvider theme={theme}>
                <BrowserRouter>
                        <QueryClientProvider client={queryClient}>
                        <MenuAppBar />
                          <Routes>
                            <Route path="/" element={<Default/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/lists" element={<Lists/>}/>
                            <Route path="/list/:id" element={<ShoppingList/>}/>
                          </Routes>
                        </QueryClientProvider>
                </BrowserRouter>
            </ThemeProvider>
    </>
  )
}

export default App
