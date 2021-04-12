import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [teamLeadName, setTeamLeadName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    // check to make sure the password is confirmed. They must match
    if (password === passwordConfirm) {
      dispatch({
        type: 'REGISTER',
        payload: {
          teamLeadName: teamLeadName,
          password: password,
        },
      });
    } else {
      console.log('Make sure passwords match');
      alert('Make sure passwords match');
    }
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="companyName">
          Company Name:
          <input
            type="text"
            name="companyName"
            value={companyName}
            required
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="companyAddress">
          Company Address:
          <input
            type="text"
            name="companyAddress"
            value={companyAddress}
            required
            onChange={(event) => setCompanyAddress(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="phoneNumber">
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            required
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="teamLeadName">
          Team Lead Name:
          <input
            type="text"
            name="teamLeadName"
            value={teamLeadName}
            required
            onChange={(event) => setTeamLeadName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="userEmail">
          User Email:
          <input
            type="text"
            name="userEmail"
            value={userEmail}
            required
            onChange={(event) => setUserEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="passwordConfirm">
          Confirm Password:
          <input
            type="text"
            name="passwordConfirm"
            value={passwordConfirm}
            required
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
