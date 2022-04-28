import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MainPage() {
  const columns = [
    { field: "id", headerName: "ID", width: 210 },
    {
      field: "firstName",
      headerName: "Ім'я",
      width: 160
    },
    {
      field: "lastName",
      headerName: "Прізвище",
      width: 160
    },
    {
      field: "age",
      headerName: "Вік",
      type: "number",
      editable: true,
      width: 60
    },
    {
      field: "fatherName",
      headerName: "По-батькові",
      width: 160
    },
    {
      field: "address",
      headerName: "Адреса",
      sortable: false,
      width: 200
    },
    {
      field: "fullName",
      headerName: "Піб",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""} ${params.row.fatherName || ""}`
    },
    {
      field: "isConscript",
      headerName: "Військово'язаний",
      type: "string",
      sortable: true,
      width: 150,
      valueGetter: (params) => {
        return params.row.isConscript ? "Так" : "Ні";
      }
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Дії",
      flex: 0.2,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Видалити запис"
          key={params.row.id}
          onClick={async () => {
            await removeRequest(params.row.id);
          }}
        />
      ]
    }
  ];

  const [isCreate, setCreate] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [age, setAge] = useState("");
  const [search, setSearch] = useState("");
  const [conscripts, setConscripts] = useState([]);
  const [isConscript, setConscript] = useState(true);
  const [address, setAddress] = useState("");

  async function sendCreateRequest() {
    // eslint-disable-next-line no-undef
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/`, {
      firstName,
      lastName,
      fatherName,
      age,
      address,
      isConscript
    });
    await fetchConscripts();
  }

  async function fetchConscripts() {
    // eslint-disable-next-line no-undef
    const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/conscripts?search=`);
    console.log(result);

    setConscripts(result.data);
  }

  async function searchRequest() {
    const response = await axios.get(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_SERVER_URL}/conscripts?search=${search}&firstName=${firstName}&lastName=${lastName}&fatherName=${fatherName}`
    );
    setConscripts(response.data);
  }

  async function removeRequest(id) {
    // eslint-disable-next-line no-undef
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}?id=${id}`);
    await fetchConscripts();
  }

  useEffect(() => {
    fetchConscripts();
    console.log(conscripts);
  }, []);
  return (
    <Stack
      sx={{ width: "100%", mt: 13 }}
      direction="column"
      justifyContent="center"
      alignItems="center">
      <Box
        sx={{
          height: "100vh"
        }}>
        <Box>
          <Grid
            container
            justifyContent="center"
            rowSpacing={1}
            columns={10}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={5}>
              <TextField
                variant={"outlined"}
                fullWidth
                required={isCreate ? true : false}
                //margin={"normal"}
                onChange={(e) => (isCreate ? setAge(+e.target.value) : setSearch(e.target.value))}
                id={"search"}
                label={isCreate ? "Вік" : "Пошук"}
                name={isCreate ? "Вік" : "Пошук"}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant={"outlined"}
                fullWidth
                required={isCreate ? true : false}
                //margin={"normal"}
                id={"fatherName"}
                onChange={(e) => setFatherName(e.target.value)}
                label={"По-батькові"}
                name={"По-батькові"}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant={"outlined"}
                fullWidth
                required={isCreate ? true : false}
                //margin={"normal"}
                id={"lastName"}
                onChange={(e) => setLastName(e.target.value)}
                label={"Прізвище"}
                name={"Прізвище"}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant={"outlined"}
                fullWidth
                //margin={"normal"}
                id={"fatherName"}
                onChange={(e) => setAddress(e.target.value)}
                label={"Адреса"}
                name={"Адреса"}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant={"outlined"}
                fullWidth
                required={isCreate ? true : false}
                //margin={"normal"}
                id={"firstName"}
                onChange={(e) => setFirstName(e.target.value)}
                label={"Ім'я"}
                name={"Ім'я"}
              />
            </Grid>
            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Військовозобов&apos;язаний?</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={isConscript}
                  label="Військово'язаний?"
                  onChange={(e) => setConscript(e.target.value)}>
                  <MenuItem value={true}>Так</MenuItem>
                  <MenuItem value={false}>Ні</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {!isCreate ? (
            <Stack sx={{ mt: 2 }} direction="row" spacing={4}>
              <Button
                onClick={() => {
                  setCreate(true);
                }}
                variant="contained"
                fullWidth
                color="secondary"
                style={{ cursor: "pointer" }}>
                Додати
              </Button>
              <Button
                onClick={async () => searchRequest()}
                fullWidth
                variant="contained"
                color="secondary">
                Знайти
              </Button>
            </Stack>
          ) : (
            <Stack sx={{ mt: 2 }} direction="row" spacing={4}>
              <Button
                onClick={() => setCreate(false)}
                fullWidth
                variant="contained"
                color="warning">
                Скасувати
              </Button>
              <Button
                onClick={async () => {
                  await sendCreateRequest();
                  setCreate(false);
                }}
                fullWidth
                variant="contained"
                color="success">
                Додати
              </Button>
            </Stack>
          )}
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: 20 }}>
          <DataGrid
            rows={conscripts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </Box>
    </Stack>
  );
}
