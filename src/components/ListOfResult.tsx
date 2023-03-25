import { ResultOfSearch } from "../types/ResultOfSearch";
import ResultItem from "./ResultItem";

interface Props {
  result?: ResultOfSearch;
  isLoading?: boolean;
}

export default function ListOfResult({ result, isLoading }: Props) {
  return (
    <div className="flex flex-col w-full mt-4 px-4 space-y-2">
      {isLoading ? (
        <div className="flex justify-center mt-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
        </div>
      ) : (
        <>
          {result?.users.length === 0 ? (
            <p className="text-center mt-8 italic">
              There is no user with that name
            </p>
          ) : (
            <>
              {result?.users.map((user, index) => (
                <ResultItem key={index} user={user} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
