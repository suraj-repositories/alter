"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    FolderKanban,
    Video,
    Captions,
    Settings,
    ChevronLeft,
    PlaySquare,
    ChevronRight,
} from "lucide-react";

import "./Sidebar.css";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const pathname = usePathname();

    const menuItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Videos",
            href: "/",
            icon: Video,
        },
        {
            name: "Youtube",
            href: "/yt",
            icon: PlaySquare,
        },
        {
            name: "Subtitles",
            href: "/subtitles",
            icon: Captions,
        },
        {
            name: "Settings",
            href: "/settings",
            icon: Settings,
        },
    ];

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar-top">
                {!collapsed && <h1 className="logo">ALTER</h1>}

                <button
                    className="toggle-btn"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? (
                        <ChevronRight size={20} />
                    ) : (
                        <ChevronLeft size={20} />
                    )}
                </button>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={isActive ? "active" : ""}
                        >
                            <Icon size={20} />

                            {!collapsed && <span>{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}