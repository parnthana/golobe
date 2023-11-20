import CloseIcon from "@mui/icons-material/Close";

interface PopupModalProps {
  context: React.ReactNode;
  visible: boolean;
  onClosed: () => void;
}

export default function PopUpModal(props: PopupModalProps) {
  return (
    props.visible && (
      <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50 z-20 flex p-4">
        <div className="bg-white rounded-2xl px-4 w-1/2 space-y-4 py-5 overflow-scroll h-3/5">
          <div className="w-full items-end justify-end flex">
            <button className="" onClick={props.onClosed}>
              <CloseIcon />
            </button>
          </div>
          {props.context}
        </div>
      </div>
    )
  );
}
