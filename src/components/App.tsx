import * as React from "react";
import List from "./List";
import Note from "./Note";
// import { number } from "prop-types";

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: true,
      data: [],
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
    const filteredNotes: Array<INote> = this.state.notes.filter(
      (note: INote) => note.id !== id
    );
    this.setState({ notes: filteredNotes });
  }

  public renderNotes(): JSX.Element[] {
    return this.state.notes.map((note: INote) => {
      return (
        <div key={note.id}>
          <span>{note.value}</span>
          <button onClick={() => this.deleteNote(note.id)}>Delete</button>
        </div>
      );
    });
  }

  public componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://private-anon-2520b377ba-note10.apiary-mock.com/notes")
      .then(response => response.json())
      .then(data => this.setState({ data: data, isLoading: false }));
  }

  public render(): JSX.Element {
    const { data, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          <h2>New Note</h2>
          <form onSubmit={e => this.handleSubmit(e)}>
            <textarea 
              placeholder="add something"
              value={this.state.currentNote}
              onChange={e => this.setState({ currentNote: e.target.value })}>>
              aaa
              </textarea>
            <button type="submit">add note</button>
          </form>
          <section>{this.renderNotes()}</section>
          <h2>List of Notes</h2>
          <Note data={...data} />
        </div>
      );
    }
  }

  

  private _timeInMilliseconds(): number {
    const date: Date = new Date();
    return date.getTime();
  }
}

interface IState {
  isLoading: boolean;
  data: Array<object>;
  currentNote: string;
  notes: Array<INote>;
}

interface INote {
  id: number;
  value: string;
}
