import React, { Component } from 'react';

class FileElement extends Component {
  render() {
    return <li id={this.props.fileName}>{this.props.fileName} <button type="button" onClick={this.props.onClick} className="btn btn-deep-orange btn-sm waves-effect waves-light">eliminar</button></li>
  }
}

export default FileElement;