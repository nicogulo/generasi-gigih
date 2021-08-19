import React, { useState } from 'react';

import { Flex, Heading } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

// import menuIcon from 'assets/icons/menu.svg';

import NavbarItem from 'components/layouts/sidebarItem';

import style from './sidebar.module.css';

const Sidebar = () => {
  const [navbar, setNavbar] = useState(true);
  return (
    <Flex
      h="auto"
      pos="sticky"
      backgroundColor="#121212"
      color="#fff"
      flexDir="column"
      alignItems="center"
      className={navbar ? style['navbar'] : style['navbar-full']}
    >
      <Flex
        className={style['navbar-trigger']}
        mt={8}
        w="100%"
        h="40px"
        alignItems="center"
        color="#fff"
        onClick={() => {
          setNavbar(!navbar);
        }}
      >
        <HamburgerIcon color="#fff" />
        <Heading as="h3" size="md">
          {navbar ? '' : 'Spotify'}
        </Heading>
      </Flex>

      <NavbarItem navbar={navbar} active />
    </Flex>
  );
};

export default Sidebar;
