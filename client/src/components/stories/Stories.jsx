import Story from "../story/Story";
import Upload from "../supload/Upload";
import "./stories.scss";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Stories = ({ userId }) => {
  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="stories">
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((story) => (
            <Story story={story} key={story.id}/>
          ))}
    </div>
  );
};

export default Stories;