import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import ConfirmDelete from "@/Components/ConfirmDelete";
import StoreProductModal from "@/Components/Product/StoreProductModal";


interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    total_price: number;
    sub_warehouse: {
        name: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}


interface ProductsProps {
    products: {
        data: Product[];
        links: PaginationLink[];
        current_page: number;
    };
    subWarehouses: any;
}

export default function Dashboard({ products, subWarehouses }: ProductsProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProductData, setSelectedProductData] = useState<Product | null>(null);

    const filteredProducts = products.data.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const handleDelete = () => {
        if (selectedProductId) {
            try {
                router.delete(route("product.destroy", selectedProductId), {
                    onSuccess: () => {
                        toast.success("Product deleted successfully");
                        closeDelete();
                    },
                });
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("Failed to delete product");
            }
        }
    };

    const closeDelete = () => {
        setConfirmDelete(false);
        setSelectedProductId(null);
    };

    const openEditModal = (product: Product) => {
        setSelectedProductData(product);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedProductData(null);
        setIsEditModalOpen(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center space-x-2">
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-gray-800 text-xl font-semibold leading-tight">
                        Products Table
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4 space-x-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="border border-gray-300 rounded-lg px-3 py-2"
                        />
                        <button
                            className="pl-1 bg-blue-700 text-white rounded-lg h-9 flex items-center overflow-hidden transition-max-width duration-500 ease-in-out max-w-[38px] hover:max-w-[300px] hover:bg-gradient-to-r from-blue-900 to-blue-700"
                            onClick={() => setIsAddModalOpen(true)}
                            aria-label="Add new product"
                        >
                            <span className="flex items-center mr-3 px-2">
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            <span className="whitespace-nowrap pr-3">
                                Add New Product
                            </span>
                        </button>
                    </div>

                    <div className="bg-white shadow-lg sm:rounded-lg overflow-x-auto">
                        <table className="w-full border-collapse table-auto">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                                    <th className="py-4 px-3 sm:px-6 text-left font-semibold uppercase text-xs sm:text-sm">
                                        ID
                                    </th>
                                    <th className="py-4 px-3 sm:px-6 text-left font-semibold uppercase text-xs sm:text-sm">
                                        Name
                                    </th>
                                    <th className="py-4 px-3 sm:px-6 text-left font-semibold uppercase text-xs sm:text-sm">
                                        Quantity
                                    </th>
                                    <th className="py-4 px-3 sm:px-6 text-left font-semibold uppercase text-xs sm:text-sm">
                                        Price
                                    </th>
                                    <th className="py-4 px-3 sm:px-6 text-left font-semibold uppercase text-xs sm:text-sm">
                                        Sub Magazine
                                    </th>
                                    <th className="py-4 px-3 sm:px-6 text-center font-semibold uppercase text-xs sm:text-sm">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="odd:bg-gray-50 even:bg-white hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm text-blue-900">
                                            #{product.id}
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                                            {product.name}
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm font-medium">
                                            {product.quantity}
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                                            ${product.price}
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                                            {product.sub_warehouse
                                                ? product.sub_warehouse.name
                                                : "No Warehouse"}
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm text-center">
                                            <button
                                                onClick={() =>
                                                    openEditModal(product)
                                                }
                                                className="hover-pop px-4 py-1 mr-2 font-semibold text-xs text-black bg-gray-200 rounded-md hover:bg-gray-300"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setConfirmDelete(true);
                                                    setSelectedProductId(
                                                        product.id
                                                    );
                                                }}
                                                className="hover-pop px-4 py-1 font-semibold text-xs text-black bg-gray-200 rounded-md hover:bg-gray-300"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        {isEditModalOpen && (
                                            <StoreProductModal
                                                subWarehouses={subWarehouses}
                                                productData={
                                                    selectedProductData
                                                }
                                                title="Edit Product"
                                                show={isEditModalOpen}
                                                onClose={closeEditModal}
                                                opacity="opacity-20"
                                            />
                                        )}
                                        {isAddModalOpen && (
                                            <StoreProductModal
                                                title="Add Product"
                                                show={isAddModalOpen}
                                                onClose={() =>
                                                    setIsAddModalOpen(false)
                                                }
                                                opacity="opacity-20"
                                                subWarehouses={subWarehouses}
                                            />
                                        )}
                                        {confirmDelete && (
                                            <ConfirmDelete
                                                show={confirmDelete}
                                                title="Product"
                                                handleDelete={handleDelete}
                                                onClose={closeDelete}
                                            />
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={products.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
