import * as React from "react";
// import GridNotes from "./GridNote";

import List from "./List";

// import { number } from "prop-types";

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: true,
      invalidText: false,
      data: [],
      deleteResponse: false,
      currentNote: "",
      notes: []
    };
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (this.state.currentNote !== "") {
      this.setState({
        currentNote: "",
        notes: [
          ...this.state.notes,
          {
            id: this._timeInMilliseconds(),
            title: this.state.currentNote
          }
        ]
      });
    } else this.setState({ invalidText: true });
  }

  public deleteNote = (id: number): void => {
    // const filteredNotes: Array<INote> = this.state.notes.filter(
    //   (note: INote) => note.id !== id
    // );

    fetch(`https://private-anon-247962603d-note10.apiary-mock.com/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => this.setState({ deleteResponse: response.ok }));

    console.log("delete");
    // this.setState({ notes: filteredNotes });
  };

  public renderNotes(): JSX.Element[] {
    return this.state.notes.map((note: INote) => {
      return (
        <div key={note.id}>
          <span>{note.title}</span>
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
              onChange={e => this.setState({ currentNote: e.target.value })}
            >
              > aaa
            </textarea>
            <button type="submit">add note</button>
          </form>
          <section>{this.renderNotes()}</section>
          <List data={...data} deleteNote={this.deleteNote} />
          <div>{this.state.deleteResponse ? "note deleted" : null}</div>
        </div>
      );
    }
  }

  private _timeInMilliseconds(): number {
    const date: Date = new Date();
    return date.getTime();
  }
}

export interface INote {
  title: string;
  id: number;
}

interface IState {
  isLoading: boolean;
  invalidText: boolean;
  deleteResponse: boolean;
  data: Array<object>;
  currentNote: string;
  notes: Array<INote>;
}
