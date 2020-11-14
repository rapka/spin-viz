import React from 'react';
import styled, { keyframes } from "styled-components";

import './Cover.css';

const maxOpacity = (sample, count) => {
  const newMin = 0.1;
  const newMax = 0.8;
  const ratio = (count - sample) / count;
  const adjusted = (ratio * (newMax - newMin)) + newMin;
  return parseInt(adjusted * 100);
};

function Cover(props) {
  const max = maxOpacity(props.samples - props.sample - 1, props.samples);
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

  const fadeAnimation = keyframes`
    {
        0% {
            filter: blur(12px) opacity(0%);
        }
        25% {
            filter: blur(8px) opacity(${max}%);
        }
        50% {
            filter: blur(8px) opacity(0%);
        }
        75% {
            filter: blur(8px) opacity(${max}%);
        }
        100% {
            filter: blur(12px) opacity(0%);
        }
    }
  `;

  const SpinContainer = styled.div`
        animation: ${spinAnimation} ${10000 + props.sample * 2}ms linear infinite;
        position: absolute;
      `;

  const FadeContainer = styled.div`
          filter: blur(11px) opacity(0%);

        animation: ${fadeAnimation} ${props.samples * 3}s ease-in-out infinite;
        animation-delay: ${(props.sample - 1) * 2000}ms;
        position: absolute;
      `;

  return (

    <FadeContainer>
    <SpinContainer>
      <img
        src={`/covers/${props.track}/${props.sample}.jpg`}
        className="cover"
        style={{
          transform: `rotate(${(360 / props.samples) * props.sample}deg)`,
        }}
      />
      </SpinContainer>
    </FadeContainer>
  );
}

export default Cover;
