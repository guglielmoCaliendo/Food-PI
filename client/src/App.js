import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Landing from './components/Landing';
import SharedLayout from './components/SharedLayout';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetails from './components/RecipeDetails';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/app' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='create' element={<CreateRecipe />} />
          <Route path='recipes/:id' element={<RecipeDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
