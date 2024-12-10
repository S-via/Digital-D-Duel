import { getOdds } from "../utils/odds";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Box,Modal, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalOverlay, ModalFooter, useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import CreateEvent from "../components/CreateEvent";






const EventPage = () => {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const {isOpen, onOpen, onClose} = useDisclosure()

  const handleOpenModal = (event)=> {
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

  }, [events])

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="md"
        maxH="350px"
        overflowY="auto"
        boxShadow="lg"
        mt={6}>
        <SimpleGrid
          columns={[1,2,3]}
          spacing={12}
          mt={6}
        >
          {events.map((item) => (
            <Card width="100%" maxWidth="320px" key={item.eventId} mx="auto" >
              <CardBody>
                <CardHeader>{item.home_team} vs {item.away_team}</CardHeader>
              </CardBody>
              <CardFooter justifyContent="flex-end">
                <Button className="text-white" onClick={()=> handleOpenModal(item)}>Create</Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
      {selectedEvent && (
        <Modal isOpen={isOpen} onClose={onClose}>
        ModalOverlay
        <ModalContent>
        <ModalHeader>Match Details</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
      <CreateEvent home_team={selectedEvent.home_team} away_team={selectedEvent.away_team}/>
      </ModalBody>
      </ModalContent>
      </Modal>
      )}
    </>
  );
}

export default EventPage;