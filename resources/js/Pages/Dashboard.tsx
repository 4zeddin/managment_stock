import { useState, useEffect } from "react";
import {
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    LineChart,
    Line,
    AreaChart,
    Area,
} from "recharts";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faEye, faPrint } from "@fortawesome/free-solid-svg-icons";

interface Client {
    id: number;
    name: string;
    total_product_price: number;
    total_paid: number;
    total_debt: number;
}

interface Transaction {
    id: number;
    client: {
    id: number;
    name: string;
};
    sub_warehouse: {
    id: number;
    name: string;
}
;
    product: {
    id: number;
    name: string;
}
;
    transaction_type: 'sur site' | 'online';
    amount: number;
    transaction_date: string;
}


interface ClientProps {
    clients: Client[];
    total_paid: number;
    total_debt: number;
    transactions: Transaction[];
}

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

export default function Dashboard({ clients, total_paid, total_debt, transactions }: ClientProps) {
    const [clientsInState, setClientsInState] = useState<Client[]>(clients);
    const [products, setProducts] = useState<Product[]>([]);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        // Sample product data
        setProducts([
            { id: 1, name: "Product 1", price: 50, stock: 10 },
            { id: 2, name: "Product 2", price: 100, stock: 5 },
            { id: 3, name: "Product 3", price: 75, stock: 8 },
            { id: 4, name: "Product 4", price: 120, stock: 3 },
        ]);

        // Show/hide "Back to Top" button based on scroll position
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setClientsInState(clients);
    }, [clients]);

    const totalRevenue = clientsInState.reduce(
        (sum, client) => sum + client.total_paid,
        0
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center space-x-2">
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-gray-800 text-xl font-semibold leading-tight">
                        Welcome to Admin Dashboard
                    </h2>
                    <div className="animate-wave text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-gray-800 text-xl">
                        <i className="fa-regular fa-hand"></i>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Bar Chart */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">
                            Total Paid per Client (Total revenue: $ {total_paid}
                            )
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={clientsInState}>
                                <defs>
                                    <linearGradient
                                        id="colorGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop offset="5%" stopColor="#1e40af" />
                                        <stop
                                            offset="95%"
                                            stopColor="#1e3a8a"
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="total_paid"
                                    fill="url(#colorGradient)"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Line Chart */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 h-64 p-4 overflow-y-auto">
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
                                            {transaction.sub_warehouse.name}{" "}
                                            <br />
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

                    {/* Area Chart */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">
                            Product Stock Levels (Area Chart)
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={products}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="stock"
                                    stroke="#ffc658"
                                    fill="#ffc658"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
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
