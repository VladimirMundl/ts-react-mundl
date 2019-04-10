import * as React from "react";
import List from "./List";

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: true,
      invalidText: false,
      data: [],
      currentNote: "",
      notes: [],
      message: ""
    };
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (this.state.currentNote !== "") {
      this.setState({
        currentNote: "",
       });
       this.addNote(this.state.currentNote)
    } else this.setState({ invalidText: true });
  }

  public deleteNote = (id: number): void => {
    fetch(
      `https://private-anon-247962603d-note10.apiary-mock.com/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => console.log(response))
      .then(this.showMessage("deleted"));
  };

  public addNote = (title: string): void => {
    fetch("https://private-anon-247962603d-note10.apiary-mock.com/notes", {
      method: 'POST',
      body: JSON.stringify({title})
    }).then(response => {
      if(response.ok) {
        this.showMessage("created")
    }
    throw new Error('Request failed!');
    }, networkError => {
    console.log(networkError.message)
    }).then(jsonResponse => {
    return jsonResponse
})
  }

  public editNote = (id: number, title: string): void => {
    fetch(`https://private-anon-247962603d-note10.apiary-mock.com/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({title})
    }).then(response => {
      if(response.ok) {
        this.showMessage("edited")
    }
    }, )
}



  public showMessage = (action: string): any => {
    this.setState({ message: action });
      setTimeout(
        function() {
          this.setState({ message: "" });
        }.bind(this),
        3000
      );

  };

  public componentDidMount(): void {
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
              >
            </textarea>
          
            <button type="submit">add note</button>
          </form>
          <List data={...data} 
                deleteNote={this.deleteNote} 
                editNote={this.editNote}/>
          <div>{this.state.message}</div>
        </div>
      );
    }
  }

}

export interface INote {
  title: string;
  id: number;
}

interface IState {
  isLoading: boolean;
  invalidText: boolean;
  data: Array<object>;
  currentNote: string;
  notes: Array<INote>;
  message: string;
}
