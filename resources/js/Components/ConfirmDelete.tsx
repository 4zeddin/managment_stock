import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface ConfirmDeleteProps {
    title: string;
    show: boolean;
    onClose: () => void;
    handleDelete: () => void;
}

export default function ConfirmDelete({
    title,
    onClose,
    handleDelete,
    show,
}: ConfirmDeleteProps) {
    return (
        <Modal
            maxWidth="sm"
            show={show}
            onClose={onClose}
            opacity="opacity-5"
        >
            <div className="p-6 text-center">
                <FontAwesomeIcon
                    icon={faTrashCan}
                    className="text-red-500 mx-auto"
                    size="2xl"
                />
                <h3 className="my-4 text-lg font-black text-gray-800">
                    Confirm Delete
                </h3>
                <p className="text-sm text-gray-500">
                    Are you sure you want to delete this {title} Record? This
                    action cannot be undone.
                </p>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="hover-pop px-4 py-2 mr-2 font-bold text-xs text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="hover-pop px-4 py-2 font-bold text-xs text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    );
}
