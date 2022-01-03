import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 100px;
  font-size: 14px;

  .link {
    color: white;
    text-decoration: none;
  }
`;

interface DyorProps {}

const Dyor: React.FC<DyorProps> = (props: DyorProps) => {
  console.log("Dyor evaluated");

  return (
    <Container>
      <h3>DYOR</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "50%" }}>
          <ul>
            <li>About</li>
            <li>
              Decentralization
              <ul>
                <li>
                  Governance system? (see:&nbsp;
                  <a href="https://vitalik.ca/general/2021/08/16/voting3.html" target="_blank">
                    Vitalik blog
                  </a>
                  )
                  <ul>
                    <li>Coin voting? (whales can vote in support of their personal interests)</li>
                    <li>Proof of personhood system? (one vote per user)</li>
                    <li>
                      Proof of participation? (voting rights could be exclusively distributed to
                      addresses that complete a specific task)
                    </li>
                    <li>
                      Quadratic voting? (the power of a single voter is proportional to the square
                      root of the economic resources that they commit to a decision)
                    </li>
                  </ul>
                </li>
                <li>
                  How much of the supply do the top wallets own? (TODO: find where to get this data)
                </li>
              </ul>
            </li>
            <li>
              Scalability
              <ul>
                <li>Transaction speed</li>
                <li>Transaction fee</li>
              </ul>
            </li>
            <li>
              Security
              <ul>
                <li>Does the project have audits conducted by a reputable auditor?</li>
                <li>Has the project been hacked before? How did the team deal with it?</li>
              </ul>
            </li>
            <li>
              Tokenomics
              <ul>
                <li>How many tokens distributed to the team and early backers?</li>
                <ul>
                  <li>
                    If only a small portion of tokens (e.g. less than 5%) is allocated to the
                    founders, there might not be enough motivation to build a successful chain/coin
                    or token.
                  </li>
                  <li>
                    If a major portion of tokens is allocated to the founders, the project is
                    vulnerable to a rug pull.
                  </li>
                  <li>
                    Locked and/or gradually-released tokens is a good sign that the team expects
                    longevity.
                  </li>
                </ul>
                <li>
                  Inflationary/deflationary?
                  <ul>
                    <li>
                      Low inflation may be good for coins intended to be used as currency
                      (encourages spending)
                    </li>
                    <li>
                      Deflation may not be good for coins intended to be used as a currency
                      (discourages spending)
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              Website
              <ul>
                <li>Professional-looking?</li>
                <li>Easy to navigate?</li>
                <li>Informative &amp; up to date?</li>
              </ul>
            </li>
            <li>Whitepaper</li>
            <li>
              Founder/Team
              <ul>
                <li>Size</li>
                <li>Experience/Background</li>
                <li>Advisors</li>
              </ul>
            </li>
            <li>Roadmap</li>
            <ul>
              <li>What milestones are coming up?</li>
              <li>Has the team shown an ability to meet milestones on schedule?</li>
            </ul>
            <li>
              On-chain metrics (see: Glassnode)
              <ul>
                <li>
                  Transaction count &amp; value (large volume can lead to new exchange listings)
                </li>
                <li>Active addresses</li>
                <li>Hash rate (TODO: look into what this is)</li>
                <li>
                  Total value locked (see:&nbsp;
                  <a href="https://defillama.com/chains" target="_blank">
                    DefiLlama
                  </a>
                  )
                </li>
              </ul>
            </li>
            <li>
              Usability
              <ul>
                <li>Wallet/App?</li>
                <li>Easy to use? Barriers to entry?</li>
              </ul>
            </li>
            <li>Number of projects (tokens/dApps) on platform</li>
            <li>Staking/reward incentives</li>
          </ul>
        </div>
        <div style={{ width: "50%" }}>
          <ul>
            <li>
              Backers, Investors, and Partnerships
              <ul>
                <li>
                  If the project is backed by reputable VCs it can be a good sign, but not always.
                  Look into token distribution.
                </li>
                <li>
                  Check blogs of the VCs to see if there are posts regarding the investment and the
                  reasons behind it.
                </li>
              </ul>
            </li>
            <li>Exchange listings</li>
            <li>
              Development activity
              <ul>
                <li>Open-source?</li>
                <li>Regular contributions?</li>
                <li>Most recent code update?</li>
              </ul>
            </li>
            <li>
              Developer adoption/adoptability
              <ul>
                <li>Developer docs?</li>
                <li>Support programming languages?</li>
                <li>Are developers interested in building on the platform?</li>
              </ul>
            </li>
            <li>Marketing</li>
            <li>
              Social
              <ul>
                <li>Social media channels? Are these channels well maintained?</li>
                <li>
                  Does the team often update their progress in order to keep the community up to
                  date and involved?
                </li>
                <li>Engagement. Are there a lot of people talking about the project?</li>
                <li>General sentiment? Is the community friendly and helpful?</li>
              </ul>
            </li>
            <li>
              Competition
              <ul>
                <li>Are there competitors?</li>
                <li>Strengths/weaknesses versus competitors</li>
              </ul>
            </li>
            <li>
              Analysts to track (article writers, reddit posters, etc. who are dialed-in to project)
            </li>
            <li>Useful links (relevant websites, news articles, reddit posts/comments, etc.)</li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Dyor;
