import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobList from "./pages/JobList";
import AddJob from "./pages/AddJob";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "./redux/slices/jobSlice";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  // normalde useEffect içinde yazdığımız bu kodları bir fonksiyon içine taşıdık. bu fonksiyonu da useEffect'in içine attık
  // bunun sebebi --> error durumunda veriler gelmediğinde tekrar dene butonuna basıldığında tekrar istek atılsın istiyoruz. tekrar dene butonuna onclick verip bu fonksiyonu yazacağız ki tıklandığında istek atabilsin.
  // böylelikle istediğimiz yerde artık bu fonksiyonu çağırabiliriz.
  const getJobs = () => {
    // slice'daki yükleniyor'u true'ya çek
    dispatch(setLoading());

    // api isteği at
    axios
      .get("http://localhost:3001/jobs")
      // istek başarılı olursa slice'daki veriyi güncelle
      .then((res) => dispatch(setJobs(res.data)))
      // istek başarısız olursa slice'daki error'u güncelle
      .catch((err) => dispatch(setError(err.message)));
  };

  // tüm sayfalarda iş bilgileri bize lazım. o yüzden app.jsx de tanımladık. hangi sayfaya girerse girsin herhnagi bir sayfaya girdiğinde bu fonk çalışıp verileri alacak ve store aktaracak
  useEffect(() => {
    getJobs();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<JobList getJobs={getJobs} />} />
        <Route path="/add" element={<AddJob />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
