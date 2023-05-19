import Header from "./Header";

function PageNotFound() {
  return (
    <>
      <Header namelink="Назад" link="" />
      <main className="sign">
        <h1 className="sign__title">404 - Страница не найдена</h1>
      </main>
    </>
  );
}

export default PageNotFound;
