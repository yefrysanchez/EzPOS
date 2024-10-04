
type tabType = {
    tab: string,
    setTab: (tab:string) => void
    categories: string[]
}

const CategoryProductTabs: React.FC<tabType> = ({tab, setTab, categories}) => {

  const handleTab = () => {
    setTab("products")
  }

  return (
    <div className="flex mb-2 gap-1">
        <button onClick={() => setTab("category")} className={`${tab === "category" && "bg-darkGray text-white"} flex-1 form-input transition`} type="button">Category</button>
        <button disabled={categories.length < 1} onClick={handleTab} className={`${tab === "products" && "bg-darkGray text-white"} flex-1 form-input transition disabled:opacity-50`} type="button">Products</button>
    </div>
  )
}

export default CategoryProductTabs