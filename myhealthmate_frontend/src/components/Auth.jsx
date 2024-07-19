import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {isLogin ? (
            <div className="card my-5">
              <div className="card-body">
                <h2 className="text-center">Login</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                  <p className="text-center mt-3">Don't have an account? <a href="#" onClick={handleToggle}>Register</a></p>
                </form>
              </div>
            </div>
          ) : (
            <div className="card my-5">
              <div className="card-body">
                <h2 className="text-center">Register</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="signUpName">Full Name</label>
                    <input type="text" className="form-control" id="signUpName" placeholder="Enter your full name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signUpEmail">Email address</label>
                    <input type="email" className="form-control" id="signUpEmail" placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signUpPassword">Password</label>
                    <input type="password" className="form-control" id="signUpPassword" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  <p className="text-center mt-3">Already have an account? <a href="#" onClick={handleToggle}>Login</a></p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
