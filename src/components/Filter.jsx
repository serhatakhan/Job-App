import { useDispatch } from "react-redux";
import { filterBySearch, sortJobs } from "../redux/slices/jobSlice";
import { sortOptions, statusOptions, typeOptions } from "./../constants/index";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

const Filter = () => {
  const [text, setText] = useState("")

  const dispatch = useDispatch();

  // 2.yol
  const debouncedText = useDebounce(text, 500)

  // * Debounce,
  // Her tuş vuruşunda filtreleme yapmak, düşük donanmlı cihazlarda kasmalara
  // ve donmalara sebep olabileceğinden, filtreleme işlemini 'kullanıcı yazmayı 
  // bıraktığı anda' yapmamız lazım. Bu işleme debounce denir.
  // Yani, Ardışık olarak gerçekleşen fonksiyon çağırma işlemlerinde, fonksiyonun
  // kısa bir zaman aralığında çağırıldığını görmezden gelir.
  // 1.yol
  useEffect(()=>{
    // bir sayaç başlat ve işlemi sayaç durduğunda yap
    const timer = setTimeout(() => {
      dispatch(filterBySearch({text, name: "company"}))
    }, 500);

    // eğer süre bitmeden tekrar useEffect çalışırsa önceki sayacın çalışmasını durdur
    return ()=>{
      clearTimeout(timer)
    }
  }, [text])

  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>

      <form>
        <div>
          <label>Şirket ismine göre ara</label>
          {/* aksiyonun payloadı olarak "name" ve "text" yolldadık, bunun yapmamızın biza artısı bu aksiyonu diğer durumlarda(durum ve tür'de) da kullanabileceğiz. jobSlice'da o yüzden text ve i'den sonra [action.payload.name] ekledik. */}
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>

        <div>
          <label>Durum</label>
          <select onChange={(e)=> dispatch(filterBySearch({name: "status", text: e.target.value }))}>
            <option hidden>Seçiniz</option>
            {statusOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select onChange={(e)=> dispatch(filterBySearch({name: "type", text: e.target.value }))}>
            <option hidden>Seçiniz</option>
            {typeOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sırala</label>
          <select onChange={(e)=> dispatch(sortJobs(e.target.value))}>
            <option hidden>Seçiniz</option>
            {sortOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        {/* formu sıfırlamasını istediğimiz butonların type'ını reset yapıyoruz type="reset !" */}
        <div>
          <button type="reset" id="special-button">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Filtreleri Sıfırla</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
