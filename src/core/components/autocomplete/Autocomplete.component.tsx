import * as React from 'react';
import { createPortal } from 'react-dom';
import * as R from 'ramda';

import { Input } from '~/components';

import { Menu } from './Autocomplete.styled';

export type AutocompleteProps<T> = {
  items: T[];
  value: string;
  keyValue: string;
  openMenu?: boolean;
  sortable?: boolean;
  onSelect: (item: T) => void;
  renderItem: (item: T, highlighted: boolean) => React.ReactElement;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  renderInput: (props: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactElement;
};

export type AutocompleteState<T> = {
  opened: boolean;
  highlighted?: number;
  items: T[];
};

export class Autocomplete<T> extends React.Component<AutocompleteProps<T>, AutocompleteState<T>> {
  public static defaultProps = {
    onChange: () => null,
    onSelect: () => null,
    renderItem: (item: any, highlighted: boolean) => (
      <div
        style={{
          backgroundColor: highlighted ? 'black' : 'white',
          color: highlighted ? 'white' : 'black',
        }}
      >
        {item}
      </div>
    ),
    renderInput: (props: React.InputHTMLAttributes<HTMLInputElement>) => <Input {...props} />,
  };

  private readonly containerNode: HTMLDivElement;

  private inputRef: HTMLInputElement | null = null;

  constructor(props: AutocompleteProps<T>) {
    super(props);

    this.state = {
      opened: false,
      items: props.items,
    };

    this.containerNode = document.createElement('div');
    this.containerNode.id = 'autocomplete-container';
  }

  public componentDidMount(): void {
    document.body.appendChild(this.containerNode);
  }

  public componentWillUnmount(): void {
    document.body.removeChild(this.containerNode);
  }

  public componentWillReceiveProps(nextProps: Readonly<AutocompleteProps<T>>): void {
    const { items } = this.props;

    if (items !== nextProps.items) {
      this.setState({ items: nextProps.items, highlighted: undefined });
    }
  }

  private onFocus = () => {
    this.setState({ opened: true });
  };

  private getItems = () => {
    const { items } = this.state;
    const { sortable, keyValue, value } = this.props;

    return sortable
      ? // @ts-ignore
        items.filter((item) => (keyValue in item ? item[keyValue].includes(value) : true))
      : items;
  };

  private onBlur = () => {
    const { highlighted } = this.state;

    if (highlighted !== undefined) this.select(this.getItems()[highlighted]);
    this.setState({ opened: false, highlighted: undefined });
  };

  private isOpen = () => this.props.openMenu || this.state.opened;

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!this.isOpen()) return this.setState({ opened: true });

    if (R.has(e.key, this.handlers)) {
      e.preventDefault();
      this.handlers[e.key](e);
    }
  };

  private handlers: any = {
    ArrowUp: (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { highlighted } = this.state;

      if (this.props.items.length === 0) return;

      if (highlighted === undefined || highlighted === 0) {
        this.setState({ highlighted: this.getItems().length - 1 });
      } else this.setState({ highlighted: highlighted - 1 });
    },
    ArrowDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { highlighted } = this.state;

      if (this.props.items.length === 0) return;

      if (highlighted === undefined || highlighted === this.getItems().length - 1) {
        this.setState({ highlighted: 0 });
      } else this.setState({ highlighted: highlighted + 1 });
    },
    Enter: (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { highlighted } = this.state;

      if (highlighted === undefined) return;

      this.select(this.getItems()[highlighted]);
    },
  };

  private select = (item: T) => {
    const { onSelect } = this.props;

    onSelect(item);

    this.setState({ opened: false });
  };

  private getInput = () => {
    const { renderInput, value, onChange } = this.props;

    return React.cloneElement(
      renderInput({
        value,
        onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.handleKeyDown,
      }),
      {
        ref: (ref: HTMLInputElement) => (this.inputRef = ref),
      },
    );
  };

  private getMenuPosition = () => {
    const rect = this.inputRef && this.inputRef.getBoundingClientRect();

    return rect ? [rect.left, rect.top + rect.height, rect.width, rect.height] : [0, 0, 0, 0];
  };

  private getMenu = () => {
    const [x, y, width] = this.getMenuPosition();

    return (
      <Menu
        className="autocomplete-menu"
        x={x}
        y={y}
        style={{
          width,
        }}
      >
        {// @ts-ignore
        this.getItems().map(this.renderItem)}
      </Menu>
    );
  };

  private renderItem = (item: T, index: number) => {
    const { renderItem } = this.props;
    const { highlighted } = this.state;

    return React.cloneElement(renderItem(item, highlighted === index), {
      onClick: () => this.select(item),
      onMouseEnter: () => this.setState({ highlighted: index }),
      onMouseLeave: () => this.setState({ highlighted: undefined }),
    });
  };

  public render(): React.ReactNode {
    return (
      <>
        {this.getInput()}
        {this.isOpen() && createPortal(this.getMenu(), this.containerNode)}
      </>
    );
  }
}
