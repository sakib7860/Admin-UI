import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import CheckBox from "./CheckBox";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useSnackbar } from "notistack";
import "./DataListApp.css";

export default function DataList(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [allChecked, setAllChecked] = useState(false);

  let rows = [...props.data];
  let currentRows = [...props.currentPosts];
  const [formData, setFormData] = useState({});

  const allSelectHandler = (event) => {
    rows.forEach((obj) => {
      obj.isChecked = event.target.checked;
    });
    props.setData([...rows]);
    console.log(props.data);
    setAllChecked(true);
  };

  const checkboxHandler = (event) => {
    rows.forEach((obj) => {
      if (obj.id === event.target.value) {
        obj.isChecked = event.target.checked;
      }
    });
    props.setData([...rows]);
    console.log(props.data);
    setAllChecked(false);
  };

  const deleteHandler = (id) => {
    let toBeDeleated = rows.filter((obj) => obj.id === id);
    var index = rows.findIndex((e) => {
      return e.id === toBeDeleated[0].id;
    });
    rows.splice(index, 1);
    props.setData([...rows]);
    enqueueSnackbar("item deleted", {
      preventDuplicate: true,
    });
  };
  const cancelHandler = (id) => {
    rows.forEach((obj) => {
      if (obj.id === id) {
        obj.isEditable = false;
      }
    });
    props.setData([...rows]);
  };
  const editHandler = (id) => {
    rows.forEach((obj) => {
      if (obj.id === id) {
        obj.isEditable = true;
      } else {
        obj.isEditable = false;
      }
    });
    props.setData([...rows]);
  };
  const handleSave = (id) => {
    console.log(id);
    if (formData.name === "" || formData.role === "" || formData.email === "") {
      enqueueSnackbar("name or email or role should not be empty", {
        variant: "warning",
        preventDuplicate: true,
      });
    } else {
      rows.forEach((obj) => {
        if (obj.id === id) {
          for (let key in formData) {
            obj[key] = formData[key];
          }
          obj.isEditable = false;
        }
      });

      console.log(rows);
      props.setData([...rows]);
    }
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Checkbox onChange={allSelectHandler} checked={allChecked} />
            </TableCell>

            <TableCell align="left">
              <b>Name</b>
            </TableCell>
            <TableCell align="left">
              <b>Email</b>
            </TableCell>
            <TableCell align="left">
              <b>Role</b>
            </TableCell>
            <TableCell align="left">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.map((row) =>
            row.isEditable ? (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  <CheckBox data={row} checkboxHandler={checkboxHandler} />
                </TableCell>
                <TableCell align="left">
                  <TextField
                    id="outlined-basic"
                    style={{ border: "none" }}
                    variant="outlined"
                    name="name"
                    defaultValue={row.name}
                    onChange={handleChange}
                  >
                    {row.name}
                  </TextField>
                </TableCell>

                <TableCell align="left">
                  <TextField
                    id="outlined-basic"
                    style={{ border: "none" }}
                    variant="outlined"
                    name="email"
                    onChange={handleChange}
                    defaultValue={row.email}
                  >
                    {row.email}
                  </TextField>
                </TableCell>

                <TableCell align="left">
                  <TextField
                    id="outlined-basic"
                    style={{ border: "none" }}
                    variant="outlined"
                    name="role"
                    onChange={handleChange}
                    defaultValue={row.role}
                  >
                    {row.role}
                  </TextField>
                </TableCell>

                <TableCell align="left">
                  <Stack spacing={1} direction="row">
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        handleSave(row.id);
                      }}
                      sx={{ borderRadius: 25, textTransform: "none" }}
                      className="container"
                    >
                      save
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        cancelHandler(row.id);
                      }}
                      sx={{ borderRadius: 28, textTransform: "none" }}
                      className="container"
                    >
                      cancel
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  <CheckBox data={row} checkboxHandler={checkboxHandler} />
                </TableCell>

                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.role}</TableCell>

                <TableCell align="left">
                  <Stack spacing={1} direction="row">
                    <EditIcon
                      sx={{ color: blue[800] }}
                      size="small"
                      value={row.id}
                      onClick={() => {
                        editHandler(row.id);
                      }}
                    />
                    <DeleteOutlineIcon
                      size="small"
                      color="error"
                      onClick={() => {
                        deleteHandler(row.id);
                      }}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
