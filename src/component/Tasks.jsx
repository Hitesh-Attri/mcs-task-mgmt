import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { useSelector, useDispatch } from "react-redux";
import { setTasksData, setIsUpdate } from "../redux/counter";
import axios from "axios";
import BASE_URL from "../constants";
import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";

const Tasks = () => {
  const { dltID, tasksData } = useSelector((state) => state.counter);
  // const [tasks, setTasks] = useState(tasksData);
  const [label, setLabel] = useState("Please wait...");

  const dispatch = useDispatch();

  useEffect(() => {
    getTasks();
    dispatch(setIsUpdate(false));
  }, []);

  const getTasks = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/get-all-tasks`);
      if (res.data.success) {
        if (res.data.tasks.length === 0) {
          setLabel("No tasks.");
        }
        dispatch(setTasksData(res.data.tasks));
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (dltID) {
      handleDelete(dltID);
    }
  }, [dltID]);

  const handleDelete = (id) => {
    const data = tasksData.filter((tasks) => tasks._id !== id);
    if (data.length === 0) {
      setLabel("No tasks.");
    }
    dispatch(setTasksData(data));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        // color: "aliceblue",
      }}
    >
      <SimpleGrid columns={2} spacing={10} width={"100%"}>
        {tasksData.length > 0 ? (
          tasksData.map((task) => {
            return <TaskItem key={task._id} task={task} />;
          })
        ) : (
          <h1 style={{ color: "aliceblue" }}>{label}</h1>
        )}
      </SimpleGrid>
    </div>
  );
};

export default Tasks;
