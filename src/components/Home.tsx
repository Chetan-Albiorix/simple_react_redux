import React from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Person from "../models/Person";
import PersonCardDetail from "./PersonCardDetail/PersonCardDetail";
import { RecordTypeEnum } from "../common/enum";
import { connect } from "react-redux";
import {
  addStarredPersonRecord,
  deletePersonRecord,
  restorePersonRecord,
} from "../store/PersonReducers";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "98%",
    padding: 10,
  },
}));

interface HomeProps {
  personList: Person[];
  addStarredPersonRecord: (isStarred: boolean, id: string) => void;
  deletePersonRecord: (id: string) => void;
  restorePersonRecord: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({
  personList,
  addStarredPersonRecord,
  deletePersonRecord,
  restorePersonRecord,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const getAllRecordList = () => {
    return personList.filter(
      (person: Person) => !person.isStarred && !person.isDeleted
    );
  };

  const getStarredRecordList = () => {
    return personList.filter((person: Person) => person.isStarred);
  };

  const getDeletedRecordList = () => {
    return personList.filter((person: Person) => person.isDeleted);
  };

  const onStarredIconClicked = (isStarred: boolean, id: string) => {
    addStarredPersonRecord(isStarred, id);
  };

  const onDeletedIconClicked = (id: string) => {
    deletePersonRecord(id);
  };

  const onRestoreIconClicked = (id: string) => {
    restorePersonRecord(id);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="ALL" {...a11yProps(0)} />
          <Tab label="STARRED" {...a11yProps(1)} />
          <Tab label="TRASHED" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <PersonCardDetail
            personList={getAllRecordList()}
            personRecordType={RecordTypeEnum.All}
            onStarredIconClicked={onStarredIconClicked}
            onDeletedIconClicked={onDeletedIconClicked}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <PersonCardDetail
            personList={getStarredRecordList()}
            personRecordType={RecordTypeEnum.Starred}
            onStarredIconClicked={onStarredIconClicked}
            onDeletedIconClicked={onDeletedIconClicked}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <PersonCardDetail
            personRecordType={RecordTypeEnum.Trashed}
            personList={getDeletedRecordList()}
            onRestoreIconClicked={onRestoreIconClicked}
          />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    personList: state.personState.personList,
  };
};

const mapDispatchToProps = {
  addStarredPersonRecord,
  deletePersonRecord,
  restorePersonRecord,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
