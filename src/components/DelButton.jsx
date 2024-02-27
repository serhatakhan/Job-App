const DelButton = ( {handleDelete} ) => {
  return (
    <button onClick={handleDelete} class="bin-button">
      <img src="/icon1.svg" className="bin-top" />
      <img src="/icon2.svg" className="bin-bottom" />
      <img src="/icon3.svg" className="garbage" />
    </button>
  );
};
// svg'leri public içinde ayırdık
// hepsini buraya çağırdık.
// çalışması için className'leri de lazım. o kısımları svg'den kesip img'lere verdik.

export default DelButton;
