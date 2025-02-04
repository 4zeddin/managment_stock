import Pagination from "@/Components/Pagination";
import StoreClientModal from "@/Components/Client/StoreClientModal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import ConfirmDelete from "@/Components/ConfirmDelete";

interface Client {
    id: number;
    name: string;
    total_product_price: number;
    total_paid: number;
    total_debt: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface ClientsProps {
    clients: {
        data: Client[];
        links: PaginationLink[];
        current_page: number;
    };
}

export default function Dashboard({ clients }: ClientsProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<number | null>( null );
    const [selectedClientData, setSelectedClientData] = useState<Client | null>( null );
    const [searchQuery, setSearchQuery] = useState("");

    const filteredClients = clients.data.filter((client) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const handleDelete = () => {
        if (selectedClientId) {
            try {
                router.delete(
                    route("client.destroy", selectedClientId),
                    {
                        onSuccess: () => {
                            toast.success("Client deleted successfully");
                            closeDelete();
                        },
                    }
                );
            } catch (error) {
                console.error("Error deleting client:", error);
                toast.error("Failed to delete client");
            }
        }
    };

    const closeDelete = () => {
        setConfirmDelete(false);
        setSelectedClientId(null);
    };

    const openEditModal = (client: Client) => {
        setSelectedClientData(client);
        setIsEditModalOpen(true);
    }

    const closeEditModal = () =>{
        setSelectedClientData(null);
        setIsEditModalOpen(false);
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center space-x-2">
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-gray-800 text-xl font-semibold leading-tight">
                        Clients Table
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
                            placeholder="Search clients..."
                            className="border border-gray-300 rounded-lg px-3 py-2"
                        />
                        <button
                            className="pl-1 bg-blue-700 text-white rounded-lg h-9 flex items-center overflow-hidden transition-max-width duration-500 ease-in-out max-w-[38px] hover:max-w-[300px] hover:bg-gradient-to-r from-blue-900 to-blue-700"
                            onClick={() => setIsAddModalOpen(true)}
                            aria-label="Add new client"
                        >
                            <span className="flex items-center mr-3 px-2">
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            <span className="whitespace-nowrap pr-3">
                                Add New Client
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
                                        Total
                                    </th>
                                    <th className="py-4 px-3 sm:px-6 text-left font-semibold uppercase text-xs sm:text-sm">
                                        Paid
                                    </th>
                                    <th className="py-4 px-3 sm:px-6 text-left font-semibold uppercase text-xs sm:text-sm">
                                        Debt
                                    </th>
                                    <th className="py-4 px-3 sm:px-6 text-left font-semibold uppercase text-xs sm:text-sm">
                                        Email
                                    </th>
                                    <th className="py-4 px-3 sm:px-6 text-center font-semibold uppercase text-xs sm:text-sm">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClients.map((client) => (
                                    <tr
                                        key={client.id}
                                        className="odd:bg-gray-50 even:bg-white hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm text-blue-900">
                                            #{client.id}
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                                            {client.name}
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm font-medium">
                                            ${client.total_product_price}
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                                            <span className="bg-green-200 text-green-800 rounded-lg px-2 sm:px-3 py-1 inline-block font-medium">
                                                ${client.total_paid}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                                            <span className="bg-red-200 text-red-800 rounded-lg px-2 sm:px-3 py-1 inline-block font-medium">
                                                ${client.total_debt}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                                            xxxxxxx@xxxx.com
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm text-center">
                                            <button
                                                onClick={() =>
                                                    openEditModal(client)
                                                }
                                                className="hover-pop px-4 py-1 mr-2 font-semibold text-xs text-black bg-gray-200 rounded-md hover:bg-gray-300"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setConfirmDelete(true);
                                                    setSelectedClientId(
                                                        client.id
                                                    );
                                                }}
                                                className="hover-pop px-4 py-1 font-semibold text-xs text-black bg-gray-200 rounded-md hover:bg-gray-300"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        {isEditModalOpen && (
                                            <StoreClientModal
                                                clientData={selectedClientData}
                                                title="Edit Client"
                                                show={isEditModalOpen}
                                                onClose={closeEditModal}
                                                opacity="opacity-20"
                                            />
                                        )}
                                        {isAddModalOpen && (
                                            <StoreClientModal
                                                title="Add Client"
                                                show={isAddModalOpen}
                                                onClose={() =>
                                                    setIsAddModalOpen(false)
                                                }
                                                opacity="opacity-20"
                                            />
                                        )}
                                        {confirmDelete && (
                                            <ConfirmDelete
                                                show={confirmDelete}
                                                title="CLient"
                                                handleDelete={handleDelete}
                                                onClose={closeDelete}
                                            />
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={clients.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
