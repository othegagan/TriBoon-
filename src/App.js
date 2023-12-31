import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './pages/Login';
import SignUp from './pages/SignUp';
import Page404 from './pages/404'
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import RedirectRoute from './context/RedirectRoute';
import ProtectedRoute from './context/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import Users from './pages/users/Users';
import AddNewUser from './pages/users/AddNewUser';
import UpdateUserInfo from './pages/users/UpdateUserInfo'
import ViewUserInfo from './pages/users/ViewUserInfo'
import Modal from './pages/Modals'
import Projects from './pages/projects/Projects';
import AddNewProject from './pages/projects/AddNewProject'
import ViewProjectDetails from './pages/projects/ViewProjectDetails';
import UpdateProjectDetails from './pages/projects/UpdateProjectDetails'
import Scheduler from './pages/Scheduler'
import Buttons from './pages/Buttons';
import Test from './pages/test';
import Cards from './pages/Cards';
import Messages from './pages/Messages';
import Tickets from './pages/tickets/Tickets';
import ViewTicket from './pages/tickets/ViewTicket';
// import Charts from './pages/Charts';
import Forms from './pages/Forms';

const App = () => {
    return (
        <>
            <AuthContextProvider>
                <Router>
                    <Routes>
                        {/* Basic pages */}
                        <Route element={<RedirectRoute />}>
                            <Route path="/" element={<SignIn />} />
                            <Route path='/signin' element={<SignIn />} />
                            <Route path='/signup' element={<SignUp />} />
                        </Route>
                        <Route path="/forgot-password" element={<ForgotPassword />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path='/home' element={<Home />} />
                            <Route path='/users' element={<Users />} />
                            <Route path='/projects' element={<Projects />} />
                            <Route path='/scheduler' element={<Scheduler />} />
                            <Route path='/tickets' element={<Tickets title="Ticketshgfgh" />} />

                            {/* For Users */}
                            <Route path='/addnewuser' element={<AddNewUser title="Add New Users" buttonText="Add User" />} />
                            <Route path='/viewuser/:id' element={<ViewUserInfo title="User Details" />} />
                            <Route path='/updateuser/:id' element={<UpdateUserInfo title="Update User Details" buttonText="Update Info" />} />

                            {/* For Bugs */}
                            <Route path='/createnewproject' element={<AddNewProject title="Create New Project" buttonText="Create Project" />} />
                            <Route path='/viewprojectdetails/:id' element={<ViewProjectDetails title="Project Details" />} />
                            <Route path='/updateprojectdetails/:id' element={<UpdateProjectDetails title="Update Project Details" buttonText="Update Details" />} />

                            {/* messages */}
                            <Route path='/messages' element={<Messages title="Messagesjhguhjhb" />} />

                            {/* tickets */}
                            <Route path='/viewticket/:id' element={<ViewTicket title="Tickets Details" />} />
                        </Route>


                        {/* Extra pages */}
                        <Route path="/modal" element={<Modal />} />
                        <Route path="/buttons" element={<Buttons />} />
                        <Route path="/cards" element={<Cards />} />
                        <Route path="/test" element={<Test />} />
                        <Route path="/form" element={<Forms />} />

                        <Route path='*' element={<Page404 />} />
                    </Routes>
                </Router>
            </AuthContextProvider>
        </>
    )
}

export default App

