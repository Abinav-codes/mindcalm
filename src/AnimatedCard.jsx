// src/components/AnimatedCard.jsx
/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * AnimatedCard: front shows image, back shows title and optional description.
 * Props:
 * - to: string (route path)
 * - imgSrc: string (image URL or imported path)
 * - title: string
 * - description?: string
 */
export default function AnimatedCard({ to, imgSrc, title, description }) {
  return (
    <StyledWrapper>
      <Link to={to} className="card-link" aria-label={title}>
        <div className="card">
          {/* Front face: full-cover image */}
          <div className="card__front">
            <img src={imgSrc} alt={title} className="card__image" />
          </div>
          {/* Back face: title & description */}
          <div className="card__back">
            <p className="card__title">{title}</p>
            {description && <p className="card__description">{description}</p>}
          </div>
        </div>
      </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card-link {
    display: block;
    width: 90%;           /* increased width */
    max-width: 900px;     /* increased max width */
    margin: 2rem auto;    /* keep centered with spacing */
    perspective: 1000px;
    text-decoration: none;
    height: 60vh;         /* you can tweak this too if needed */
  }

  .card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s ease;
  }

  .card-link:hover .card,
  .card-link:focus .card {
    transform: rotateX(180deg);
  }

  .card__front,
  .card__back {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    backface-visibility: hidden;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card__front {
    background: #eee;
  }

  .card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card__back {
    background: #fff;
    transform: rotateX(180deg);
    padding: 2.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .card__title {
    margin: 0;
    font-size: 2.5rem;     /* increased font size */
    font-weight: bold;
    color: #333;
  }

  .card__description {
    margin-top: 1.5rem;    /* increased spacing */
    font-size: 1.4rem;     /* increased font size */
    color: #555;
  }
`;
