import * as React from "react";

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
        this.state.currentNote
      ]
    })
  }




  public renderNotes(): JSX.Element[] {
    return this.state.notes.map((note: string, index: number) => <div key={index}>{note}</div>);
  };

  public render(): JSX.Element {
    console.log(this.state)
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
        <section>{ this.renderNotes() }</section>
      </div>
    );
  }
}

interface IState {
  currentNote: string;
  notes: Array<string>;
}