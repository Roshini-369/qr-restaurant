'use client'

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-white shadow mb-4">
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Hamburger Menu Button Always Visible */}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 focus:outline-none">
                {open ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>

              {/* App Name */}
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-green-700 ml-2">
                  FoodOrderApp
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar/Menu Panel */}
          <Disclosure.Panel className="px-4 pt-2 pb-3 space-y-1 bg-white shadow-md">
            <Link
              href="/dashboard"
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              Dashboard
            </Link>
            {/* Add more links here if needed */}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
