import React, { Component } from 'react';

class MetaIcon extends Component<{ text: string; size: string }, any> {
  render() {
    const { text, size } = this.props;
    const width = size === 'sm' ? 30 : 60;
    const height = width;

    return (
      <div className="MetaIcon" style={{ width: width, height: height }}>
        {text}
      </div>
    );
  }
}

export default MetaIcon;
