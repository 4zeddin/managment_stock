import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    total_price: number;
}

interface SubWarehouse {
    id: number;
    name: string;
}

interface StoreProductModalProps {
    title: string;
    productData?: Product | null;
    show: boolean;
    onClose: () => void;
    opacity?: string;
    subWarehouses: SubWarehouse[];
}

const StoreProductModal = ({
    show,
    title,
    productData,
    onClose,
    opacity,
    subWarehouses,
}: StoreProductModalProps) => {
    if (!show) return null;

    const btnValue = productData ? "Update" : "Save";

    const { data, setData, processing, errors, post, put, reset, clearErrors } =
        useForm({
            name: productData?.name || "",
            quantity: productData?.quantity || 0,
            price: productData?.price || 0,
            sub_warehouse_id: productData?.id || "", 
        });

    function submit(e: { preventDefault: () => void }) {
        e.preventDefault();

        const submitAction = productData ? put : post;
        const url = productData ? `/product/${productData.id}` : "/product";

        submitAction(url, {
            onSuccess: () => {
                toast.success(
                    `Product ${productData ? "updated" : "added"} successfully`
                );
                onClose();
                setData({
                    name: "",
                    quantity: 0,
                    price: 0,
                    sub_warehouse_id: "", 
                });
                reset();
                clearErrors();
            },
            onError: (error) => {
                console.error("Error:", error);
                toast.error(
                    `Failed to ${productData ? "update" : "add"} product`
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
                            placeholder="Product Name"
                            className="w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="mb-2">
                        <InputLabel value="Quantity" />
                        <TextInput
                            placeholder="0"
                            type="number"
                            className="w-full"
                            value={data.quantity}
                            onChange={(e) =>
                                setData(
                                    "quantity",
                                    parseInt(e.target.value) || 0
                                )
                            }
                        />
                        <InputError message={errors.quantity} />
                    </div>
                    <div className="mb-2">
                        <InputLabel value="Price" />
                        <TextInput
                            placeholder="$ 0.00"
                            type="number"
                            className="w-full"
                            value={data.price}
                            onChange={(e) =>
                                setData(
                                    "price",
                                    parseFloat(e.target.value) || 0
                                )
                            }
                        />
                        <InputError message={errors.price} />
                    </div>
                    <div className="mb-2">
                        <InputLabel value="Sub Magazine" />
                        <div>
                            <select
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                value={data.sub_warehouse_id}
                                onChange={(e) =>
                                    setData(
                                        "sub_warehouse_id",
                                        parseInt(e.target.value)
                                    )
                                }
                            >
                                <option value="">Select a warehouse</option>
                                {subWarehouses.map((subWarehouse) => (
                                    <option
                                        key={subWarehouse.id}
                                        value={subWarehouse.id}
                                    >
                                        {subWarehouse.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <InputError message={errors.sub_warehouse_id} />
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

export default StoreProductModal;
