import * as React from "react";

export default class List extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
        detail: false
    };
  }

  public showDetail(): void {
      this.setState({detail: !this.state.detail})
  }

  public render(): JSX.Element {
     const { data } = this.props
    return (
      <div>
        <h2>List of Comments</h2>
        {data.map((comment: IComment) => (
          <div key={comment.id}>
            <div>{comment.id}</div>
            <button>show detail</button>
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

interface IState {
    detail: boolean;
}

interface IComment {
  title: string;
  id: string;
}
