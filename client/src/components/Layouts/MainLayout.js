import React from "react";
//import PropTypes from 'prop-types'
import { Header, Footer, AuthOptions, Modal } from "../index";
import {
  useLayoutState,
  useLayoutDispatch,
  toggleAuthModal,
  useUserState,
  useUserDispatch,
  clearError,
  clearFeedBack,
} from "../../contexts";
import { Alert } from "../Alert";

export function Layout({ children }) {
  const {  isAuthModalOpened, authInstance } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const userDispatch = useUserDispatch();
  const { error, feedback } = useUserState();
  //function to pass down to Auth modal
  const toggleAuthInternally = () => toggleAuthModal(layoutDispatch);

  return (
    <>
      <Header />
      <main className="main" style={{marginTop:"10vh"}}>
        {children}
      </main>
      <Footer />
      <Modal show={isAuthModalOpened} closeModal={toggleAuthInternally} form>
        {isAuthModalOpened && (
          <AuthOptions
            instance={authInstance}
            closeModal={toggleAuthInternally}
          />
        )}
      </Modal>
      {/* bottom left user level alert */}
      {feedback && (
        <Alert
          pos={"bl"}
          message={feedback}
          close={() => clearFeedBack(userDispatch)}
        />
      )}
      {/* top right app level alert*/}
      {error && (
        <Alert
          pos={"tr"}
          type="error"
          message={error}
          close={() => clearError(userDispatch)}
        />
      )}
      {/*  */}
    </>
  );
}

Layout.propTypes = {};
