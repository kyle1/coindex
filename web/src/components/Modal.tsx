import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.75);
`;

interface BackdropProps {
  onClose?: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props: BackdropProps) => {
  return <StyledBackdrop onClick={props.onClose} />;
};

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 10vh;
  left: 15%;
  width: 70%;
  background-color: rgb(18, 18, 18);
  /* padding: 1rem; */ /*TODO: make padding a prop? */
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;
  @media (min-width: 768px) {
    .modal {
      width: 40rem;
      left: calc(50% - 20rem);
    }
  }
  /* @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  } */
`;

export interface ModalOverlayProps {
  children?: React.ReactChild | React.ReactChild[];
  onConfirm: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props: ModalOverlayProps) => {
  return (
    <StyledModalOverlay>
      <div>{props.children}</div>
      {/* <button onClick={props.onConfirm}>OK</button> */}
    </StyledModalOverlay>
  );
};

const portalElement = document.getElementById("overlays");

export interface ModalProps {
  children?: React.ReactChild | React.ReactChild[];
  onConfirm: () => void;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement!)}
      {ReactDOM.createPortal(
        <ModalOverlay onConfirm={props.onConfirm}>{props.children}</ModalOverlay>,
        portalElement!
      )}
    </>
  );
};

export default Modal;
