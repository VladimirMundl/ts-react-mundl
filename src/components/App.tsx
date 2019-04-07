import * as React from "react";
import { number } from "prop-types";

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currentNote: "",
      notes: []
    };
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    this.setState({
      currentNote: "",
      notes: [
        ...this.state.notes,
        {
          id: this._timeInMilliseconds(),
          value: this.state.currentNote
        }
      ]
    });
  }

  public deleteNote(id: number): void {
    const filteredNotes: Array<INote> = this.state.notes.filter((note: INote) => note.id !== id);
    this.setState({notes: filteredNotes})
  }

  public renderNotes(): JSX.Element[] {
    return this.state.notes.map((note: INote, index: number) => {
      return (
        <div key={note.id}>
          <span>{note.value}</span>
          <button onClick={() => this.deleteNote(note.id)}>Delete</button>
        </div>
      );
    });
  }

  public render(): JSX.Element {
    console.log(this.state);
    return (
      <div>
        <h1>Notes application</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="add something"
            value={this.state.currentNote}
            onChange={e => this.setState({ currentNote: e.target.value })}
          />
          <button type="submit">add note</button>
        </form>
        <section>{this.renderNotes()}</section>
      </div>
    );
  }

  private _timeInMilliseconds(): number {
    const date: Date = new Date();
    return date.getTime();
  }
}

interface IState {
  currentNote: string;
  notes: Array<INote>;
}

interface INote {
  id: number;
  value: string;
}
