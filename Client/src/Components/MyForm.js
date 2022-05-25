import axios from "axios";
import { useRef } from "react";

import classes from "./MyForm.module.css";

const MyForm = (props) => {
  const NameVal = useRef();
  const TimeVal = useRef();
  const DateVal = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const EnteredItem = NameVal.current.value;
    const EnteredTime = TimeVal.current.value;
    const EnteredDate = DateVal.current.value;

    const dateTime = EnteredDate + " " + EnteredTime;
    console.log(dateTime);
    let reqBody = {
      EventDescription: EnteredItem,
      EventTime: dateTime,
    };

    const addToListHandler = async (body) => {
      try {
        console.log(body);
        const response = await axios.post(
          "http://localhost:4000/event/addevents",
          body,
          { withCredentials: true }
        );
        if (response.statusText == "OK") {
          const resData = response.data;
          console.log(resData);
          const Event = {
            EventDesc: EnteredItem,
            EventTime: dateTime,
            CreatedAt: resData.Event.CreatedAt,
            EventID: resData.Event._id,
            Organiser: resData.Event.OrganiserID
          };
          props.addToList(Event);
          NameVal.current.value = "";
          TimeVal.current.value = "";
          DateVal.current.value = "";
        }
      } catch (err) {
        alert(err.response.data.message);
        console.log(err);
      }
    };

    addToListHandler(reqBody);
  };
  return (
    <div className={classes.Form}>
      <form onSubmit={onSubmitHandler}>
        <label>Event Description:</label>
        <input ref={NameVal} type="text" required/>
        <label>Event Time:</label>
        <input type="date" ref={DateVal} required/>
        <input type="time" ref={TimeVal} required/>
        {/* <input type="number" min={0} max={60} ref={TimeVal} /> */}
        {/* <select >
        </select> */}
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default MyForm;
