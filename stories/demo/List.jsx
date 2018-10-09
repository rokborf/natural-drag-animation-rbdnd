import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd-next';
import Column from './Column';

// fake data generator
const getItems = (count, offset = 0) => Array.from({ length: count }, (v, k) => k).map(k => ({
  id: `item-${k + offset}`,
  content: `item ${k + offset}`,
}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class List extends Component {
    state = {
      items: getItems(10),
      selected: getItems(5, 10),
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
      droppable: 'items',
      droppable2: 'selected',
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = (res) => {
      const { source, destination } = res;

      // dropped outside the list
      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const items = reorder(
          this.getList(source.droppableId),
          source.index,
          destination.index,
        );

        let state = { items };

        if (source.droppableId === 'droppable2') {
          state = { selected: items };
        }

        this.setState(state);
      } else {
        const result = move(
          this.getList(source.droppableId),
          this.getList(destination.droppableId),
          source,
          destination,
        );

        this.setState({
          items: result.droppable,
          selected: result.droppable2,
        });
      }
    };

    render() {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '600px',
        }}
        >
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Column droppableId="droppable" data={this.state.items} {...this.props} />
            <Column droppableId="droppable2" data={this.state.selected} {...this.props} />
          </DragDropContext>
        </div>
      );
    }
}

export default List;
