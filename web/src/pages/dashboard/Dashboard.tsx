import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px;
`;

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  return (
    <Container>
      Portfolio
      <br />
      Biggest movers
      <br />
      Resources
      <br />
      Upcoming events
    </Container>
  );
};

export default Dashboard;
