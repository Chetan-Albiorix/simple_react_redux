import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

interface ConfirmationDialogProps {
    onCancelClicked: () => void;
    onAcceptClicked: () => void;
}
  
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    onCancelClicked,
    onAcceptClicked,
  }) => {

  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this item?
        </DialogTitle>
        <DialogActions>
          <Button onClick={onCancelClicked} color="primary">
            No
          </Button>
          <Button onClick={onAcceptClicked} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;
