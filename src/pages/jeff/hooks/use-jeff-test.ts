/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */

import { api } from "@/lib";
import { Datum } from "@/lib/type/type-list";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "./use-debounce";

export const useJeffTest = () => {
  const [dataList, setDataList] = useState<Datum[]>([]);
  const [sort, setSort] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debouncedKeyword = useDebounce(keyword, 300);
  const skipNextGetKeywords = useRef(false);

  useEffect(() => {
    doSearch();
  }, [sort]);

  const getKeywords = useCallback(async (searchKeyword: string) => {
    if (!searchKeyword.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await api.get(
        `/search/v2/keywords/suggestions?q=${searchKeyword}`,
      );
      const data = response.data.data;
      const keywordList = Array.isArray(data.keywords) ? data.keywords : [];
      setSuggestions(keywordList);
    } catch (error) {
      console.error(error);
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    if (skipNextGetKeywords.current) {
      skipNextGetKeywords.current = false;
      return;
    }
    getKeywords(debouncedKeyword);
  }, [debouncedKeyword, getKeywords]);

  const doSearch = async (searchKeyword?: string) => {
    const query = searchKeyword ?? keyword;
    if (!query.trim()) {
      return;
    }
    try {
      const response = await api.get(
        `/search/v6/products-web?ref=search&q=${query}&sort=${sort}`,
      );
      const data = response.data.data;
      setDataList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  const selectSuggestion = useCallback(
    (selectedKeyword: string) => {
      skipNextGetKeywords.current = true;
      setKeyword(selectedKeyword);
      setSuggestions([]);
      doSearch(selectedKeyword);
    },
    [doSearch],
  );

  return {
    dataList,
    sort,
    keyword,
    suggestions,
    doSearch,
    setKeyword,
    setSort,
    clearSuggestions,
    selectSuggestion,
  };
};
