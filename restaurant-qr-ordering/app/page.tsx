'use client'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
//import { Switch } from '@headlessui/react'
import Link from 'next/link'
import Header from '@/components/Header'


type MenuItem = {
  id: number
  name: string
  price: number
  image_url: string
}

export default function Home() {
  const [isTakeaway, setIsTakeaway] = useState(true)
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  //const [sessionId, setSessionId] = useState('')
  // Initially: empty session
  const [sessionId, setSessionId] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [token, setToken] = useState<number | null>(null)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase.from('menu_items').select('*')
      if (error) console.error(error)
      else if (data) setMenu(data)
    }

    // Generate unique session ID on first load
    const generateSessionId = () => {
      const id = `session-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      setSessionId(id)
    }

    fetchMenu()
     generateSessionId()
  }, [])

  const toggleItem = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }

  const selectedItems = menu.filter((item) => selectedIds.includes(item.id))
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0)
  const parcelCharges = isTakeaway ? selectedItems.length * 5 : 0
  const grandTotal = totalPrice + parcelCharges

  const handleConfirmOrder = async () => {

    if (selectedItems.length === 0) return
    setIsSubmitting(true)

    try {
       // Generate session ID only if not already set
      //  if (!sessionId) {
      //    const newId = `session-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      //    setSessionId(newId)
      //  }
       // Generate sessionId if not yet created
        let currentSessionId = sessionId
        if (!currentSessionId) {
          currentSessionId = `session-${Date.now()}-${Math.floor(Math.random() * 1000)}`
          setSessionId(currentSessionId)
        }
      // Get the current max token
      const { data: maxTokenData, error: maxError } = await supabase
        .from('orders')
        .select('token')
        .order('token', { ascending: false })
        .limit(1)

      if (maxError) throw maxError

      const newToken = maxTokenData?.[0]?.token ? maxTokenData[0].token + 1 : 1
        console.time('confirmOrder')

      const { data, error } = await supabase.from('orders').insert({
        session_id: currentSessionId,
        items: selectedItems.map(({ id, name, price }) => ({ id, name, price })),
        total: grandTotal,
        is_takeaway: isTakeaway,
        token: newToken,
      })
      console.log("Supabase response:", data, error);
      if (error) throw error

      setToken(newToken)
      setOrderConfirmed(true)
      alert(`Order confirmed! Your token number is ${newToken}`)
    } catch (err) {
      console.error('Error confirming order:', err)
      alert('Something went wrong while placing your order.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    
    <div className="p-6 max-w-6xl mx-auto">
      <Header/>
        {/* Dashboard Button */}
        {/* <div className="flex justify-end mb-4">
          <Link href="/dashboard">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Go to Dashboard
            </button>
          </Link>
        </div> */}
      {/* Session ID Header */}
      {/* <div className="bg-white shadow-md p-4 rounded-xl mb-6"> */}
        {/* <div className="text-sm text-gray-500 mb-1">Session ID</div>
        <div className="font-mono text-sm text-blue-600">{sessionId}</div> */}
        {token !== null && (
          <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded relative mt-4 shadow-md">
            <strong className="font-bold">Order Confirmed!</strong>
            <span className="block sm:inline ml-2">
              Your token number is <span className="font-semibold">{token}</span>.
            </span>
            <button
              onClick={() => {
                setSelectedIds([])
                setIsTakeaway(true)
                setOrderConfirmed(false)
                setToken(null)
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Make Another Order
            </button>
          </div>
)}
      {/* </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Menu List */}
        <div>
          <div className="bg-white shadow-md p-4 rounded-xl mb-4">
            <h2 className="text-2xl font-semibold">Menu Items</h2>
          </div>

          <div className="space-y-4">
            {menu.map((item) => {
              const isSelected = selectedIds.includes(item.id)
              return (
                <div
                  key={item.id}
                  onClick={() => !orderConfirmed && toggleItem(item.id)}
                  className={`flex justify-between items-center cursor-pointer border rounded-lg p-4 shadow-sm transition-all duration-200
                    ${orderConfirmed ? 'opacity-50 cursor-not-allowed' : ''}
                    ${
                      isSelected
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : 'bg-white border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div>
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Selection Summary */}
        <div className="bg-white shadow-md p-4 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Your Selection</h2>
             <div className="flex items-center space-x-2">
                {/* Dine-in Option */}
                <label className="flex items-center space-x-1 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="orderType"
                    value="dinein"
                    checked={!isTakeaway}
                    onChange={() => !orderConfirmed && setIsTakeaway(false)}
                    disabled={orderConfirmed}
                    className="accent-blue-600"
                  />
                  <span>Dine-in</span>
                </label>
                {/* Takeaway Option */}
                <label className="flex items-center space-x-1 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="orderType"
                    checked={isTakeaway}
                    onChange={() => !orderConfirmed && setIsTakeaway(true)}
                    disabled={orderConfirmed}
                    className="accent-green-600"
                  />
                  <span>Takeaway</span>
                </label>
              </div>
            {/* <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Dine-in</span>
              <Switch
                checked={isTakeaway}
                onChange={(val) => !orderConfirmed && setIsTakeaway(val)}
                className={`${isTakeaway ? 'bg-green-600' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition
                ${orderConfirmed ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <span
                  className={`${isTakeaway ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition
                  ${orderConfirmed ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                />
              </Switch>
              <span className="text-sm text-gray-600">Takeaway</span>
            </div> */}
             {/* <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={isTakeaway}
                onChange={(e) => !orderConfirmed && setIsTakeaway(e.target.checked)}
                disabled={orderConfirmed}
                className="accent-green-600 w-4 h-4"
              />
              <span>Takeaway</span>
            </label> */}
          </div>

          {selectedItems.length === 0 ? (
            <p className="text-gray-500">No items selected.</p>
          ) : (
            <ul className="space-y-2">
              {selectedItems.map((item) => (
                <li key={item.id} className="flex justify-between border-b pb-1">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}

              {isTakeaway && (
                <li className="flex justify-between text-sm text-gray-700 pt-2">
                  <span>Parcel Charges (${selectedItems.length} × $5)</span>
                  <span>${parcelCharges.toFixed(2)}</span>
                </li>
              )}

              <li className="flex justify-between font-bold pt-3 border-t mt-3">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </li>

              {isTakeaway && (
                <li className="flex justify-between font-bold text-green-700 pt-1">
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </li>
              )}
            </ul>
          )}

          {/* Confirm Button */}
          {selectedItems.length > 0 && !orderConfirmed && (
            <button
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
