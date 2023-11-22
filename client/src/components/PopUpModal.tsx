import CloseIcon from "@mui/icons-material/Close";

interface PopupModalProps {
  context: React.ReactNode;
  visible: boolean;
  onClosed: () => void;
}

export default function PopUpModal(props: PopupModalProps) {
  return (
    props.visible && (
      <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50 z-50 flex p-4">
        <div className="bg-white rounded-2xl px-4 w-1/2 space-y-4 py-5 h-fit">
          <div className="w-full items-end justify-end flex max-h-[5vh]">
            <button className="" onClick={props.onClosed}>
              <CloseIcon />
            </button>
          </div>
          <div className="w-full flex overflow-auto max-h-[80vh]">
            {props.context}
          </div>
        </div>
      </div>
    )
  );
}
