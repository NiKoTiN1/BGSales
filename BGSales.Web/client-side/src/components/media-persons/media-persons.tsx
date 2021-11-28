import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import "./media-persons.scss";
import StateInterface from "../../interfaces/StateInterface";
import { getMediaPersons } from "../../actions";
import PartialMediaPerson from "../partial-media-person";
import MediaPersonsIterface from "../../interfaces/MediaPersonsIterface";
import PartialMediaProfileInterface from "../../interfaces/PartialMediaProfileInterface";

const MediaPersons = ({
  allMediaPersons,
  dispatch,
  history,
  role,
}: MediaPersonsIterface) => {
  const [selectName, setSelectName] = useState(
    window.location.href.slice(window.location.href.lastIndexOf("/") + 1)
  );
  useEffect(() => {
    dispatch(getMediaPersons());
  }, []);

  const elements = allMediaPersons.map((item: PartialMediaProfileInterface) => {
    return (
      <li key={item.userId} className="list-media-persons__person">
        <PartialMediaPerson
          {...item}
          onItemSelected={(id: string) => {
            history.push(`profileMedia/${id}`);
          }}
        />
      </li>
    );
  });
  if (role !== "Businessman") {
    return <p>Error this page is not available</p>;
  }
  return (
    <>
      <ul className="list-media-persons">{elements}</ul>
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    allMediaPersons: state.profile.allMediaPersons,
    role: state.profile.currentUser.role,
  };
};
export default connect(mapStateToProps)(MediaPersons);
