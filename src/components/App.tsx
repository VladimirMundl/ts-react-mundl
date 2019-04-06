import * as React from "react";

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currentNote: "",
      notes: []
    };
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.setState({
      currentNote: "",
      notes: [
        ...this.state.notes,
        this.state.currentNote
      ]
    })
  }

  render() {
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
      </div>
    );
  }
}

interface IState {
  currentNote: string;
  notes: Array<string>;
}