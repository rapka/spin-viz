import React from 'react';
import styled, { keyframes } from 'styled-components';

import './Cover.css';

function Cover(props) {
  const spinAnimation = keyframes`
    {
        0% {
            transform: rotate(${!props.backwards ? 0 : 360}deg) translate3d(0, 0, 0);
        }
        100% {
            transform: rotate(${!props.backwards ? 360 : 0}deg) translate3d(0, 0, 0);
        }
    }
  `;

  const SpinContainer = styled.div`
    animation: ${spinAnimation} ${props.playing ? props.rotationDuration : 0}s linear infinite;
    position: absolute;
  `;

  return (
    <div className="track">
      <SpinContainer>
        <img src="/cover.jpg" className="cover" />
      </SpinContainer>
    </div>
  );
}

export default Cover;
