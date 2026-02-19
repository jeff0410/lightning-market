import { ContentItem, SearchBar } from "./components";
import { SortButton } from "./components/sort-button";
import { useJeffTest } from "./hooks";

export function TestPage() {
  const {
    sort,
    keyword,
    dataList,
    suggestions,
    doSearch,
    setKeyword,
    setSort,
    selectSuggestion,
  } = useJeffTest();

  return (
    <div className="p-8 flex flex-col gap-8 w-full">
      <div className="bg-gray-50 max-w-7xl mx-auto w-full">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            테스트 시작
          </h1>
          <p className="text-gray-600">Welcome to Test Page</p>
        </div>
      </div>

      <div className="w-full bg-gray-50 flex flex-col gap-4 p-6">
        {/* 검색부분 */}
        <SearchBar
          keyword={keyword}
          doSearch={doSearch}
          onChange={setKeyword}
          suggestions={suggestions}
          onSelectSuggestion={selectSuggestion}
        />
        <SortButton sort={sort} onChange={setSort} />

        <div className="grid grid-cols-4 gap-4">
          {dataList.length > 0 &&
            dataList.map((val) => <ContentItem item={val} key={val.pid} />)}
        </div>
      </div>
    </div>
  );
}
