import * as React from "react";

export default class List extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div>
        <h2>List of Comments</h2>
        {this.props.data.map((comment: IComment) => (
          <div key={comment.id}>
            <div>{comment.title}</div>
          </div>
        ))}
      </div>
    );
  }
}

interface IProps {
  data: Array<object>;
}

interface IComment {
  title: string;
  id: string;
}
