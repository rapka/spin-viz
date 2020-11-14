import React from 'react';
import styled, { keyframes } from 'styled-components';

import './Cover.css';

function Cover(props) {
  const spinAnimation = keyframes`
    {
        0% {
            transform: rotate(${props.backward ? 0 : 360}deg) translate3d(0, 0, 0);
        }
        100% {
            transform: rotate(${props.backward ? 360 : 0}deg) translate3d(0, 0, 0);
        }
    }
  `;

  const SpinContainer = styled.div`
    animation: ${spinAnimation} ${10000 + props.sample * 2}ms linear infinite;
    position: absolute;
  `;

  return (
    <SpinContainer>
      <img src="/cover.jpg" className="cover" />
    </SpinContainer>
  );
}

export default Cover;
