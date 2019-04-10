import * as React from "react";
import SingleNote from "./SingleNote";
import { INote } from "./App";

export default class List extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  public render(): JSX.Element {
    const { data, deleteNote, editNote } = this.props;
    return (
      <div>
        <h2>List of Notes</h2>
        {data.map((note: INote) => (
          <SingleNote note={note} 
                      deleteNote={deleteNote}
                      editNote={editNote} />
        ))}
      </div>
    );
  }
}

interface IProps {
  data: Array<object>;
  deleteNote: (id: number) => void;
  editNote: (id: number, title: string) => void;
}

interface IState {}
