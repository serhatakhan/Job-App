import DelButton from "./DelButton";
import { IoLocationSharp } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/slices/jobSlice";
import { toast } from "react-toastify";

const Card = ({ job }) => {
  const dispatch = useDispatch();

  const colors = {
    Mülakat: "green",
    Reddedildi: "red",
    "Devam Ediyor": "orange",
  };
  // Devam Ediyor'u string içinde "Devam Ediyor" şeklinde yazmamızın nedeni, api den bu şekilde
  // gelmesine rağmen bizim bunu obje içinde kelimeler arası boşluklu şekilde yazamayacağımız için string olarak yazdık.
  // işin devam etme durumu için obje içinde böyle bir yöntem kullandık. switch-case veya ternary de kullanılabilirdi.

  const handleDelete = () => {
    if (confirm("Silmek istediğinizden emin misiniz?")) {
      // api isteği at
      axios
        .delete(`http://localhost:3001/jobs/${job.id}`)
        // başarılı olursa store'dan kaldır bunu yapmazsak şu aşamada sadece veri tabanından silecek, kullanıcı silindiğini görmeyecek. sayfa yenilenince silindiği görülecek.
        // arayüzü güncelle demek yani.
        .then(() => {
          dispatch(deleteJob(job.id));

          toast.success("İş, başarıyla kaldırıldı");
        })
        .catch((err) =>
          toast.error("Üzgünüz :( işlem gerçekleşirken bir hata oluştu")
        );
    }
  };

  return (
    <div className="card">
      <div className="head">
        <div className="left">
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>

          <div className="info">
            <p className="info-position">{job.position}</p>
            <p>{job.company}</p>
          </div>
        </div>

        <div className="right">
          <DelButton handleDelete={handleDelete} />
        </div>
      </div>

      <div className="body">
        <div className="field">
          <IoLocationSharp />
          <p>{job.location}</p>
        </div>
        <div className="field">
          <BsFillSuitcaseLgFill />
          <p>{job.type}</p>
        </div>
        <div className="field">
          <BsCalendar2DateFill />
          <p>{new Date(job.date).toLocaleDateString("tr")}</p>
          {/* ingilizce formatta gelen tarih verisini "tr" formatına çevirerek kullanıcıya gösterdik. */}
        </div>
        <div className="status">
          <p style={{ background: colors[job.status] }}>{job.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
