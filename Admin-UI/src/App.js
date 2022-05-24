import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import DataList from "./components/DataList";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { debounce } from "lodash";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function App() {
  const [data, setData] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [searchInput, setSearchInput] = useState("");
  const [actualData, setActualData] = useState([]);
  const [page, setPage] = useState(1);
  let postsPerPage = 10;

  let indexOfLastPost = page * postsPerPage;
  let indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        )
        .then((response) => {
          const list = response.data;
          list.forEach((obj) => (obj.isChecked = false));
          list.forEach((obj) => (obj.isEditable = false));
          setActualData(list);
          setData(list);
        });
    };
    fetchData();
  }, []);
  let count = Math.ceil(data.length / postsPerPage);

  console.log(data);
  const multipleDEleteHandler = () => {
    let rows = [...data];
    let toBeDeleated = rows.filter((obj) => obj.isChecked === true);
    if (toBeDeleated.length > 0) {
      toBeDeleated.forEach((obj) => {
        var index = rows.findIndex((e) => {
          return e.id === obj.id;
        });
        rows.splice(index, 1);
      });
      setData([...rows]);
      enqueueSnackbar("Multiple items deleted", {
        preventDuplicate: true,
      });
    } else {
      enqueueSnackbar("no item selected", {
        variant: "error",
        preventDuplicate: true,
      });
    }
    setPage(1);
  };
  const handleSearch = debounce((value) => {
    console.log(value);
    if (value.length > 0) {
      let filteredData = data.filter(
        (e) =>
          e.role === value.trim() ||
          e.name.toLowerCase().includes(value.toLowerCase()) ||
          e.email.toLowerCase().includes(value.toLowerCase())
      );
      if (filteredData.length > 0) {
        setData([...filteredData]);
      } else {
        setData([...actualData]);
      }
    } else {
      setData([...actualData]);
    }
  }, 500);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div>
        <Search handleSearch={handleSearch} />
      </div>

      <div>
        <DataList data={data} setData={setData} currentPosts={currentPosts} />
      </div>
      <Button
        variant="contained"
        color="error"
        sx={{
          borderRadius: 28,
          textTransform: "none",
          marginTop: 1,
          marginLeft: 2,
        }}
        onClick={multipleDEleteHandler}
      >
        Delete Selected
      </Button>

      <div className="pagination">
        <Pagination
          count={count}
          page={page}
          color="primary"
          onChange={handlePageChange}
          showLastButton
          showFirstButton
        />
      </div>
    </div>
  );
}

export default App;
