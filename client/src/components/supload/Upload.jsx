import Image from "../../assets/img.png";
import "./upload.scss";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Upload = () => {
  const [file, setFile] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const cloudinaryResponse = await makeRequest.post("/cloudinary/upload", formData);
      
      console.log("Cloudinary Upload response:", cloudinaryResponse.data);
      return cloudinaryResponse.data.url;
    } catch (err) {
      console.error("Cloudinary Upload error:", err);
    }
  };

  const mutation = useMutation(
    (newStory) => {
      return makeRequest.post("/stories", newStory);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stories"]);
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },  
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    console.log({img: imgUrl });
    mutation.mutate({img: imgUrl });
    setFile(null);
  };

  return (
    <div className="upload">
      <div className="container">
        <div className="top">
          <div className="small">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="upload-file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="upload-file">
              <div className="item">
                <span>Add Story</span>
                <img src={Image} alt="" />
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleClick}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;