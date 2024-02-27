import axios from "axios";
import { useEffect } from "react";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";

const JobList = () => {
  const dispatch = useDispatch();
  const jobState = useSelector((store) => store.jobReducer);

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

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="list-page">
      {/* 
      1) yüklenme devam ediyorsa ekrana loader bas.
      2) yüklenme bittiyse ve hata varsa, ekrana hatayı ve tekrar dene butonunu bas.
      3) yüklenme bittiyse ve hata yoksa, kartları ekrana bas.
      */}

      {jobState.isLoading ? (
        <Loader />
      ) : jobState.error ? (
        <Error text={jobState.error} getJobs={getJobs} />
      ) : (
        <div className="job-list">
          {jobState.jobs.map((job)=> (
              <Card key={job.id} job={job} />
            ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
