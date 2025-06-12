// components/home/home.presenter.js
import { useNavigate } from 'react-router-dom';

function useHomePresenter() {
  const navigate = useNavigate();

  const handleMulaiPrediksiClick = () => {
    navigate('/prediksi');
  };

  return {
    handleMulaiPrediksiClick,
  };
}

export default useHomePresenter;
