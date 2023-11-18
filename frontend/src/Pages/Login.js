import { useEffect, useState } from 'react';
import React, {useNavigate} from 'react-router-dom';
import { useGlobalContext } from '../Context/GlobalContext';
import styled from 'styled-components';

const Login = () => {
    const [inputs, setInputs] = useState({
      "username" : "",
      "email" : "",
      "password" : ""
    });

    const {user, error, getUser, setError} = useGlobalContext()
    const navigate = useNavigate()

    useEffect(() =>{
      const loginUser = () =>{
        if(user){
            setError('')
            navigate('/home');
        }
      }
      loginUser();
    }, [user])

    const handleChange = (e, name) => {
      const value = e.target.value;
      setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getUser(inputs);
        // console.log("--------login-------------");
    }

    return (
      <FormLogin>
      {error ? <p className='error'>{error}</p> : <h2>Login!</h2>}
        {error ? <p>{error}</p>: <legend >welcome user</legend>}
            <Details>
              <ul>
                  <li>
                  <label for="username">Username:</label>
                  <input type="text" value={inputs["username"]} id="username" required onChange={(e)=>handleChange(e, e.target.id)}/>
                  </li>
                  <li>
                  <label for="email">Email:</label>
                  <input type="email" value={inputs["email"]} id="email" required onChange={(e)=>handleChange(e, e.target.id)}/>
                  </li>
                  <li>
                  <label for="password">Password:</label>
                  <input type="password" value={inputs["passowrd"]} id="password" required onChange={(e)=>handleChange(e, e.target.id)}/>
                  </li>
              </ul>
            </Details>
        <Btn onClick={handleSubmit} type="button">login</Btn>
    </FormLogin>
  )
}

const FormLogin = styled.form`
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width : 100%;
    background-color: edf6f9;
    height: 100%;
`

const Details = styled.div`
  height: 10rem;
  width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
  border-radius: 5px;
  ul{
    display : flex;
    flex-direction: column;
    gap: 1rem
  }
`

const Btn = styled.button`
margin: 5px 2px;
  height: 30px;
  width: 100px;
`

export default Login