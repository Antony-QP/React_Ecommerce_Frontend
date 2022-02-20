import { TaobaoSquareFilled } from "@ant-design/icons";
import React from "react";
import Typewriter from "typewriter-effect";

const Jumbotron = ({ text }) => (
    <Typewriter
      options={{
        strings: text,
        autoStart: true,
        loop: true,
      }}
    />
  );

export default Jumbotron;
