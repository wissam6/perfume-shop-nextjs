"use client";
import * as React from "react";
import {
  Dialog,
  DialogProps,
  DialogCloseEvent,
} from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { useRouter } from "next/navigation";

interface DialogPopupInterface extends DialogProps {
  isVisible: boolean;
  message: string;
}

export const DialogPopup = (props: DialogPopupInterface) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState<boolean>(props.isVisible);

  const toggleDialog = (event: DialogCloseEvent) => {
    setVisible(!visible);
    router.push("../home");
  };

  React.useEffect(() => {
    setVisible(props.isVisible);
  }, [props.isVisible]);

  return (
    <div>
      {visible && (
        <Dialog title={"Please confirm"} onClose={toggleDialog}>
          <p style={{ margin: "25px", textAlign: "center" }}>{props.message}</p>
          {/* <DialogActionsBar>
            <Button>Back to Home Page</Button>
          </DialogActionsBar> */}
        </Dialog>
      )}
    </div>
  );
};
