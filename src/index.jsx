import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

let animationId;
const sigmoid = x => x / (1 + Math.abs(x));
const initialState = {
  transform: null,
  prevX: 0,
  rotation: 0,
};

class NaturalDragAnimation extends Component {
  static propTypes = {
    snapshot: PropTypes.shape({
      isDragging: PropTypes.bool.isRequired,
      dropAnimation: PropTypes.shape(),
    }).isRequired,
    style: PropTypes.shape().isRequired,
    children: PropTypes.func.isRequired,
    animationRotationFade: PropTypes.number,
    rotationMultiplier: PropTypes.number,
  };

  static defaultProps = {
    animationRotationFade: 0.9,
    rotationMultiplier: 1.3,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.snapshot.dropAnimation && state.transform) {
      return {
        ...initialState,
      };
    }

    return null;
  }

  state = {
    ...initialState,
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.snapshot.isDragging && this.props.snapshot.isDragging) {
      animationId = requestAnimationFrame(this.patchTransform);
    }

    if (prevProps.snapshot.isDragging && !this.props.snapshot.isDragging) {
      cancelAnimationFrame(animationId);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(animationId);
  }

  patchTransform = () => {
    const {
      snapshot: {
        isDragging,
      },
      style,
      animationRotationFade,
      rotationMultiplier,
    } = this.props;

    if (isDragging && style.transform) {
      const currentX = style.transform
        .match(/translate\(.{1,}\)/g)[0]
        .match(/-?[0-9]{1,}/g)[0];

      const velocity = currentX - this.state.prevX;
      const prevRotation = this.state.rotation;

      let rotation = prevRotation * animationRotationFade
        + sigmoid(velocity) * rotationMultiplier;

      const newTransform = `${style.transform} rotate(${rotation}deg)`;

      if (Math.abs(rotation) < 0.01) rotation = 0;

      this.setState({
        transform: newTransform,
        prevX: currentX,
        rotation,
      }, () => {
        animationId = requestAnimationFrame(this.patchTransform);
      });
    } else {
      animationId = requestAnimationFrame(this.patchTransform);
    }
  };

  render() {
    const { snapshot: { isDragging, dropAnimation } } = this.props;

    const style = isDragging && !dropAnimation
      ? {
        ...this.props.style,
        transform: this.state.transform,
      }
      : this.props.style;

    return <Fragment>{this.props.children(style)}</Fragment>;
  }
}

export default NaturalDragAnimation;
