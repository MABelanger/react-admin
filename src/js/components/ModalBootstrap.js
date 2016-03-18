import React                      from "react";
import Modal                      from "react-bootstrap/lib/Modal";

export default class ModalBootstrap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      msg: ""
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open(msg) {
    this.setState({ showModal: true });
  }

  onYes(){
    this.close();
    this.props.onYes();
  }

  onNo(){
    this.close();
    this.props.onNo();
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Attention</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.msg}
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.onYes.bind(this)}>Oui</button>
            <button onClick={this.onNo.bind(this)}>Non</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}