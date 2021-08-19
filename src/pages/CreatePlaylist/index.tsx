import React, { useState } from 'react';

//  ? components
// import Navbar from "components/layouts/navbar";
import SearchBar from 'components/searchBar';
import TrackList from 'components/trackList';
import TrackSkeleton from 'components/trackSkeleton';
import Modal from 'components/modal';
import Navbar from 'components/layouts/navbar';

// ? lib third party
import { useAppSelector } from '../../store';
import { useAppDispatch } from '../../store';
import { Flex, Heading, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/hooks';

import toast, { Toaster } from 'react-hot-toast';

// ? api
import {
  getSearchTracks,
  createNewPlaylist,
  storeTracksToNewPlaylist,
} from 'api/apiSpotify';

// ! reducer area

import { setTracks } from 'store/playlistSlice';

export default function CreatePlaylist() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const token = useAppSelector((state) => state.auth.accessToken);
  const userID = useAppSelector((state) => state.auth.user?.id);
  const tracks = useAppSelector((state) => state.playlist.tracks);

  console.log(userID);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);

  const [postPlaylist, setPostPlaylist] = useState({
    name: '',
    description: '',
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setPostPlaylist({ ...postPlaylist, [name]: value });
  // };

  const buttonHandleSearch = () => {
    setIsLoading(true);
    if (search === '') {
      toast.error("Search can't be empty");
    } else {
      getSearchTracks(search, token).then((data) => {
        dispatch(setTracks(data.tracks.items));
        setIsLoading(false);
      });
      setSearch('');
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (selectedTracks.length <= 0) {
      toast.error('You have to selected song first');
    } else {
      createNewPlaylist(userID, token, postPlaylist).then((newPlaylist) =>
        storeTracksToNewPlaylist(newPlaylist.id, token, selectedTracks).then(
          (data) => console.log(data)
        )
      );

      toast.success('Create New Playlist Has Been Successfully.');

      setPostPlaylist({
        name: '',
        description: '',
      });
      setSelectedTracks([]);
    }
  };

  return (
    <>
      <Flex
        w="100%"
        h="100%"
        minH="100vh"
        flexDir="column"
        bgColor="#212121"
        color="#fff"
      >
        <Navbar />
        <Flex p="10" flexDir="column">
          <Heading as="h4" size="md">
            Search
          </Heading>
          <Flex
            flexDir="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <SearchBar
              search={search}
              setSearch={setSearch}
              buttonHandleSearch={buttonHandleSearch}
            />
            <Button
              width={200}
              alignSelf="flex-end"
              onClick={onOpen}
              bgColor="#1db954"
              isDisabled={selectedTracks.length > 0 ? false : true}
            >
              <AddIcon mr={2} />
              Create Playlist
            </Button>
          </Flex>
        </Flex>
        <Flex flexDir="column" pl="20" pr="20">
          {isLoading ? (
            <div>
              <TrackSkeleton />
              <TrackSkeleton />
              <TrackSkeleton />
              <TrackSkeleton />
              <TrackSkeleton />
            </div>
          ) : (
            <TrackList
              tracks={tracks}
              selectedTracks={selectedTracks}
              setSelectedTracks={setSelectedTracks}
            />
          )}
        </Flex>
        <Toaster position="top-right" />
        <Modal
          handleFormSubmit={handleFormSubmit}
          postPlaylist={postPlaylist}
          setPostPlaylist={setPostPlaylist}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Flex>
      {/* <Flex
        w="90%"
        h="100%"
        minH="100vh"
        flexDir="column"
        bgColor="#212121"
        color="#b3b3b3"
      >
        <Flex p="10" flexDir="column">
          <Heading as="h4" size="md">
            Search
          </Heading>
          <Flex
            flexDir="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <SearchBar
              search={search}
              setSearch={setSearch}
              buttonHandleSearch={buttonHandleSearch}
            />
            <Button
              width={200}
              alignSelf="flex-end"
              onClick={onOpen}
              colorScheme="green"
              isDisabled={selectedTracks.length > 0 ? false : true}
            >
              Create Playlist
            </Button>
          </Flex>
        </Flex>
        <Box pl="10" pr="10">
          {isLoading ? (
            <div>
              <TrackSkeleton />
              <TrackSkeleton />
              <TrackSkeleton />
              <TrackSkeleton />
              <TrackSkeleton />
            </div>
          ) : (
            <TrackList
              tracks={tracks}
              selectedTracks={selectedTracks}
              setSelectedTracks={setSelectedTracks}
            />
          )}
        </Box>
        <Toaster position="top-right" />
      </Flex> */}

      {/* <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={handleFormSubmit}>
          <ModalContent>
            <ModalHeader>Create Playlist</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Playlist Name</FormLabel>
                <Input
                  ref={initialRef}
                  id="name"
                  name="name"
                  type="text"
                  minLength="10"
                  value={postPlaylist.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  id="description"
                  name="description"
                  minLength="20"
                  value={postPlaylist.description}
                  onChange={handleChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                colorScheme="green"
                mr={3}
                onClick={onClose}
              >
                Create New Playlist
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal> */}
    </>
  );
}
