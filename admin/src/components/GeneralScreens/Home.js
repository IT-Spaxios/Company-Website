import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SkeletonStory from "../Skeletons/SkeletonStory";
import CardStory from "../StoryScreens/CardStory";
import NoStories from "../StoryScreens/NoStories";
import Pagination from "./Pagination";
import "../../Css/Home.css"
import API from "../../Utility/API.js";

import { useNavigate } from "react-router-dom"
const Home = () => {
  const search = useLocation().search
  const searchKey = new URLSearchParams(search).get('search')
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

useEffect(() => {
  let isMounted = true;

  const getStories = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/story/getAllStories?search=${searchKey || ""}&page=${page}`);
      if (isMounted) {
        setStories(data.data);
        setPages(data.pages);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch stories:", error);
      if (isMounted) {
        setStories([]);
        setLoading(false);
      }
    }
  };

  getStories();

  return () => {
    isMounted = false; // cleanup
  };
}, [search, page, navigate]);



  return (
    <div className="Inclusive-home-page">
      {loading ?

        <div className="skeleton_emp">
          {
            [...Array(6)].map(() => {
              return (
                // theme dark :> default : light
                <SkeletonStory key={uuidv4()} />
              )
            })}
        </div>

        :
        <div>
          <div className="story-card-wrapper">
            {Array.isArray(stories) && stories.length !== 0 ?
              stories.map((story) => {
                return (
                  <CardStory key={uuidv4()} story={story} />
                )
              }) : <NoStories />
            }
            <img className="bg-planet-svg" src="planet.svg" alt="planet" />
            <img className="bg-planet2-svg" src="planet2.svg" alt="planet" />
            <img className="bg-planet3-svg" src="planet3.svg" alt="planet" />

          </div>

          <Pagination page={page} pages={pages} changePage={setPage} />

        </div>

      }
      <br />
    </div>

  )

};

export default Home;