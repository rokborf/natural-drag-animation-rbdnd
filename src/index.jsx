import React, { Component } from 'react';
import PropTypes from 'prop-types';

let animationId;
const sigmoid = x => x / (1 + Math.abs(x));

class NaturalDragAnimation extends Component {
  static propTypes = {
    isDragging: PropTypes.bool.isRequired,
    style: PropTypes.shape().isRequired,
    children: PropTypes.func.isRequired,
    animationRotationFade: PropTypes.number,
    rotationMultiplier: PropTypes.number,
  };

  static defaultProps = {
    animationRotationFade: 0.9,
    rotationMultiplier: 1.3,
  };

  state = {
    transform: null,
  };

  velocity = 0;

  prevX = 0;

  rotation = 0;

  componentDidUpdate(prevProps) {
    if (!prevProps.isDragging && this.props.isDragging) {
      animationId = requestAnimationFrame(this.patchTransform);
    }

    if (prevProps.isDragging && !this.props.isDragging) {
      cancelAnimationFrame(animationId);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(animationId);
  }

  patchTransform = () => {
    const {
      isDragging,
      style,
      animationRotationFade,
      rotationMultiplier,
    } = this.props;

    if (isDragging && style.transform) {
      const currentX = style.transform
        .match(/translate\(.{1,}\)/g)[0]
        .match(/-?[0-9]{1,}/g)[0];

      this.velocity = currentX - this.prevX;
      this.prevX = currentX;

      this.rotation = this.rotation * animationRotationFade
        + sigmoid(this.velocity) * rotationMultiplier;

      const newTransform = `${style.transform} rotate(${this.rotation}deg)`;

      if (Math.abs(this.rotation) < 0.01) this.rotation = 0;

      this.setState({ transform: newTransform }, () => {
        animationId = requestAnimationFrame(this.patchTransform);
      });
    } else {
      animationId = requestAnimationFrame(this.patchTransform);
    }
  };

  render() {
    const style = this.props.isDragging
      ? {
        ...this.props.style,
        transform: this.state.transform,
      }
      : this.props.style;

    return <div>{this.props.children(style)}</div>;
  }
}

export default NaturalDragAnimation;
