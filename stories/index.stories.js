import React from 'react';

import { storiesOf } from '@storybook/react';

import List from './demo/List';

storiesOf('Natural Drag Animation', module)
  .add('default', () => <List />)
  .add('animationRotationFade = 0.5', () => <List animationRotationFade={0.5} />)
  .add('animationRotationFade = 0.99', () => <List animationRotationFade={0.99} />)
  .add('rotationMultiplier = 1', () => <List rotationMultiplier={1} />)
  .add('rotationMultiplier = 3', () => <List rotationMultiplier={3} />);
