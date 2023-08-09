import Upload from "../supload/Upload"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Story = ({ story}) => {
    const [menuOpen, setMenuOpen] = useState(false);
  
    const { currentUser } = useContext(AuthContext);

    const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (storyId) => {
      return makeRequest.delete("/stories/" + storyId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(story.id);
  };
  console.log(story);
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <div className="details">
              <Link
                to={`/profile/${story.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
              <span className="name">{story.username}</span>
              </Link>
              <div className="content">
              <Link to={story.img}>
                <span classname="pic"><img src={story.img} alt="" /></span>
              </Link>
              </div>
              <span className="date">
                {moment(story.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && story.userId === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Story;