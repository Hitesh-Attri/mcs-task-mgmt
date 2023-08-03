import React, { useEffect } from "react";
import { Box, Button, WrapItem, Checkbox } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDltId,
  setIsUpdate,
  setShowTastList,
  setUpdateID,
  setEditTaskObj,
} from "../redux/counter";

import toast, { Toaster } from "react-hot-toast";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import axios from "axios";
import BASE_URL from "../constants";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(false);
  const { showTaskList } = useSelector((state) => state.counter);

  useEffect(() => {
    setChecked(task.status);
  }, [task.status]);

  const handleDelete = async (id) => {
    dispatch(setDltId(id));

    try {
      let res = await axios.delete(`${BASE_URL}/delete-task/${id}`);
      // console.log(res.data);
      if (res.data.success) {
        toast.success("Task deleted.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  const handleEdit = async (id) => {
    try {
      let res = await axios.get(`${BASE_URL}/task/${id}`);
      // console.log(res.data);
      if (res.data.success) {
        dispatch(setEditTaskObj(res.data.task));
        dispatch(setUpdateID(id));
        dispatch(setIsUpdate(true));
        dispatch(setShowTastList(!showTaskList));
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  const handleStatus = async (id, status) => {
    try {
      let res = await axios.put(`${BASE_URL}/update-status/`, {
        id: id,
        status: status,
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      id={task._id}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: "2em",
        padding: "1em",
        // backgroundColor: "#FFFF8A",
        backgroundColor: "#87CEEB",
        boxSizing: "border-box",
        borderRadius: "1em",
      }}
    >
      <div>
        <p className={checked ? "lineThrough" : ""}>
          <span>Title:</span> {task.title}
        </p>
        <p>
          <span>Description:</span> {task.description}
        </p>
        <p>
          <span>Status:</span> {checked ? "Completed" : "Incomplete"}
        </p>
      </div>
      <Box display="flex" alignItems="center" justifyContent="center" gap="4">
        <Checkbox
          size={"lg"}
          isChecked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            handleStatus(task._id, e.target.checked);
          }}
        />
        <WrapItem>
          <Button
            onClick={() => {
              handleDelete(task._id);
            }}
            colorScheme="red"
          >
            <DeleteIcon />
          </Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="blue">
            <EditIcon
              onClick={() => {
                handleEdit(task._id);
              }}
            />
          </Button>
        </WrapItem>
      </Box>
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default TaskItem;
