import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import SigninBar from '../signin-bar';

const WithModalControl = ({
  close_timeout,
  modal_show,
  on_modal_request_close,
  modal_style,
  modal_content,
  banner_title,
  signin_handler,
  signup_handler,
  signout_handler,
  signed_in_handler,
  is_signed_in,
  when_active_name,
  custom_input_handler_signedin,
  custom_input_handler_signedout,
  custom_input_signed_in_name,
  custom_input_signed_out_name,
  page_content,
}) => (
  <div className={'AvailableForWorkContainer'}>
    <Modal
      closeTimeoutMS={close_timeout}
      isOpen={modal_show}
      onRequestClose={on_modal_request_close}
      ariaHideApp={false}
      style={modal_style}
      contentLabel="yerevancoder">
      {modal_content()}
    </Modal>
    <nav className={'AvailableForWorkContainer__NavTopRow'}>
      <h4 className={'AvailableForWorkContainer__PageBanner'}>{banner_title}</h4>
      <SigninBar
        signin_handler={signin_handler}
        signup_handler={signup_handler}
        signout_handler={signout_handler}
        signed_in_handler={signed_in_handler}
        is_signed_in={is_signed_in}
        when_active_name={when_active_name}
        custom_input_handler_signedin={custom_input_handler_signedin}
        custom_input_handler_signedout={custom_input_handler_signedout}
        custom_input_signed_in_name={custom_input_signed_in_name}
        custom_input_signed_out_name={custom_input_signed_out_name}
      />
    </nav>
    {page_content()}
  </div>
);

WithModalControl.propTypes = {
  close_timeout: PropTypes.number,
  modal_show: PropTypes.bool,
  on_modal_request_close: PropTypes.func,
  modal_style: PropTypes.object,
  modal_content: PropTypes.func,
  banner_title: PropTypes.string,
  signin_handler: PropTypes.func,
  signup_handler: PropTypes.func,
  signout_handler: PropTypes.func,
  signed_in_handler: PropTypes.func,
  is_signed_in: PropTypes.bool,
  when_active_name: PropTypes.string,
  custom_input_handler_signedin: PropTypes.func,
  custom_input_handler_signedout: PropTypes.func,
  custom_input_signed_in_name: PropTypes.string,
  custom_input_signed_out_name: PropTypes.string,
  page_content: PropTypes.func,
};

export default WithModalControl;
