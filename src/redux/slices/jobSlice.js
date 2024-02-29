import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  mainJobs: [],
  isLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    // setLoading'te actionu kullanmadığımız için almadık
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      (state.isLoading = false), (state.error = action.payload);
    },
    setJobs: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.jobs = action.payload;
      state.mainJobs = action.payload;
      // kopya-klon dizimiz olan mainJobs'a da aktar dedik gelen verileri.
    },
    // kartları store'dan kaldıran aksiyon
    deleteJob: (state, action) => {
      // silinecek elemanın id'si üzerinden sırasını bul
      const index = state.jobs.findIndex((i) => i.id === action.payload);
      // elemanı diziden kaldır, index sırasındaki elemandan itibaren 1 tane sil
      state.jobs.splice(index, 1);
    },
    createJob: (state, action) => {
      // state'in içindeki jobs dizisine, aksiyonun payloadı ile gönderdiğimiz işi pushla
      state.jobs.push(action.payload);
    },
    // aratılan şirket ismine göre filtreleme için aksiyon
    filterBySearch: (state, action) => {
      // burası aratılan kelime. büyük-küçük harf duyarlılığını kaldırmak için de toLowerCase.
      const query = action.payload.text.toLowerCase();

      // şirketin ismi(i.company.includes()) içeriyorsa aratılan kelimeyi(query)
      state.jobs = state.mainJobs.filter(
        (i) => i[action.payload.name].toLowerCase().includes(query) || i.position.toLowerCase().includes(query));
      /** mainJobs dizisnde filtreleme yapıp bunu jobs dizisine attık. jobs'ın içindeki elemaların sayısı azalıyor. **/
      /** mainJobs dizisini hiç güncellemiyoruz. o hep sabit kalıyor. filtrelemeyi sabit elemanlar arasından yapıyoruz **/
    },
    // sıralama için aksiyon
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
          // .sort() yöntemi, bir karşılaştırma işlevi alabilir. Bu işlev, dizideki öğelerin nasıl sıralanacağını belirler.Karşılaştırma işlevi, iki parametre alır (a ve b).
          // a.company.localeCompare(b.company) ifadesi, a ve b nesnelerinin company özelliklerini alır ve localeCompare() yöntemi kullanılarak alfabetik olarak karşılaştırılır. Bu, özellikle farklı dillerdeki alfabetik sıralamayı sağlamak için kullanılır. Bu ifade, sıralama işlevine bir sayı döndürür:Eğer a önce gelmeliyse, negatif bir sayı (-1 veya daha küçük) döner.Eğer b önce gelmeliyse, pozitif bir sayı (1 veya daha büyük) döner.Eğer a ve b aynı ise, 0 döner.
          state.jobs.sort((a, b)=> a.company.localeCompare(b.company))
          break;

        case "z-a":
          state.jobs.sort((a, b)=> b.company.localeCompare(a.company))
          break;

        case "En Yeni":
            // sayısal ve tarihsel ifadelerde bu yol izlenir
            state.jobs.sort((a, b)=> new Date(b.date) - new Date(a.date))
          break;

        case "En Eski":
            state.jobs.sort((a, b)=> new Date(a.date) - new Date(b.date))
          break;

        default:
          break;
      }
    },
  },
});

// aksiyonları export et
export const {
  setLoading,
  setError,
  setJobs,
  deleteJob,
  createJob,
  filterBySearch,
  sortJobs,
} = jobSlice.actions;

// reducer'ı export et
export default jobSlice.reducer;
