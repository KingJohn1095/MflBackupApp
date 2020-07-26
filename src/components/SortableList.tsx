import * as React from "react";
import * as Material from "@material-ui/core";
import * as Drag from "react-smooth-dnd";
import arrayMove from "array-move";

interface SortableListProps<T> {
	onDropCallback?: (result: Drag.DropResult) => void;
	displayMethod: (item: T) => string | React.ReactNode;
	keyMethod: (item: T) => string | number;
	items: T[];
}

export const SortableList = <T extends unknown>({
	onDropCallback,
	displayMethod,
	keyMethod,
	items,
}: SortableListProps<T>) => {
	const [internalItems, setInternalItems] = React.useState<T[]>([]);
	React.useEffect(() => {
		setInternalItems(items);
	}, [items]);

	const onDrop = (props: Drag.DropResult) => {
		let { removedIndex, addedIndex } = props;
		if (removedIndex !== null && addedIndex !== null) {
			setInternalItems((items) => arrayMove(items, removedIndex!, addedIndex!));
		}
		onDropCallback && onDropCallback(props);
	};

	return (
		<Material.List>
			<Drag.Container
				// dragHandleSelector=".drag-handle"
				lockAxis="y"
				onDrop={onDrop}
			>
				{internalItems.map((item) => (
					<Drag.Draggable key={keyMethod(item)}>
						<Material.ListItem>{displayMethod(item)}</Material.ListItem>
					</Drag.Draggable>
				))}
			</Drag.Container>
		</Material.List>
	);
};
