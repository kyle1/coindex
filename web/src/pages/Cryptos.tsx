import React, { useEffect } from "react";

const getCryptos = () => {
  console.log("fetching cryptos...");
};

interface CryptosProps {}

const Cryptos: React.FC<CryptosProps> = (props: CryptosProps) => {
  console.log("Cryptos evaluated");

  useEffect(() => {
    getCryptos();
  }, []);
  return <div>TODO</div>;
};

export default Cryptos;
