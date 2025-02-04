import { Link, router } from "@inertiajs/react";

interface PaginationLink {
    url: string | null,
    active: boolean,
    label: string
}
interface PaginationProps {
    links: PaginationLink[];
}

export default function Pagination({links}: PaginationProps) {
    return (
        <div className="flex flex-wrap justify-center my-4 space-x-1 sm:space-x-2 text-xs sm:text-sm">
            {links.map((link, index) =>
                link.url ? (
                    <Link
                        preserveScroll
                        key={index}
                        href={link.url || "#"}
                        className={`px-3 py-1 mx-1 rounded-md ${
                            link.active
                                ? "bg-blue-700 text-white"
                                : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                        dangerouslySetInnerHTML={{
                            __html: link.label,
                        }}
                    />
                ) : (
                    <span
                        key={index}
                        className="px-3 py-1 mx-1 rounded-md text-slate-400"
                        dangerouslySetInnerHTML={{
                            __html: link.label,
                        }}
                    ></span>
                )
            )}
        </div>
    );
}
