import { useState } from 'react';
import './App.css';
import { Card } from './components/cards/Card';
import { CreateModal } from './components/create-modal/CreateModal';
import { useFoodData } from './hooks/useFoodData';

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  }

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map(foodData => 
        <Card
          title={foodData.title} 
          image={foodData.image} 
          price={foodData.price}
        />
          )}
          <div className="modal">
            {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
            <button onClick={handleOpenModal}>Novo Produto</button>
          </div>
      </div>
    </div>
  )
}

export default App
