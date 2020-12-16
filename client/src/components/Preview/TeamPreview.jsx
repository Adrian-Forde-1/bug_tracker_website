import React from "react";
import axios from "axios";

//React Router DOM
import { Link, withRouter } from "react-router-dom";

//Redux
import { connect } from "react-redux";

//Actions
import {
  setCurrentId,
  setCurrentSection,
} from "../../redux/actions/userActions";

import { getUserTeams } from "../../redux/actions/teamActions";

import {
  showModal,
  setDeleteItem,
  setItemType,
  setCurrentLocation,
} from "../../redux/actions/modalActions";

function TeamPreview(props) {
  const { team } = props;

  const deleteModal = () => {
    props.setDeleteItem(team);
    props.setItemType("team");
    props.setCurrentLocation(props.history.location.pathname.split("/"));
    props.showModal();
  };
  return (
    <div className={`team-preview ${props.currentTeam && "selected"}`}>
      <Link to={`/team/${team._id}`}>
        <span>{team.name}</span>
        {team.createdBy.toString() === props.user._id.toString() ? (
          <span className="margin-left-auto">
            <i
              className="far fa-trash-alt delete-btn"
              onClick={deleteModal}
            ></i>
          </span>
        ) : (
          <span className="margin-left-auto">
            <i
              className="fas fa-door-open delete-btn"
              onClick={() => {
                axios
                  .put(`/api/leave/team/${team._id}`, null, {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  })
                  .then(() => {
                    props.getUserTeams(props.user._id);
                  })
                  .catch((error) => {
                    if (error && error.response && error.response.data) {
                      props.setErrors(error);
                      props.setCurrentSection("");
                      props.setCurrentId("");
                    }
                  });
              }}
            ></i>
          </span>
        )}
      </Link>
    </div>
  );
}

const mapDispatchToProps = {
  setCurrentSection,
  setCurrentId,
  getUserTeams,
  showModal,
  setDeleteItem,
  setItemType,
  setCurrentLocation,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TeamPreview));
