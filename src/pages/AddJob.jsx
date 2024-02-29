import { v4 } from "uuid";
import { statusOptions, typeOptions } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slices/jobSlice";

const AddJob = () => {
  // stateler
  const jobState = useSelector((store)=> store.jobReducer)

  // kurulumlar
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    // inputlardaki verilere eriş (bütün inputlardaki verileri obje içine atarak çözüyoruz birden fazla inputun verisine erişmek istediğimizde)
    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());

    // tarih ve id ekle (bir nesneye yeni bir değer eklemek istiyorsak ...spread veya bu şekilde nesnenin adını yazıp eklemek istediğimiz değeri yazarak (.date gibi) şeklinde yaparız.)
    newJobData.date = new Date().toLocaleDateString("tr");
    newJobData.id = v4();

    //api'ye veriyi ekle
    axios
      .post("http://localhost:3001/jobs", newJobData)
      .then(() => {
        toast.success("Yeni iş eklendi");

        //verileri store'a ekle
        dispatch(createJob(newJobData))

        //anasayfaya yönlendir
        navigate("/");
      })
      .catch(() => toast.error("Ekleme işleminde sorun oluştu :/"));
  };


  // dizideki değerleri aynı olan elemanları kaldır (çünkü otomatik tamamlamada aynı isimli elemanlar tekrar çıkıyor.)
  const removeDuplicates = (key)=>{
    // 1) sadece pozisyonlardan oluşan bir dizi tanımla (bir metin üzerinden objenin özelliklerine erişmek istediğmizde job[key] şeklinde kullanıyoruz )
    const arr = jobState.jobs.map((job)=> job[key])  

    // 2) dizi içerisinden tekrar eden elemanı kaldır (her birine item dedik, eğer item'dan dizide başka var mı? varsa geçmesini yoksa geçmemesini istiyoruz.)
    // --> bizim dizimizde item'ımızdan varsa onun indexOf ile sırasını bul, bulduktan sonra bak elimizdeki elemanla eş değer bir eleman mı?
    // ---> eğer ki elemanın sırası(index), eşitse indexOf'tan dönen sonuca o zaman geçebilir yani yeni oluşturduğum dizide olabilir bu eleman. (arr.indexOf(item): Bu, bir öğenin dizideki ilk görüldüğü indeksi alır. === index: Bu, öğenin ilk görüldüğü indeksin, mevcut indekse eşit olup olmadığını kontrol eder. Eğer eşitse, bu öğenin ilk kez görüldüğü anlamına gelir ve bu durumda filtreleme için geçerli bir öğe olur. )
    // indexOf'un görevi: bir dizi içinde belirli bir öğenin ilk bulunduğu konumu (yerini) döndürür.
    const filtred = arr.filter((item, index)=> arr.indexOf(item) === index)

    // Sonuç olarak, filtred değişkeni, dizi içindeki yalnızca ilk kez görülen öğeleri içeren bir yeni dizi olacaktır. 
    return filtred
  }


  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="position_list" name="position" type="text" required />
            <datalist id="position_list">
              {removeDuplicates("position").map((i)=> <option key={i} value={i}></option> )}
            </datalist>
          </div>

          <div>
            <label>Şirket</label>
            <input list="company_list" name="company" type="text" required />
            <datalist id="company_list">
              {removeDuplicates("company").map((i)=> <option key={i} value={i}></option> )}
            </datalist>
          </div>

          <div>
            <label>Lokasyon</label>
            <input list="location_list" name="location" type="text" required />
            <datalist id="location_list">
              {removeDuplicates("location").map((i)=> <option key={i} value={i}></option> )}
            </datalist>
          </div>

          <div>
            <label>Durum</label>
            <select name="status" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {statusOptions.map((text) => (
                <option key={text} value={text}>{text}</option>
              ))}
            </select>
          </div>
          {/* required özelliğinin select alanlarında çalışması için option'ların value
          değerleri olmalı. ondan dolayı optionlara value ekledik. Seçinizin valuesini boş yaptık. map ile döndüğümüz optionın valuesine text verdik */}
          <div>
            <label>Tür</label>
            <select name="type" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {typeOptions.map((text) => (
                <option key={text} value={text}>{text}</option>
              ))}
            </select>
          </div>

          <div>
            <button id="special-button">
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text">İş Ekle</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
