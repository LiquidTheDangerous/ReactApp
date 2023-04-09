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
import BaseTableQuery from './TableRepr/BaseTableQuery';
import Department from './Querys/Department';
import FacultyTable from './TableRepr/Faculty/FacultyTable'
import DepartmentTableFull from './TableRepr/Department/DepartmentTableFull';
import StudentFullDescriptionTable from './TableRepr/Student/StudentFullDescriptionTable';
import StudyGroupFullView from './TableRepr/StudyGroup/StudyGroupFullView';
import StudyGroup from './Querys/StudyGroup';
import BaseFullView from './TableRepr/StudyGroup/BaseFullView';
import DialogForm from './DialogForm';




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

  const ApiToRouteList = [
    {
      routePath: "/StudyGroupShortView",
      apiPath: "http://localhost:8080/studyGroup/shortView/getAll"
    },
    {
      routePath: "/BaseGroup",
      apiPath: "http://localhost:8080/studyGroup/base/getAll"
    },
    {
      routePath: "/Department",
      apiPath: "http://localhost:8080/department/getAll"
    },
    {
      routePath: "/AcademicTitle",
      apiPath: "http://localhost:8080/academicTitle/getAll"
    },
    {
      routePath: "/LecturerFullDescription",
      apiPath: "http://localhost:8080/lecturer/fullDescription/getAll"
    }
  ]

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
            <Sidebar width="400px" style={{ boxShadow: "0 10px 10px rgba(0,0,0,0.5)", position: "absolute" }} >
              <Menu
                menuItemStyles={Style}>
                <SubMenu label="Учебные группы"
                  rootStyles={Style}>
                  <MenuItem rootStyles={Style} component={<Link to="/StudyGroupFullView" />}> Полное описание </MenuItem>
                  <MenuItem rootStyles={Style} component={<Link to="/StudyGroupShortView" />}> Группы студентов </MenuItem>
                  <MenuItem rootStyles={Style} component={<Link to="/BaseGroup" />}> Группы(База) </MenuItem>
                  <MenuItem rootStyles={Style} component={<Link to="/BaseGroupFull" />}> Группы(База) полное описание </MenuItem>
                </SubMenu>
                <SubMenu label="Кафедры">
                  <MenuItem rootStyles={Style} component={<Link to="/Department" />}>Кафедры</MenuItem>
                  <MenuItem rootStyles={Style} component={<Link to="/DepartmentFull" />}>Кафедры с Факультетами</MenuItem>
                </SubMenu>
                <MenuItem rootStyles={Style} component={<Link to="/Faculty"></Link>}>Факультеты</MenuItem>
                <SubMenu label="Преподаватели">
                  <MenuItem component={<Link to="/AcademicTitle"></Link>}>Академические звания</MenuItem>
                  <MenuItem component={<Link to="/LecturerFullDescription"></Link>}>Полное описание</MenuItem>
                </SubMenu>
                <SubMenu label="Студенты">
                  <MenuItem component={<Link to="/StudentFullDescription"></Link>}>Полное описание</MenuItem>
                </SubMenu>
              </Menu>
            </Sidebar>
          ) : (<></>)}
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >


        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
      >
        <Grid item md={12} xl={12}>
          <main style={{ marginTop: "10vh" }}>
            <Routes path='/'>
              <Route exact={true} path='/StudyGroupShortView' element={<StudyGroupShortView />}></Route>
              <Route exact={true} path='/BaseGroup' element={<BaseGroup />}></Route>
              <Route exact={true} path='/BaseGroupFull' element={<BaseFullView />}></Route>
              <Route exact={true} path='/Department' element={<DepartmentTable />}></Route>
              <Route exact={true} path='/AcademicTitle' element={<AcademicTitleTable />}></Route>
              <Route exact={true} path='/LecturerFullDescription' element={<LecturerFullDescription />}></Route>
              <Route exact={true} path='/Faculty' element={<FacultyTable />}></Route>
              <Route exact={true} path='/DepartmentFull' element={<DepartmentTableFull />}></Route>
              <Route exact={true} path='/StudentFullDescription' element={<StudentFullDescriptionTable />}></Route>
              <Route exact={true} path='/StudyGroupFullView' element={<StudyGroupFullView />}></Route>
            </Routes>
            {/* <DialogForm dialogElements={
              {
                elements:[
                  {
                    type:"selector",
                    name:"Age",
                    getOptions: ()=>{return ["1","2","3"]},
                    showOption: (obj)=>{return obj},
                    getValue: (obj)=>{return obj},
                    onChange: (event)=>{console.log(event.target.value)},
                    required:true
                  },
                  {
                    type:"textField",
                    name:"test",
                    onChange:(event)=>{console.log(event.target.value)},
                    required:false
                  }
                ]
              }
            }> */}

            {/* </DialogForm> */}
          </main>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
