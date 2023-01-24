import React from "react";
import { Link } from "react-router-dom";
import storiesService from "../../services/storiesService";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

//component to manage user stories
const MyStory = ({ data, editStoryId, setEditStoryId }) => {
  console.log(data._id);
  const userContext = useContext(UserContext);

  const navigate = useNavigate();
  const handleRemoveStory = (id) => {
    try {
      storiesService.removeStory(id, userContext.token);
      alert("Story deleted from db");
      navigate('/stories', {replace: true});
    } catch (err) {
      return err;
    }
  };

  const deleteStory = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleRemoveStory(data._id),
        },
        {
          label: "No",
          onClick: () => alert("Deletion cancelled"),
        },
      ],
    });
  };

  const handleSetEditId = () => {
    console.log(data._id);
    setEditStoryId(data._id);
    console.log(editStoryId);
  };
  return (
    <div className="storyWrap">
      Story
      <p>
        Destination:<b> {data.kohde}</b>
      </p>
      <p>
        date : <b>{new Date(data.pvm).toString()}</b>
      </p>
      <p>
        story: <b>{data.tarina}</b>
      </p>
      <p>
        by: <b>{data.tekijänNimi}</b>
      </p>
      <div>
        <img
          style={{ width: "100px", height: "100px" }}
          src={data.kuva}
          alt=""
        />
      </div>
      <Link className="btnLink" to="/editstory">
        <button
          className="simpleBtn btn btn-secondary"
          onClick={() => {
            handleSetEditId();
          }}
        >
          Edit story
        </button>
      </Link>
      <button onClick={deleteStory} className="simpleBtn btn btn-warning">
        Delete story
      </button>
    </div>
  );
};

export default MyStory;
