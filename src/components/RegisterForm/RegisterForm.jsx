import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [teamLeadName, setTeamLeadName] = useState('');
  const [email, setEmail] = useState('');
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
          companyName,
          companyAddress,
          companyCity: city,
          companyState: state,
          companyZip: zip,
          phoneNumber,
          teamLeadName,
          email,
          password,
        },
      });
      console.log(
        companyName,
        companyAddress,
        phoneNumber,
        teamLeadName,
        email,
        password
      );
      clearForm();
    } else {
      console.log('Make sure passwords match');
      alert('Make sure passwords match');
    }
  }; // end registerUser

  const clearForm = () => {
    setCompanyName('')
    setCompanyAddress('')
    setCity('')
    setState('')
    setZip('')
    setPhoneNumber('')
    setTeamLeadName('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
  }

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
      Company Address:
      <div>
        <label htmlFor="companyAddress">
          Street:
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
        <label htmlFor="companyAddress">
          City:
          <input
            type="text"
            name="city"
            value={city}
            required
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="state">
          State:
          <input
            type="text"
            name="state"
            value={state}
            required
            onChange={(event) => setState(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="companyAddress">
          Zip Code:
          <input
            type="text"
            name="zip"
            value={zip}
            required
            onChange={(event) => setZip(event.target.value)}
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
        <label htmlFor="email">
          User Email:
          <input
            type="text"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
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
            type="password"
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
