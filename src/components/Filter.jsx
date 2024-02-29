import { useDispatch } from "react-redux";
import { filterBySearch, sortJobs } from "../redux/slices/jobSlice";
import { sortOptions, statusOptions, typeOptions } from "./../constants/index";

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>

      <form>
        <div>
          <label>Şirket ismine göre ara</label>
          {/* aksiyonun payloadı olarak "name" ve "text" yolldadık, bunun yapmamızın biza artısı bu aksiyonu diğer durumlarda(durum ve tür'de) da kullanabileceğiz. jobSlice'da o yüzden text ve i'den sonra [action.payload.name] ekledik. */}
          <input
            onChange={(e) => {
              dispatch(
                filterBySearch({ name: "company", text: e.target.value })
              );
            }}
            type="text"
          />
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
