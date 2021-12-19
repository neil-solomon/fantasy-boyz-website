import React from "react";
import style from "./Menu.module.css";

export default class Menu extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.title}>Fantasy Boyz</div>
        <div className={style.menu}>
          <select onChange={this.props.changeView}>
            {this.props.views.map((view, ix) => (
              <option key={"menuOption" + view.title} value={ix}>
                {view.title ? view.title : view.table.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
