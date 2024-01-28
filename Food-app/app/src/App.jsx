import styled from "styled-components";
import SearchBar from "material-ui-search-bar";
import React, { useState } from "react";
import App from "./App";

const BASE_URL = "https://localhost:9000";

function app() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFoodDatas = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL);
      const datas = await response.json();
      console.log(datas);

      setData(datas);
      setLoading(false);
    } catch (error) {
      alert("error while fetching data");
      console.log(error);
    }
  };

  fetchFoodDatas();

  return (
    <MainComponent>
      <TopContainer>
        <Top1>
          <div className="img">
            <img src="logo.svg" alt="logo" />
          </div>
          <SearchBar placeholder="Search food" />
        </Top1>
        <Menu>
          <button>All</button>
          <button>Breakfast</button>
          <button>Lunch</button>
          <button>Dinner</button>
        </Menu>
      </TopContainer>
      <FoodContainer>
        <FoodCards></FoodCards>
      </FoodContainer>
    </MainComponent>
  );
}
export default app;

const MainComponent = styled.div``;
const TopContainer = styled.section`
  background-color: #0f1035;
`;

const Top1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 30px;
`;
const Menu = styled.div`
  background-color: transparent;
  border: none;
  padding: 5px;
  display: flex;
  gap: 12px;
  justify-content: center;

  button {
    background-color: #365486;
    width: 100px;
    heigth: 31px;
    padding: 5px;
    border-radius: 5px;
    border: none;
    color: white;
  }
`;

const FoodContainer = styled.main``;
const FoodCards = styled.div``;
