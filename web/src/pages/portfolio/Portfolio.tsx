import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px;
`;

interface PortfolioProps {}

const Portfolio: React.FC<PortfolioProps> = (props: PortfolioProps) => {
  return (
    <Container>
      Portfolio
      <br />
      <ul>
        <li>Percentage of portfolio</li>
        <li>Quantity</li>
        <li>Price</li>
        <li>Market cap</li>
        <li>24h % change</li>
        <li>Price target</li>
        <li>Why you bought? Why sell?</li>
        <li>Conviction rating</li>
        <li>TODO: Look at RK portfolio spreadsheet for ideas</li>
      </ul>
    </Container>
  );
};

export default Portfolio;
