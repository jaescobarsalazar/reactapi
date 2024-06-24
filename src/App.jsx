import React, { useState, useEffect } from 'react';

function App() {
  const [productName, setProductName] = useState('');
  const [productValue, setProductValue] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = 'Product Form';

    const getDateServer = async () => {
      try {
        const response = await fetch('https://apiexpress-if0h.onrender.com');
        if (response.ok) {
          const data = await response.text();
         console.log("respuesta del endpoint", data )
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getDateServer();
  }, []); // Ejecuta el efecto solo una vez al montar el componente

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('nombre', productName);
    formData.append('valor', productValue);
    formData.append('foto', productImage);

    try {
      const response = await fetch('http://localhost:3000/productos', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Product added successfully!');
        // Limpia los campos del formulario
        setProductName('');
        setProductValue('');
        setProductImage(null);
        // Actualiza la lista de productos después de añadir uno nuevo
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label htmlFor="productValue">Product Value:</label>
        <input
          type="text"
          id="productValue"
          value={productValue}
          onChange={(e) => setProductValue(e.target.value)}
        />
        <label htmlFor="productImage">Product Image:</label>
        <input
          type="file"
          id="productImage"
          onChange={(e) => setProductImage(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
      <div>
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>Name: {product.nombre}</p>
              <p>Value: {product.valor}</p>
              <img src={product.fotoUrl} alt={product.nombre} width="100" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
