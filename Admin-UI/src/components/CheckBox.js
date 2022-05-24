import React from "react";
import Checkbox from "@mui/material/Checkbox";

const CheckBox = (props) => {
  return (
    <input
      key={props.id}
      onChange={props.checkboxHandler}
      type="checkbox"
      checked={props.data.isChecked}
      value={props.data.id}
    />
  );
};

export default CheckBox;
