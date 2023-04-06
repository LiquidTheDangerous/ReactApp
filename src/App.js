import logo from './logo.svg';
import { Routes, Route, Link } from 'react-router-dom'
import StudyGroupShortView from './TableRepr/StudyGroup/StudyGroupShortView';
import GetAllByDepartmentsID from './TableRepr/StudyGroup/GetAllByDepartmentsId';
import BaseGroup from './TableRepr/StudyGroup/BaseGroup';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, sidebarClasses } from 'react-pro-sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import DepartmentTable from './TableRepr/Department/DepartmentTable';
import AcademicTitle from './Querys/AcademicTitle';
import AcademicTitleTable from './TableRepr/Lecturer/AcademicTitleTable';
import BaseTableGetQuery from './TableRepr/BaseTableGetQuery';
import { URL } from './Querys/ApiProps';
import LecturerFullDescription from './TableRepr/Lecturer/LecturerFullDescription';





function App() {
  const { collapseSidebar } = useProSidebar();
  const [isMenuVisible, setMenuVisible] = useState(false)

  const onMenuButtonClick = () => setMenuVisible(!isMenuVisible)

  const Style = {
    button: ({ level, active, disabled }) => {

      return {
        color: "white",
        backgroundColor: "#1976d2",
        "&:hover": {
          backgroundColor: "#335B8C !important",
          color: "white !important",
          fontWeight: "bold !important"
        },
      };

    },
  }
  return (
    <div className="App" >

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="baseline"
      >

        <Grid item md={12}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={onMenuButtonClick}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" component="div">
                App
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>

        <Grid item md={4}>

          {isMenuVisible ? (
            <Sidebar width="400px" style={{ boxShadow: "0 10px 10px rgba(0,0,0,0.5)" }} >
              <Menu
                menuItemStyles={Style}>
                <SubMenu label="Учебные группы"
                  rootStyles={Style}>
                  <MenuItem rootStyles={Style} component={<Link to="/StudyGroupShortView" />}> Группы студентов </MenuItem>
                  <MenuItem rootStyles={Style} component={<Link to="/BaseGroup" />}> Группы(База) </MenuItem>
                </SubMenu>
                <MenuItem rootStyles={Style} component={<Link to="/Department" />}>Кафедры</MenuItem>
                <SubMenu label="Преподаватели">
                  <MenuItem component={<Link to="/AcademicTitle"></Link>}>Академические звания</MenuItem>
                  <MenuItem component={<Link to="/LecturerFullDescription"></Link>}>Полное описание</MenuItem>
                </SubMenu>
              </Menu>
            </Sidebar>
          ) : (<></>)}


        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
      >

        {/* <Grid item md={12}> */}

        {/* </Grid> */}

      </Grid>
      <main style={{ marginTop: "10vh" }}>
        <Routes path='/'>
          <Route exact={true} path='/StudyGroupShortView' element={<StudyGroupShortView />}></Route>
          <Route exact={true} path='/BaseGroup' element={<BaseGroup />}></Route>
          <Route exact={true} path='/Department' element={<DepartmentTable />}></Route>
          <Route exact={true} path='/AcademicTitle' element={<AcademicTitleTable />}></Route>
          <Route exact={true} path='/LecturerFullDescription' element={<LecturerFullDescription />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
