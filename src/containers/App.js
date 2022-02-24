import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";
import { setSearchField, requestRobots } from "../actions";

const App = () => {
  const dispatch = useDispatch();
  const { searchField } = useSelector((state) => state.searchRobots);
  const { robots, isPending, error } = useSelector(
    (state) => state.requestRobots
  );

  useEffect(() => {
    onRequestRobots();
  }, []);

  const onSearchChange = (event) => {
    dispatch(setSearchField(event.target.value));
  };

  const onRequestRobots = () => {
    dispatch(requestRobots());
  };

  const filteredRobots = robots.filter((robot) => {
    return robot.name
      .toLocaleLowerCase()
      .includes(searchField.toLocaleLowerCase());
  });

  return isPending ? (
    <h1>Waiting for the robots...</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots} />
        </ErrorBoundry>
      </Scroll>
    </div>
  );
};

export default App;
