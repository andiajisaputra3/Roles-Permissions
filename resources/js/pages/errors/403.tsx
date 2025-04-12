import React from 'react'
import { Link } from '@inertiajs/react'

export default function Forbidden() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center">
            <div>
                <h1 className="text-6xl font-bold text-red-600">403</h1>
                <p className="text-xl mt-4">Kamu tidak punya akses ke halaman ini.</p>
                <Link
                    href="/"
                    className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    )
}
