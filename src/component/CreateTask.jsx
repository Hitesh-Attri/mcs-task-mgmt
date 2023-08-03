import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appendTasksData, setIsUpdate } from "../redux/counter";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../constants";

const CreateTask = () => {
  const dispatch = useDispatch();
  const { isUpdate, updateID, editTaskObj } = useSelector(
    (state) => state.counter
  );

  const [title, setTitle] = useState(isUpdate ? editTaskObj.title : "");
  const [description, setDescription] = useState(
    isUpdate ? editTaskObj.description : ""
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      toast.error("Fields can not be empty.");
      setTitle("");
      setDescription("");

      return;
    }

    try {
      let res = await axios.post(`${BASE_URL}/create-task`, {
        title,
        description,
        status: false,
      });
      // console.log(res.data);
      if (res.data.success) {
        const task = {
          _id: res.data.task._id,
          title: res.data.task.title,
          description: res.data.task.description,
          status: res.data.task.status,
        };
        dispatch(appendTasksData(task));
        toast.success("Task created.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong.");
    }

    setTitle("");
    setDescription("");
  };

  const handleUpdateTask = async (event) => {
    event.preventDefault();

    // console.log("update clicked")

    if (title.trim() === "" || description.trim() === "") {
      toast.error("Fields can not be empty.");
      setTitle(title.trim());
      setDescription(description.trim());

      return;
    }
    try {
      let res = await axios.put(`${BASE_URL}/update-task/${updateID}`, {
        title,
        description,
      });
      console.log(res.data);
      if (res.data.success) {
        toast.success("Task updated.");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!.");
    }
    setTitle("");
    setDescription("");
    dispatch(setIsUpdate(false));
    dispatch(setIsUpdate(null));
  };

  return (
    <div
      className="container"
      style={{
        color: "aliceblue",
      }}
    >
      <div className="fw-bold fs-2 text-center m-4 ">Create Task</div>
      <form
        className="w-50 m-auto"
        onSubmit={isUpdate ? handleUpdateTask : handleFormSubmit}
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control outline-input"
            id="title"
            name="title"
            value={title}
            placeholder="Enter title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control outline-input"
            id="description"
            name="description"
            value={description}
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            {isUpdate ? "Update Task" : " Create Task"}
          </button>
        </div>
      </form>
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

export default CreateTask;
