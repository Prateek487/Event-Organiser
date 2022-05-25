import { useEffect, useContext, useState, Fragment } from "react";

import classes from "./EventList.module.css";

import ListElement from "./ListElement";
import MyForm from "./MyForm";
import AuthContext from "./Store/Auth-Context";

const EventList = (props) => {
  const authCtx = useContext(AuthContext);
  const [EventList, setEventList] = useState([{ EventID: "", Event: "" }]);

  const deleteFromList = (id) => {
    const temp = [];
    EventList.forEach((val) => {
      if (val.EventID != id) {
        temp.push(val);
      }
    });

    setEventList(temp);
  };

  const addToList = (item) => {
    // console.log([...EventList,item]);
    setEventList([...EventList, item]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/event/getevents");
      const resData = await response.json();
      const LoadedData = [];
      // console.log(resData);
      for (const key in resData) {
        LoadedData.push({
          EventID: resData[key]._id,
          EventDesc: resData[key].EventDescription,
          EventTime: resData[key].EventTime,
          CreatedAt: resData[key].CreatedAt,
          Organiser: resData[key].OrganiserID,
        });
      }
      console.log(LoadedData);
      setEventList(LoadedData);
    };

    fetchData();
  }, []);

  return (
    <div className={classes.EventList}>
      {authCtx.isLoggedIn && <MyForm addToList={addToList}></MyForm>}
      <h1 >Event List</h1>
      <div className={classes.ListComp}>
        {EventList.map((element) => (
          <div key={element.EventID}>
            <ListElement
              key={element.EventID}
              Evalue={element}
              deleteFromList={deleteFromList}
            ></ListElement>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
