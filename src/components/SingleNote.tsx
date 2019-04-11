import * as React from "react";
import { INote } from "./App";
import { SyntheticEvent } from 'react';

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

  public closeEditing(e: { target: any }): void {
    if (e.target.classList.contains("edit")) {
     null
    }
    else {
      console.log(e.target.classList)
      console.log(e);
      this.setState({ edit: false });
    }
  }

  public openEditing(): void {
    this.setState({ edit: !this.state.edit });
  }

  handleSubmit(e: SyntheticEvent<{}>): void {
    e.preventDefault();
    this.props.editNote(this.props.note.id, this.state.current);
    this.setState({ edit: false });
  }

  componentDidMount(): void {
    document.addEventListener("mousedown", e => this.closeEditing(e));
  }

  public render(): JSX.Element {
    const { note } = this.props;
    return (
      <div>
        
        <div key={note.id}>
        <i onClick={() => this.props.deleteNote(note.id)} className="fas fa-times" />
          {this.state.detail ? (
            <button onClick={() => this.showDetail()}>hide</button>
          ) : null}
          {this.state.detail && !this.state.edit && (
            <div onClick={() => this.openEditing()}>{note.title}</div>
          )}
          {this.state.edit && (
            <div >
              <form onSubmit={e => this.handleSubmit(e)}>
                <input
                  className="edit"
                  type="text"
                  value={this.state.current}
                  onChange={e => this.setState({ current: e.target.value })}
                />
              <button type="submit" className="edit">Save</button>
              </form>  
            </div>
          )}
          {!this.state.detail && !this.state.edit && (
            <div onClick={() => this.openEditing()}>{`${note.title.substring(0,11)}...`}</div>
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

