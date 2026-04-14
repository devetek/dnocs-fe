export interface SelectionListProps<Id> {
  items: Array<Item<Id>>;
  selectedId?: Id | null;
  onClickItem?: (id: Id) => void;
}

export interface Item<Id> {
  id: Id;
  title: string;
  desc?: string;
}
