import { Box, Modal } from "@mui/material";
import { styleCenter } from "src/bundles/UIAppBundle/styles";
import { ActivityNotesEditContainer, ActivityNotesEditContainerProps } from "../..";

export type ActivityNotesEditModal = {
    open: boolean;

    onClose: () => void;
} & ActivityNotesEditContainerProps

export const ActivityNotesEditModal: React.FC<ActivityNotesEditModal> = ({ open, onClose, ...activityNotesEditContainerProps }) => {
    return (
        <Modal {...{ open, onClose }}>
            <Box sx={styleCenter}>
                <ActivityNotesEditContainer {...activityNotesEditContainerProps} />
            </Box>
        </Modal>
    )
}