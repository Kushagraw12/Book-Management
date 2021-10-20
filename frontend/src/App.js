import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import AdminDash from "./Admin/AdDashboard";
import SignIn from './Auth/SignIn';
import Dashboard from './User/Dashboard';
import ReturnBooks from './User/Returnbooks';
import Signup from "./Auth/Signup";
import Loading from './Admin/Loading';
import AddBook from './Admin/AddBook';
import UpdateBook from './Admin/UpdateBook';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
      }
    }, []);
    console.log("Current User: ", user);
  return (
    <Router>
      <Switch>
        <Route exact path = '/'>
          <section>
            <div className='login'>
              {!user ? <SignIn /> : <Dashboard user = {user} />}
            </div>
          </section>
        </Route>

        <Route exact path = '/myBooks'>
          <section>
            <div className='books'>
              <ReturnBooks user = {user} />
            </div>
          </section>
        </Route>

        <Route exact path = '/register'>
          <section>
            <div className='books'>
              <Signup />
            </div>
          </section>
        </Route>
      
        <Route exact path = '/admin'>
          {user === null ? <Loading /> : <AdminDash user = {user} />}
          {/* {user === null ? <Loading /> : <MainDashboard /> } */}
        </Route>

        <Route exact path = '/addBooks'>
          {user === null ? <Loading /> : <AddBook />}
        </Route>

        <Route exact path = '/updateBooks'>
          {user === null ? <Loading /> : <UpdateBook />}
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
