import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "auth_token",
    "user_id",
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = cookies.auth_token;
    if (isLoggedIn) {
      navigate('/Dashboard')
    } else {
      navigate('/login');
    }
  }, [cookies]);
  return (
    <div>Home</div>
  )
}

export default Home