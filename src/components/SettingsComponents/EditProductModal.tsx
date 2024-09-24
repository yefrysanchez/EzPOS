import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { fade } from "../../animations/animations";
import { motion } from "framer-motion";
import { products } from "../../dummyData/products";

type DeleteProductModalType = {
    setModal: React.Dispatch<
      React.SetStateAction<{ edit: boolean; delete: boolean }>
    >,
    id: number
};

const EditProductModal: React.FC<DeleteProductModalType> = ({ setModal, id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        category: '',
        price: ''
    });

    const findProduct = products.find(prod => prod.id === id);

    // Set initial product details if product is found
    useEffect(() => {
        if (findProduct) {
            setProductDetails({
                name: findProduct.name,
                category: findProduct.category,
                price: findProduct.price.toString() // convert to string for controlled input
            });
        }
    }, [findProduct]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProductDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // Optionally handle success state (e.g., update products list)

        } catch (error) {
            console.error("Error editing product:", error);
            // Handle error (e.g., show a message to the user)
        } finally {
            setIsLoading(false);
            setModal({ edit: false, delete: false });
        }
    };

    return (
        <motion.div variants={fade} initial="initial" animate="enter" exit="exit" className="fixed backdrop-blur-sm top-0 right-0 left-0 px-4 bottom-0 bg-black/20 border border-darkGray flex justify-center items-center">
            <form onSubmit={handleEdit} className='w-full flex flex-col gap-2 max-w-md bg-white p-4 rounded-xl text-center'>
                <h3 className='text-black font-bold text-2xl'>Edit Product</h3>
                <input
                    name="name"
                    value={productDetails.name}
                    onChange={handleInputChange}
                    placeholder='Name'
                    className='text-black border border-gray p-2 rounded-lg'
                    required
                    type="text"
                />
                <select
                    name="category"
                    value={productDetails.category}
                    onChange={handleInputChange}
                    className='text-black border border-gray p-2 rounded-lg'
                    required
                >
                    <option value="" disabled>Select a category</option>
                    <option value="Cold Drinks">Cold Drinks</option>
                    <option value="Coffee">Coffee</option>
                    <option value="Snacks">Snacks</option>
                </select>
                <input
                    name="price"
                    value={productDetails.price}
                    onChange={handleInputChange}
                    placeholder='Price'
                    className='text-black border border-gray p-2 rounded-lg'
                    required
                    type="number"
                />
                <div className="flex mx-auto gap-2">
                    <button onClick={() => setModal({ edit: false, delete: false })} className="rounded-md min-w-[100px] px-6 py-2 bg-lightGray text-white active:bg-gray">Cancel</button>
                    <button type='submit' className="rounded-md min-w-[100px] px-6 py-2 bg-violet-600 text-white active:bg-green-700">{isLoading ? <Loading /> : "Edit"}</button>
                </div>
            </form>
        </motion.div>
    );
};

export default EditProductModal;
