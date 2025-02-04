import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Client {
    id: number;
    name: string;
    total_product_price: number;
    total_paid: number;
    total_debt: number;
}

interface StoreClientModalProps {
    title: string;
    clientData?: Client | null;
    show: boolean;
    onClose: () => void;
    opacity?: string;
}

const StoreClientModal = ({
    show,
    title,
    clientData,
    onClose,
    opacity,
}: StoreClientModalProps) => {
    if (!show) return null;

    const btnValue : String = clientData ? "Update" : "Save";

    const { data, setData, processing, errors, post, put, reset, clearErrors } = useForm({
        name: clientData?.name || "",
        total_product_price: clientData?.total_product_price || 0,
        total_paid: clientData?.total_paid || 0,
    });

    function submit(e: { preventDefault: () => void }) {
        e.preventDefault();

        const submitAction = clientData ? put : post;
        const url = clientData ? `/client/${clientData.id}` : "/client";

        submitAction(url, {
            onSuccess: () => {
                toast.success(
                    `Client ${clientData ? "updated" : "added"} successfully`
                );
                onClose();
                setData({
                    name: "",
                    total_product_price: 0,
                    total_paid: 0,
                });
                reset();
                clearErrors();
            },
            onError: (error) => {
                console.error("Error:", error);
                toast.error(
                    `Failed to ${clientData ? "update" : "add"} client`
                );
            },
        });
    }

    return (
        <Modal show={show} onClose={onClose} opacity={opacity}>
            <div className="p-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <form className="mt-2" onSubmit={submit}>
                    <div className="my-2">
                        <InputLabel value="Name" />
                        <TextInput
                            placeholder="Full Name"
                            className="w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="mb-2">
                        <InputLabel value="Total Amount" />
                        <TextInput
                            placeholder="$ 0.00"
                            type="number"
                            className="w-full"
                            value={data.total_product_price}
                            onChange={(e) =>
                                setData(
                                    "total_product_price",
                                    parseFloat(e.target.value) || 0
                                )
                            }
                        />
                        <InputError message={errors.total_product_price} />
                    </div>
                    <div className="mb-2">
                        <InputLabel value="Paid Amount" />
                        <TextInput
                            placeholder="$ 0.00"
                            type="number"
                            className="w-full"
                            value={data.total_paid}
                            onChange={(e) =>
                                setData(
                                    "total_paid",
                                    parseFloat(e.target.value) || 0
                                )
                            }
                        />
                        <InputError message={errors.total_paid} />
                    </div>
                    <PrimaryButton
                        className="flex items-end ml-auto"
                        disabled={processing}
                    >
                        {processing ? (
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className="animate-spin text-white font-bold"
                            />
                        ) : (
                            btnValue
                        )}
                    </PrimaryButton>
                </form>
            </div>
        </Modal>
    );
};

export default StoreClientModal;
