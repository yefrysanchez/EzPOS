
const MostSold = () => {
  return (
    <div className="relative border border-gray mt-4 rounded-xl p-4 overflow-hidden">
    <h3 className="text-2xl">Today's Most Sold</h3>
    {mostSold.map((ms , i) => (
      <div key={ms.title} className="h-16 flex items-center gap-4">
        <div className="h-12 w-12 flex-shrink-0 bg-darkGray flex items-center justify-center text-2xl font-bold rounded-xl">
          <span>{i + 1}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-nowrap ">{ms.title}</span>
          <span className="text-lightGray">
            Order: <span className="text-white font-bold">{ms.value}</span>
          </span>
        </div>
      </div>
    ))}
        <div className="w-8 h-full bg-gradient-to-r from-transparent to-black absolute right-0 top-0"></div>

  </div>
  )
}

export default MostSold

const mostSold = [
    { title: "Espresso", value: 120 },
    { title: "Cappuccino", value: 114 },
    { title: "Iced Coffee", value: 98 },
    { title: "Breakfast Sandwich", value: 82 },
    { title: "Cold Brew Coffee", value: 75 },
  ];