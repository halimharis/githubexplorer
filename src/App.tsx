import { BiSearch } from "react-icons/bi";
import github_image from "./assets/25231.png";
import { useState, useEffect } from "react";
import { User } from "./types/User";
import { ResultOfSearch } from "./types/ResultOfSearch";
import ListOfResult from "./components/ListOfResult";
import ItemDetail from "./components/ItemDetail";
import DetailContext from "./context/detailContext";
import { UserDetail } from "./types/UserDetail";

function App() {
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<ResultOfSearch | null>(null);
  const [detail, setDetail] = useState<UserDetail | null>(null);

  const fetchDetailItem = (query: string) => {
    fetch(`https://api.github.com/users/${query}`)
      .then((res) => res.json())
      .then((data) => {
        const detailUser: UserDetail = data;
        setDetail(detailUser);
      })
      .finally(() => {
        setLoadingDetail(false);
      });
  };

  const fetchSearchApi = (query: string) => {
    fetch(`https://api.github.com/search/users?q=${query}&per_page=20`)
      .then((res) => res.json())
      .then((data) => {
        const users: User[] = data.items;
        const searchRes: ResultOfSearch = {
          search: search,
          users: users,
        };
        setResult(searchRes);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      setLoading(true);
      fetchSearchApi(search);
    }
  };

  const onSelectDetail = (query: string, clear: boolean) => {
    if (clear) {
      setDetail(null);
      return;
    }
    setLoadingDetail(true);
    fetchDetailItem(query);
  };

  return (
    <DetailContext.Provider
      value={{
        user: detail,
        setUser: (param, status) => onSelectDetail(param, status),
      }}
    >
      <div className="flex flex-col-reverse gap-y-8 lg:gap-y-0 lg:flex-row py-8 min-h-screen bg-gray-100 font-golos justify-center container border-black xl:px-24">
        <div className="flex flex-col max-w-lg lg:w-3/5 lg:px-8 self-center lg:self-start w-full">
          <div className="flex flex-col items-center space-y-8 px-6 lg:mt-12">
            <div className="flex items-center space-x-4 lg:self-start">
              <img
                src={github_image}
                alt=""
                className="h-16 w-16 lg:h-24 lg:w-24"
              />
              <h1 className="text-xl">
                GitHub repositories &nbsp;
                <br /> <span className="font-bold">Explorer</span>
              </h1>
            </div>
            <form
              onSubmit={onSubmitSearch}
              className="flex items-center space-x-4 w-full  text-xs lg:text-sm "
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find the users"
                className="px-6 py-3 grow rounded-full shadow-md outline-none "
              />
              <button
                type="submit"
                className="p-3 lg:p-4 bg-gray-400 rounded-full shadow-lg"
              >
                <BiSearch />
              </button>
            </form>
          </div>

          {result && <ListOfResult result={result} isLoading={loading} />}
        </div>
        {detail && <ItemDetail detail={detail} isLoading={loadingDetail} />}
      </div>
    </DetailContext.Provider>
  );
}

export default App;
