import { getOdds } from "../utils/odds";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Box, Modal, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalOverlay, ModalFooter, useDisclosure,Image,Text,Flex} from '@chakra-ui/react'

import { Button } from '@chakra-ui/react'
import CreateEvent from "../components/CreateEvent";

import image from '/Digital Duel.gif'



const EventPage = () => {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpenModal = (event) => {
    setSelectedEvent(event)
    onOpen()
  }
  useEffect(() => {
    async function fetchData() {
      const response = await getOdds()
      const data = await response.json()

      try {
        const eventData = data.map((item) => ({
          eventId: item.id,
          sport: item.sport_key,
          title: item.sport_title,
          time: item.commence_time,
          home_team: item.home_team,
          away_team: item.away_team,
        }))
        setEvents(eventData)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()

  }, [])

  return (
    <>
    <Box className="eventpage">
      <Box className="about-us" p={4}>
        <Flex direction ={{base:"column",md:"row"}} align="center" gap={6}>
        <Image src={image} boxSize={["100%","300px"]} objectFit="cover"></Image>
        </Flex>
        <Box>
        <Text className="text"fontSize="2x1" textAlign="justify"> Create an event with your friends based on these matches</Text>
        </Box>
    </Box>
   
      <Box
      
        borderWidth="1px"
        borderRadius="md"
        maxH="650px"
        overflowY="auto"
        boxShadow="lg"
        mt={6}>
        
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing={12}
          mt={6}
        >
          {events.map((item) => (
            <Card className="card-container" key={item.eventId} mx="auto" >
              <div className="card" onClick={() => handleOpenModal(item)}>
                <CardBody className="card-body">
                  <CardHeader className="card-header"> 
                    <ul>{item.home_team}</ul> vs <ul>{item.away_team}</ul>
                    </CardHeader>
                </CardBody>
                <CardFooter className="card-footer" justifyContent="flex-end">
                  <Button className="text-white" onClick={() => handleOpenModal(item)}>Create</Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
      {selectedEvent && (
        <Modal isOpen={isOpen} onClose={onClose}>

         <ModalOverlay/>
          <ModalContent className="modal-content">
            <ModalHeader className="modal-header">Match Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="modal-body">
              <CreateEvent className="createevent"selected_event={selectedEvent} onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>

      )}
    </Box>
    </>
  );
}

export default EventPage;