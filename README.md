## Info
Addon for the [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) that adds natural dragging animation.

## Demo
https://rokborf.github.io/natural-drag-animation-rbdnd/

## Instalation
```
# yarn
yarn add natural-drag-animation-rbdnd

# npm
npm install natural-drag-animation-rbdnd
```

## Example
```
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

...

	<Draggable>
	  {(provided, snapshot) => (
	    <NaturalDragAnimation
	      style={provided.draggableProps.style}
	      snapshot={snapshot}
	    >
	      {style => (
	        <div
	          ref={provided.innerRef}
	          {...provided.draggableProps}
	          {...provided.dragHandleProps}
	          style={style}
	        >
	          Item content
	        </div>
	      )}
	    </NaturalDragAnimation>
	  )}
	</Draggable>
  
...
      
```

#### Note
The component modifies styles from `draggableProps`, so `style` prop should be placed after `{...provided.draggableProps}`
to override styles from it.

## Props

### snapshot (required)
**Object.** Pass `snapshot` from `Draggable`.

### style (required)
**Object.** In most cases just pass `provided.draggableProps.style` from `Draggable`. `NaturalDragAnimation` patches `transform` from it.

### animationRotationFade
**Number.** Use it to define fade speed of end rotation animation. Must be 0 < `animationRotationFade` < 1.

**default = 0.9**

### rotationMultiplier
Number. Use it to define rotation multiplier.

**default = 1.3**

## Compatibility

### Version 2
Compatible with react-beautiful-dnd v.10+

### Version 1
Compatible with react-beautiful-dnd v.9
    
## Author
Dmytro Lytvynenko lytvynenko.dmytrij@gmail.com

## License
MIT

## Thanks
Nash Vail for his [article](https://uxdesign.cc/how-to-fix-dragging-animation-in-ui-with-simple-math-4bbc10deccf7) 
