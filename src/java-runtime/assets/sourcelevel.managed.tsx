import * as React from "react";
import { JavaRuntimeEntry, RuntimeEntry } from "../types";
import { sourceLevelDisplayName, sourceLevelMajorVersion } from "../utils/misc";
import { updateRuntimePath } from "./vscode.api";

interface Props {
  entry: RuntimeEntry;
  jdks: JavaRuntimeEntry[];
}

export class SourceLevelRuntimePanel extends React.Component<Props, {}> {

  render = () => {
    const { sourceLevel, runtimePath } = this.props.entry;

    return (
      <div className="row">
        <div className="col">
          <div className="row sourcelevel">
            <div className="col">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="invisible">{sourceLevelDisplayName(sourceLevel)}:</label>
                </div>
                <select className="custom-select" name="jdk-for" id={sourceLevel} onChange={this.onSelectionChange} defaultValue={runtimePath}>
                  {/* TODO: sometimes runtimePath is undefined, e.g. LS use 11, project use 14 but without configuring java.configuarion.runtimes,
                  maybe an empty option should be provided. */}
                  {this.props.jdks.filter(jdk => jdk.majorVersion && jdk.majorVersion >= sourceLevelMajorVersion(sourceLevel)).map(jdk => (
                    <option key={jdk.name} value={jdk.fspath}>{jdk.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    updateRuntimePath(sourceLevelDisplayName(id), value);
  }

}
