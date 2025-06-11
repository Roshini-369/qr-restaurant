// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'

type Order = {
  id: number
  created_at: string
}

export default function Dashboard() {
  const [totalOrders, setTotalOrders] = useState(0)
  const [monthlyOrders, setMonthlyOrders] = useState(0)
  const [dailyOrders, setDailyOrders] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      const { data: allOrders, error: allError } = await supabase
        .from('orders')
        .select('id, created_at')

      if (allError) {
        console.error(allError)
        return
      }

      const now = new Date()
      const today = now.toISOString().split('T')[0]
      const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

      const total = allOrders.length
      const monthly = allOrders.filter(order =>
        order.created_at.startsWith(thisMonth)
      ).length
      const daily = allOrders.filter(order =>
        order.created_at.startsWith(today)
      ).length

      setTotalOrders(total)
      setMonthlyOrders(monthly)
      setDailyOrders(daily)
    }

    fetchStats()
  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
          <h2 className="text-lg text-gray-500">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalOrders}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
          <h2 className="text-lg text-gray-500">Monthly Orders</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{monthlyOrders}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
          <h2 className="text-lg text-gray-500">Daily Orders</h2>
          <p className="text-3xl font-bold text-orange-600 mt-2">{dailyOrders}</p>
        </div>
      </div>
    </div>
  )
}
