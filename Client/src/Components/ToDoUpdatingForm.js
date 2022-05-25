import { useRef, useState } from "react";

// import classes from "./ToDoUpdatingForm.module.css";

import Modal from "./Modal";

const SlotBookingForm = (props) => {
  const NameRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const name = NameRef.current.value;

    const body = {
      Item: name,
      ItemID: props.Evalue.ItemID,
    };

    const updateToDoHandler = async (body) => {
      try {
        console.log(body);
        const response = await fetch("http://localhost:4000/todo/updatetodo", {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resData = await response.json();
        props.UpdateToDoVal(name);
        console.log(resData);
      } catch (err) {
        console.log(err);
      }
    };

    updateToDoHandler(body);
    props.onClose(false);
  };
  return (
    <Modal onClose={props.onClose}>
      <h1>Update ToDo</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>Please enter the updated ToDo</label>
          <input ref={NameRef} />
        </div>
        <button type="submit">Update ToDo</button>
      </form>
    </Modal>
  );
};

export default SlotBookingForm;
