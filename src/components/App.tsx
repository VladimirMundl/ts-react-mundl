import * as React from "react";
import List from "./List";
import { FormattedMessage } from "react-intl";
import { IntlProvider, addLocaleData } from "react-intl";
import locale_en from "react-intl/locale-data/en";
import locale_de from "react-intl/locale-data/de";

import * as messages_en from "../translations/en.json";
import * as messages_de from "../translations/de.json";

addLocaleData(locale_en);
addLocaleData(locale_de);

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
  locale: any;
  messages: any;
}

interface IProps {
  onChangeLanguage: (lang: string) => void;
}


export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: true,
      invalidText: false,
      data: [],
      currentNote: "",
      notes: [],
      message: "",
      locale: "EN",
      messages: messages_en
    };
  }

  public onChangeLanguage = (lang: any): void => {
    switch (lang) {
      case "EN":
        this.setState({ messages: messages_en });
        break;
      case "DE":
        this.setState({ messages: messages_de });
        break;
    }
    this.state.locale === "EN"
      ? this.setState({ locale: lang })
      : this.setState({ locale: "EN" });
  };

  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (this.state.currentNote !== "") {
      this.setState({
        currentNote: ""
      });
      this.addNote(this.state.currentNote);
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
      .then(() => this.showMessage("deleted"));
  };

  public addNote = (title: string): void => {
    fetch("https://private-anon-247962603d-note10.apiary-mock.com/notes", {
      method: "POST",
      body: JSON.stringify({ title })
    })
      .then(
        response => {
          if (response.ok) {
            this.showMessage("created");
          }
          throw new Error("Request failed!");
        },
        networkError => {
          console.log(networkError.message);
        }
      )
      .then(jsonResponse => {
        return jsonResponse;
      });
  };

  public editNote = (id: number, title: string): void => {
    fetch(
      `https://private-anon-247962603d-note10.apiary-mock.com/notes/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ title })
      }
    ).then(response => {
      if (response.ok) {
        this.showMessage("edited");
      }
    });
  };

  public showMessage = (action: string): void => {
    this.setState({ message: action });
    setTimeout(
      function() {
        this.setState({ message: "" });
      }.bind(this),
      3000
    );
  };

  public changeLanguage = (lang: string): void => {
    if (this.state.locale === "EN") {
      this.onChangeLanguage(lang);
    } else {
      this.onChangeLanguage("EN");
    }
  };

  public renderMessage() {
    switch (this.state.message) {
      case "created":
        return (
          <FormattedMessage
            id="created"
            defaultMessage="Vytvořeno"
            description="New Note"
            values={{ what: "react-intl" }}
          />
        );
        break;
      case "deleted":
        return (
          <FormattedMessage
            id="deleted"
            defaultMessage="Smazáno"
            description="New Note"
            values={{ what: "react-intl" }}
          />
        );
        break;
      case "edited":
        return (
          <FormattedMessage
            id="edited"
            defaultMessage="Upraveno"
            description="New Note"
            values={{ what: "react-intl" }}
          />
        );
        break;
    }
  }

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
        <IntlProvider locale={this.state.locale} messages={this.state.messages}>
          <div>
            <button onClick={() => this.changeLanguage("DE")}>ENG/CZ</button>
            <h2>
              <FormattedMessage
                id="header.note"
                defaultMessage="Nová poznámka"
                description="New Note"
                values={{ what: "react-intl" }}
              />
            </h2>
      
            <form className="form-note" onSubmit={e => this.handleSubmit(e)}>
              <textarea
                placeholder="..."
                value={this.state.currentNote}
                onChange={e => this.setState({ currentNote: e.target.value })}
              >
              </textarea>
              <button type="submit"><FormattedMessage
                id="add.note"
                defaultMessage="Ulož poznámku"
                description="Add Note"
                values={{ what: "react-intl" }}
              /></button>
            </form>
       
            <List
              data={...data}
              deleteNote={this.deleteNote}
              editNote={this.editNote}
            />
            <div>{this.renderMessage()}</div>
          </div>
        </IntlProvider>
      );
    }
  }
}

