import React from 'react';

import { Flex, Text } from '@chakra-ui/react';
import { AddIcon, ArrowRightIcon } from '@chakra-ui/icons';
import style from './sidebarItem.module.css';

const sidebarItem = ({ navbar }) => {
  return (
    <>
      <Flex
        className={`${style['navbar-item']} ${style['active']}`}
        mt={2}
        w="100%"
        h="40px"
        alignItems="center"
      >
        <AddIcon w="20px" mr="20px" ml="20px" color="#fff" />
        <Text fontSize="14px">{navbar ? '' : 'Create Playlist'}</Text>
      </Flex>
      <Flex
        className={style['navbar-item']}
        mt={2}
        w="100%"
        h="40px"
        alignItems="center"
      >
        <ArrowRightIcon w="20px" mr="20px" ml="20px" color="#fff" />
        <Text fontSize="14px">{navbar ? '' : 'Logout'}</Text>
      </Flex>
    </>
  );
};

export default sidebarItem;
