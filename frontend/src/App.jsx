import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx'
import { useDispatch } from 'react-redux';
import { storeData } from './app/ListSlice/ListSlice.js';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeData([
      {
        _id: "list_001",
        listName: "Weekly Groceries",
        listTotalItems: 5,
        listItemsBought: 2,
        color: "#4CAF50",

        items: [
          { name: "Milk", quantity: "2 kg", isBought: true },
          { name: "Bread", quantity: "1 packet", isBought: true },
          { name: "Rice", quantity: "5 kg", isBought: false },
          { name: "Apples", quantity: "6 kg", isBought: false },
          { name: "Tea", quantity: "1 kg", isBought: false }
        ]
      },
      {
        _id: "list_002",
        listName: "Vegetables",
        listTotalItems: 6,
        listItemsBought: 3,
        color: "#FF9800",

        items: [
          { name: "Potatoes", quantity: "3 kg", isBought: true },
          { name: "Tomatoes", quantity: "2 kg", isBought: true },
          { name: "Onions", quantity: "2 kg", isBought: true },
          { name: "Carrots", quantity: "1 kg", isBought: false },
          { name: "Peas", quantity: "1 kg", isBought: false },
          { name: "Capsicum", quantity: "1 kg", isBought: false }
        ]
      },
      {
        _id: "list_003",
        listName: "Fruits",
        listTotalItems: 5,
        listItemsBought: 1,
        color: "#E91E63",

        items: [
          { name: "Bananas", quantity: "12 kg", isBought: true },
          { name: "Apples", quantity: "6 kg", isBought: false },
          { name: "Oranges", quantity: "8 kg", isBought: false },
          { name: "Mangoes", quantity: "4 kg", isBought: false },
          { name: "Grapes", quantity: "2 kg", isBought: false }
        ]
      },
      {
        _id: "list_004",
        listName: "Personal Care",
        listTotalItems: 5,
        listItemsBought: 0,
        color: "#2196F3",

        items: [
          { name: "Toothpaste", quantity: "2 pc", isBought: false },
          { name: "Shampoo", quantity: "1 pc", isBought: false },
          { name: "Soap", quantity: "6 pc", isBought: false },
          { name: "Face Wash", quantity: "1 pc", isBought: false },
          { name: "Hair Oil", quantity: "1 pc", isBought: false }
        ]
      },
      {
        _id: "list_005",
        listName: "Study Supplies",
        listTotalItems: 5,
        listItemsBought: 4,
        color: "#9C27B0",

        items: [
          { name: "Notebook", quantity: "5 pc", isBought: true },
          { name: "Pens", quantity: "10 pc", isBought: true },
          { name: "Highlighters", quantity: "3 pc", isBought: true },
          { name: "Sticky Notes", quantity: "2 pc", isBought: true },
          { name: "Marker", quantity: "1 pc", isBought: false }
        ]
      }
    ]))
  })
  return (
    <div className='w-screen h-screen overflow-x-hidden bg-[#F7F6F2] font-sans'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App;
