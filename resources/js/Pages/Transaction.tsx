import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPrint } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";

interface Client {
    id: number;
    name: string;
}

interface SubWarehouse {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
}

interface Transaction {
    id: number;
    client: Client;
    sub_warehouse: SubWarehouse;
    product: Product;
    transaction_type: 'sur site' | 'online';
    amount: number;
    transaction_date: string;
}

interface TransactionProps {
    transactions: Transaction[];
}


export default function Dashboard({ transactions }: TransactionProps) {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center space-x-2">
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-gray-800 text-xl font-semibold leading-tight">
                        Transaction History
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 space-y-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {transactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="bg-white shadow-lg p-4 rounded-lg w-full"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-lg">
                                            TXN{transaction.id}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            {new Date(
                                                transaction.transaction_date
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div
                                        className={`text-sm px-2 py-1 rounded-md ${
                                            transaction.transaction_type ===
                                            "sur site"
                                                ? "bg-green-500"
                                                : "bg-blue-500"
                                        } text-white`}
                                    >
                                        {transaction.transaction_type ===
                                        "sur site"
                                            ? "On Site"
                                            : "Online"}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <p className="text-xl font-semibold">
                                        ${transaction.amount}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        <strong>Made By:</strong>{" "}
                                        {transaction.client.name} <br />
                                        <strong>Sub Warehouse:</strong>{" "}
                                        {transaction.sub_warehouse.name} <br />
                                        <strong>Product:</strong>{" "}
                                        {transaction.product.name}
                                    </p>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <button className="hover-pop px-4 py-1 font-semibold text-xs text-black bg-gray-200 rounded-md hover:bg-gray-300">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button className="hover-pop px-4 py-1 font-semibold text-xs text-black bg-gray-200 rounded-md hover:bg-gray-300">
                                        <FontAwesomeIcon icon={faPrint} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
                >
                    <FontAwesomeIcon icon={faArrowUp} /> Back to Top
                </button>
            )}
        </AuthenticatedLayout>
    );
}
