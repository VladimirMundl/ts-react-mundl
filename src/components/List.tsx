import * as React from "react";
import SingleNote from "./SingleNote";

export default class List extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
        
    };
  }


  public render(): JSX.Element {
     const { data, deleteNote } = this.props
    return (
      <div>
        <h2>List of Notes</h2>
        {data.map((note: INote) => (
          <SingleNote note={note} deleteNote={deleteNote}  />
        ))}
      </div>
    );
  }
}

interface IProps {
  data: Array<object>;
  deleteNote: any;
}

interface IState {
 
}

interface INote {
  title: string;
  id: string;
}

