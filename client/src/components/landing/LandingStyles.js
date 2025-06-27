import styled from 'styled-components';

export const ComicDecoration = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 1;

  &.top-left {
    top: 20px;
    left: 20px;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 90L90 10M20 90L90 20M30 90L90 30' stroke='%23E94560' stroke-width='2'/%3E%3C/svg%3E");
    transform: rotate(-45deg);
  }

  &.top-right {
    top: 20px;
    right: 20px;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23E94560' stroke-width='2' stroke-dasharray='10 5'/%3E%3C/svg%3E");
    animation: rotate 10s linear infinite;
  }

  &.bottom-left {
    bottom: 20px;
    left: 20px;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20L80 80M80 20L20 80' stroke='%23E94560' stroke-width='2'/%3E%3C/svg%3E");
  }

  &.bottom-right {
    bottom: 20px;
    right: 20px;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 50C10 30 30 10 50 10C70 10 90 30 90 50C90 70 70 90 50 90C30 90 10 70 10 50Z' stroke='%23E94560' stroke-width='2'/%3E%3C/svg%3E");
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      ${props => props.theme.colors.secondary}15,
      ${props => props.theme.colors.secondary}15 10px,
      transparent 10px,
      transparent 20px
    );
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
`;

export const WelcomeTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 4px 4px 0px ${props => props.theme.colors.secondary},
               8px 8px 0px ${props => props.theme.colors.background};
  transform: skew(-5deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: skew(-5deg) scale(1.05);
  }
`;

export const Tagline = styled.p`
  font-size: 1.8rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 3rem;
  text-align: center;
  font-style: italic;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  display: inline-block;

  &::after {
    content: '!';
    position: absolute;
    right: -20px;
    color: ${props => props.theme.colors.primary};
    transform: rotate(10deg);
    font-size: 2.2rem;
    text-shadow: 3px 3px 0 ${props => props.theme.colors.secondary};
  }
`;

export const AuthContainer = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 2.5rem;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3),
              inset 0 0 15px ${props => props.theme.colors.primary}30;
  border: 3px solid ${props => props.theme.colors.primary};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      ${props => props.theme.colors.primary}10 0%,
      transparent 70%
    );
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 0.3; }
    100% { transform: scale(1); opacity: 0.5; }
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  background: ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin: 0 5px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      ${props => props.theme.colors.primary}30,
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px ${props => props.theme.colors.primary}30;
    background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.secondary};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 1rem 1.2rem;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
  transform-style: preserve-3d;

  &::placeholder {
    color: ${props => props.theme.colors.text}80;
    font-style: italic;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 20px ${props => props.theme.colors.primary}40;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background-color: ${props => props.theme.colors.secondary};
  }
`;

export const Button = styled.button`
  padding: 1.2rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: translateX(-100%);
    transition: 0.6s;
    z-index: -1;
  }

  &:hover::before {
    transform: translateX(100%);
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const SwitchLink = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: ${props => props.theme.colors.text};
  position: relative;
  padding: 0.5rem;

  &::before,
  &::after {
    content: '★';
    color: ${props => props.theme.colors.primary};
    position: absolute;
    font-size: 1.2rem;
    opacity: 0.6;
  }

  &::before {
    left: 25%;
    transform: translateX(-50%);
  }

  &::after {
    right: 25%;
    transform: translateX(50%);
  }

  button {
    background: none;
    border: none;
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    font: inherit;
    font-weight: bold;
    position: relative;
    transition: all 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: ${props => props.theme.colors.primary};
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }

    &:hover {
      text-shadow: 0 0 8px ${props => props.theme.colors.primary};
    }
  }
`;

export const SuccessMessage = styled.div`
  color: #4CAF50;
  text-align: center;
  margin-top: 1.5rem;
  font-weight: 700;
  padding: 1rem;
  border-radius: 8px;
  background: ${props => props.theme.colors.background};
  border: 2px solid #4CAF50;
  position: relative;
  animation: popIn 0.5s cubic-bezier(0.26, 0.53, 0.74, 1.48);

  &::before {
    content: '✓';
    position: absolute;
    left: 1rem;
    font-size: 1.2rem;
    opacity: 0;
    animation: checkmark 0.5s ease-in-out forwards 0.5s;
  }

  @keyframes popIn {
    0% {
      opacity: 0;
      transform: scale(0.8) translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes checkmark {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const PrivacyText = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text}aa;
  text-align: center;
  margin-top: 0.5rem;
`;

export const AdminIndicator = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${props => props.theme.colors.background};
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: center;
  margin-top: 1rem;
  font-size: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: ${props => props.theme.colors.background};
  border: 2px solid #ff6b6b;
  position: relative;
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;

  &::before {
    content: '⚠';
    position: absolute;
    left: 1rem;
    font-size: 1.2rem;
  }

  @keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
  }
`;