import React from "react";
import Person from "../../models/Person";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid, IconButton } from "@material-ui/core";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import "./PersonCardDetail.css";
import RestoreIcon from "@material-ui/icons/Restore";
import { RecordTypeEnum } from "../../common/enum";
import StarIcon from "@material-ui/icons/Star";
import { useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

const useStyles = makeStyles({
  root: {
    maxWidth: "99%",
  },
});

interface PersonCardDetailProps {
  personList: Person[];
  personRecordType: RecordTypeEnum;
  onStarredIconClicked?: (isStarred: boolean, id: string) => void;
  onDeletedIconClicked?: (id: string) => void;
  onRestoreIconClicked?: (id: string) => void;
}

const PersonCardDetail: React.FC<PersonCardDetailProps> = ({
  personList,
  personRecordType,
  onStarredIconClicked,
  onDeletedIconClicked,
  onRestoreIconClicked,
}) => {
  const classes = useStyles();
  const [isOpenConfirmationDialog, setIsOpenConfirmationDialog] =
    useState<boolean>(false);
  const [personId, setPersonId] = useState<string>("");

  const onDeleteRecordClicked = (id: string) => {
    setIsOpenConfirmationDialog(true);
    setPersonId(id);
  };

  const onAcceptClicked = () => {
    onDeletedIconClicked!(personId)
    setIsOpenConfirmationDialog(false);
  }

  const onCancelClicked = () => {
    setIsOpenConfirmationDialog(false);
  }

  return (
    <>
      {personList.length > 0 ? (
        personList.map((person, index) => (
          <>
            <Card className={classes.root} key={person.id} variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="h1">
                  {person.name}
                </Typography>
                <Grid container className="card-detail">
                  <Grid item xs={4}>
                    <b>Gender: </b>
                    {person.gender}
                  </Grid>
                  <Grid item xs={4}>
                    <b>Email Address: </b>
                    {person.email}
                  </Grid>
                  <Grid item xs={4}>
                    <b>Contact Number: </b>
                    {person.mobileNo}
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions className="card-action">
                {personRecordType !== RecordTypeEnum.Trashed ? (
                  <>
                    <IconButton
                      aria-label="Star"
                      onClick={() =>
                        onStarredIconClicked!(!person.isStarred, person.id)
                      }
                      color={person.isStarred ? "secondary" : "default"}
                    >
                      {person.isStarred ? (
                        <StarIcon fontSize="large" />
                      ) : (
                        <StarOutlineIcon fontSize="large" />
                      )}
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => onDeleteRecordClicked(person.id)}
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="Restore"
                    onClick={() => onRestoreIconClicked!(person.id)}
                  >
                    <RestoreIcon fontSize="large" />
                  </IconButton>
                )}
              </CardActions>
            </Card>
            {personList.length > index ? (
              <div className="empty-space"> </div>
            ) : (
              ""
            )}
          </>
        ))
      ) : (
        <h3> No Record Found </h3>
      )}
      {isOpenConfirmationDialog && (
        <ConfirmationDialog
          onAcceptClicked={onAcceptClicked}
          onCancelClicked={onCancelClicked}
        />
      )}
    </>
  );
};

export default PersonCardDetail;
