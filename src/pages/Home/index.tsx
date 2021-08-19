import React, { useEffect } from 'react';

// ?lib third party
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// ? api
import { loginAuthorizeSpotify, getAccessTokenFromURL } from 'api/authSpotify';
import { getProfile } from 'api/apiSpotify';

// ! reducer area
import { login, storeUser } from 'store/authSlice';

// ? style import css
import { Flex, Heading, Text, Button, Center } from '@chakra-ui/react';

import style from './home.module.css';

const Home = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.hash) {
      const { access_token } = getAccessTokenFromURL(window.location.hash);
      dispatch(login(access_token));
      getProfile(access_token).then((data) => dispatch(storeUser(data)));
      history.push('/create-playlist');
    }
  }, [dispatch, history]);

  return (
    <Flex
      height="100vh"
      flexDirection="column"
      p={10}
      alignItems="center"
      justifyContent="center"
      className={style['wrapper-home']}
    >
      <Center>
        <Heading as="h4" size="2xl">
          HEAVEN = MUSIC
        </Heading>
      </Center>
      <Center>
        <Text>Make your life better with music</Text>
      </Center>
      <Center>
        <Text mb={5}>flight to the imagination and life to everything.</Text>
      </Center>
      <Button
        className={style['btn-login']}
        id="btn-login"
        onClick={loginAuthorizeSpotify}
        variant="solid"
        width="200px"
        bg="#1db954"
        type="button"
        style={{ borderRadius: 30 }}
      >
        Please Login First
      </Button>
    </Flex>
  );
};

export default Home;
