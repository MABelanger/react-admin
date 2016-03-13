import React                      from "react";
import Dropdown                   from "./dropdown/Dropdown";

export default class SectionTop extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-offset-2 col-xs-10">
          <div className="btn-toolbar">
            <Dropdown list={this.props.list} />
            <button className="btn btn-info" type="button">
              Modifier
            </button>
            <button className="btn btn-info" ng-click="newDaySchedule()">
              Nouveau
            </button>
          </div>
        </div>
      </div>
    );
  }
}