import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  position,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import Tasks from "./component/Tasks";
import "./App.css";
import { useState } from "react";
import CreateTask from "./component/CreateTask";
import { useSelector, useDispatch } from "react-redux";
import { setShowTastList } from "./redux/counter";
export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [label, setLabel] = useState("Create Task");
  // const [showTaskList, setShowTastList] = useState(true);
  const { showTaskList } = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  return (
    <Box overflowY={"auto"} height={"100vh"} bg={"black"} position={"relative"}>
      <Box bg={useColorModeValue("gray.700")} px={4} position={"sticky"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Button
            variant={"solid"}
            colorScheme={"teal"}
            size={"sm"}
            mr={4}
            leftIcon={showTaskList ? <AddIcon /> : null}
            onClick={() => dispatch(setShowTastList(!showTaskList))}
          >
            {showTaskList ? "Create Tast" : "Task List"}
          </Button>
        </Flex>
      </Box>
      <Box p={4} id="task-box">
        {showTaskList ? <Tasks /> : <CreateTask />}
      </Box>
    </Box>
  );
}
