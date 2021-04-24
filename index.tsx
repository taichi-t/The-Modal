import * as React from "react";
import * as ReactDOM from "react-dom";
import { ModalWrapper } from "./Modal";
import { Modal } from "./Modal";

const Main = () => {
  const onAfterOpen = () => {
    console.log("after open");
  };

  const onAfterClose = () => {
    console.log("after close");
  };
  return (
    <>
      <p>ほお</p>
      <ModalWrapper onAfterOpen={onAfterOpen} onAfterClose={onAfterClose}>
        {({ onModalClose, onModalOpen, isModalOpen }) => (
          <>
            <Modal isModalOpen={isModalOpen}>
              <>
                <p>モーダルが{isModalOpen ? "開いています" : "閉じてます"}</p>
                <button onClick={onModalClose}>モーダルが閉じます</button>
              </>
            </Modal>
            <button onClick={onModalOpen}>モーダルが開きます</button>
          </>
        )}
      </ModalWrapper>
    </>
  );
};

ReactDOM.render(<Main />, document.getElementById("app"));
