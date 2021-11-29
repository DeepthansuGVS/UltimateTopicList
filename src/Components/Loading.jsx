import React from "react";
import ReactLoading from "react-loading";
import styled from "tachyons-components";
import "./style.css"

export const Section = styled('button')`
content-center bg-white`;


const Loading = () => (
  <Section>
    <ReactLoading className="loading" type="spokes" height={'15%'} width={'15%'} color="black"></ReactLoading>
  </Section>
);

export default Loading;