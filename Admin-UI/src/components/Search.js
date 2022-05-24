import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Search(props) {
  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      <TextField
        fullWidth
        id="fullWidth"
        placeholder="Search by name, email or role"
        onChange={(event) => {
          props.handleSearch(event.target.value);
        }}
      />
    </Box>
  );
}
