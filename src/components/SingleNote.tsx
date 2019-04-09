import * as React from "react";
import { INote } from "./App"

export default class SingleNote extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      detail: false
    };
  }

  public showDetail(): void {
    this.setState({ detail: !this.state.detail });
  }

  public render(): JSX.Element {
    const { note } = this.props;
    return (
      <div>
        <h3>Note {note.id.toString().substring(0, 3)}</h3>
        <div key={note.id}>
          <button onClick={() => this.showDetail()}>
            {this.state.detail ? `hide detail` : `show detail`}
          </button>
          <button onClick={() => this.props.deleteNote(note.id)}>delete note</button>
          {this.state.detail ? (
            <div>{note.title}</div>
          ) : (
            <div>{`${note.title.substring(0, 9)}...`}</div>
          )}
        </div>
      </div>
    );
  }
}

interface IProps {
  note: INote;
  deleteNote: (id: number) => void;
}

interface IState {
  detail: boolean;
}

