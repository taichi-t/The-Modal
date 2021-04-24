import * as React from "react";
import * as ReactDOM from "react-dom";

type ModalProps = {
  children: React.ReactElement;
  isModalOpen: boolean;
};

function isDefined<T>(value: T | undefined | null): value is T {
  return typeof value !== "undefined" && value !== null;
}

const Modal: React.FC<ModalProps> = ({ children, isModalOpen }) => {
  const ref = React.useRef<HTMLElement | null>();
  let container = null;

  React.useEffect(() => {
    ref.current = document.body;
    return () => {
      ref.current = null;
    };
  }, []);

  if (isDefined(ref.current) && React.isValidElement(children)) {
    container = ReactDOM.createPortal(children, ref.current);
  }

  return isModalOpen ? container : null;
};

type ModalWrapperProps = {
  onAfterClose?: () => void;
  onAfterOpen?: () => void;
  children: (args: RenderProps) => React.ReactElement;
};

type RenderProps = {
  onModalClose: () => void;
  onModalOpen: () => void;
  isModalOpen: boolean;
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  onAfterClose = () => {},
  onAfterOpen = () => {},
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const onModalClose = () => {
    setIsModalOpen(false);
    onAfterClose();
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
    onAfterOpen();
  };

  console.log(isModalOpen);

  return (
    <div
      children={children({
        onModalClose,
        onModalOpen,
        isModalOpen,
      })}
    ></div>
  );
};

export { ModalWrapper, Modal };
