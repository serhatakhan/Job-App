# Job App

Bu proje, **Redux Toolkit** kullanılarak geliştirilmiş bir iş listesi uygulamasını içerir. Redux Toolkit, Redux tabanlı uygulamaların geliştirilmesini kolaylaştıran bir kütüphanedir. Uygulama, iş listesi yönetimini sağlar ve kullanıcılara işleri görüntüleme, ekleme, silme, arama ve sıralama gibi işlevler sunar. Kullanıcı dostu bir arayüzle tasarlanmıştır ve Redux Toolkit'in sağladığı kolaylık ve verimlilikten yararlanır. 

Kullanılan aksiyonlar, Redux Toolkit'in createSlice fonksiyonu ile oluşturulan slice'lar içinde tanımlanır ve kullanıcı etkileşimleri veya diğer uygulama durumlarına göre çağrılırlar. Bu şekilde state yönetimi kolaylaştırılır ve uygulama durumunun güncellenmesi sağlanır.

## Kullanılan Aksiyonlar

`setLoading:` Bu aksiyon, yüklenme durumunu yönetir. İşlemler başladığında bu aksiyon çağrılarak yüklenme durumu aktif hale getirilir.

`setError:` Hata yönetimini sağlayan aksiyondur. Bir işlem sırasında oluşan hatalar bu aksiyon aracılığıyla state'e kaydedilir ve kullanıcıya gösterilir.

`setJobs:` İş listesini güncelleyen ve ana iş listesi ile eşitleyen aksiyondur. Yeni iş listesi verileri bu aksiyon aracılığıyla state'e aktarılır.

`deleteJob:` Bir işi listeden silen aksiyondur. Silinecek işin ID'si kullanılarak ilgili iş state'den kaldırılır.

`createJob:` Yeni bir işi listeye ekleyen aksiyondur. Yeni iş verileri bu aksiyon aracılığıyla state'e eklenir.

`filterBySearch:` İş listesini arama kriterlerine göre filtreleyen aksiyondur. Kullanıcının girdiği arama terimine göre iş listesi filtrelenir ve yeni filtrelenmiş liste state'e aktarılır.

`sortJobs:` İş listesini belirli bir kurala göre sıralayan bir aksiyondur. Kullanıcının seçtiği sıralama kuralına göre iş listesi yeniden düzenlenir ve state'e aktarılır.

## Kullanılan Teknolojiler

- React-Router-Dom
- Axios
- Sass
- React-Toastify
- JSON-Server
- React-Redux
- Redux-Toolkit
- Uuid
- React-Icons

## Ekran Gifi

![kayt1-ezgif com-video-to-gif-converter](https://github.com/serhatakhan/Job-App/assets/147662915/14a576af-c073-4307-8914-6a6b2c34314a)

