import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import NaturalDragAnimation from '../../src';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

class Item extends Component {
  render() {
    const { item, index, ...props } = this.props;

    return (
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
      >
        {(provided, snapshot) => (
          <NaturalDragAnimation
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
            )}
            isDragging={snapshot.isDragging}
            {...props}
          >
            {style => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={style}
              >
                {item.content}
              </div>
            )}
          </NaturalDragAnimation>
        )}
      </Draggable>
    );
  }
}

export default Item;
