import classes from "./ListElement.module.css";
import { Fragment, useState } from "react";
import axios from "axios";

const ListElement = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [EventDesc, setEventDesc] = useState(props.Evalue.EventDesc);

  const onClickHandler = () => {
    setShowDetail((showDetail) => {
      return !showDetail;
    });
  };

  const onDeleteHandler = (id) => {
    const deleteEvent = async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:4000/event/deleteEvent/${id}`,
          { withCredentials: true }
        );
        if (response.statusText == "OK") {
          props.deleteFromList(id);
          alert(response.data.message);
        }
      } catch (err) {
        alert(err.response.data.message);
        console.log(err);
      }
    };

    deleteEvent(id);
  };

  return (
    <Fragment>
      <div key={props.Evalue.EventID} className={classes.List}>
        <div onClick={onClickHandler} className={classes.ListElement}>
          <h2>{EventDesc}</h2>
          {showDetail && (
            <div className={classes.ElementDesc}>
              <p>Oraganised By: {props.Evalue.Organiser.email}</p>
              <p>
                Event Time:{" "}
                {new Date(props.Evalue.EventTime).toDateString() +
                  " " +
                  new Date(props.Evalue.EventTime).toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>
        <div className={classes.Close}>
          <button onClick={onDeleteHandler.bind(this, props.Evalue.EventID)}>
            X
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ListElement;
