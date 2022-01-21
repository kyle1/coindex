import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiBaseUrl } from "../../constants";
import { Resource } from "../../models/Resource";

const NEWS_RESOURCE_GROUP_ID = 1;
const SOCIAL_RESOURCE_GROUP_ID = 6;

const Container = styled.div`
  margin: 100px;
  display: grid;
  grid-template-rows: 3;
  grid-template-columns: 2;
  grid-gap: 20px;

  a {
    color: lightgray;
    text-decoration: none;
  }
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const TopRow = styled.div;

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  const [resources, setResources] = useState<Resource[]>([]);

  const getResources = (): void => {
    fetch(`${apiBaseUrl}/resources`)
      .then((response) => response.json())
      .then(
        (resources: Resource[]) => setResources(resources),
        (error) => console.log(error)
      );
  };

  useEffect(() => {
    getResources();
  }, []);

  return (
    <Container>
      <div>
        <Header>Biggest movers</Header>
        {[...Array(5)].map((x, i) => (
          <div>Coin {i}</div>
        ))}
      </div>
      <div>
        <Header>Portfolio</Header>

        {[...Array(5)].map((x, i) => (
          <div>Coin {i}</div>
        ))}
      </div>
      <div>
        <Header>News</Header>
        {resources
          .filter((r) => r.resourceGroupId === NEWS_RESOURCE_GROUP_ID && r.showInDashboard)
          .map((r) => (
            <div>
              <a href={r.url} target="_blank">
                {r.resourceName}
              </a>
            </div>
          ))}
      </div>
      <div>
        <Header>Social</Header>
        {resources
          .filter((r) => r.resourceGroupId === SOCIAL_RESOURCE_GROUP_ID && r.showInDashboard)
          .map((r) => (
            <div>
              <a href={r.url} target="_blank">
                {r.resourceName}
              </a>
            </div>
          ))}
      </div>
      <div>
        <Header>Upcoming events</Header>
      </div>
    </Container>
  );
};

export default Dashboard;
