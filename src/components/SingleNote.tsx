import * as React from "react";
import { INote } from "./App";

export default class SingleNote extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      detail: false,
      edit: false,
      current: this.props.note.title
    };
  }

  public showDetail(): void {
    this.setState({ detail: !this.state.detail });
  }

  public openEditing(): void {
    this.setState({ edit: !this.state.edit });
  }

  handleSubmit(e: any): void {
    e.preventDefault();
    this.props.editNote(this.props.note.id, this.state.current);
    this.setState({ edit: false });
  }

  public render(): JSX.Element {
    const { note } = this.props;
    return (
      <div>
        <h3>Note {note.id.toString().substring(0, 3)}</h3>
        <div key={note.id}>
          {this.state.detail ? (
            <button onClick={() => this.showDetail()}>hide</button>
          ) : null}
          <i
            onClick={() => this.props.deleteNote(note.id)}
            className="fas fa-times"
          />
          {this.state.detail && !this.state.edit && (
            <div onClick={() => this.openEditing()}>{note.title}</div>
          )}
          {this.state.edit && (
            <form onSubmit={e => this.handleSubmit(e)}>
              {" "}
              <input
                type="text"
                value={this.state.current}
                onChange={e => this.setState({ current: e.target.value })}
              />
            </form>
          )}
          {!this.state.detail && (
            <div onClick={() => this.showDetail()}>{`${note.title.substring(
              0,
              9
            )}...`}</div>
          )}
        </div>
      </div>
    );
  }
}

interface IProps {
  note: INote;
  deleteNote: (id: number) => void;
  editNote: (id: number, title: string) => void;
}

interface IState {
  detail: boolean;
  edit: boolean;
  current: string;
}
