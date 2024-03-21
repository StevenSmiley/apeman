import { useEffect, useRef, useState } from "react";
import apiClient from "../services/api-client";
import { Box, HStack, Input, useTheme } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import HoverIcon from "./HoverIcon";
import { RiDirectionLine } from "react-icons/ri";
import { Node } from "../services/nodeService";

interface Props {
  search: string;
  setSearch: (s: string) => void;
  setSearchResults: (nodes: Node[]) => void;
  variant?: string;
  placeholder?: string;
  kinds?: string[];
}

const SearchBar = ({
  search,
  setSearch,
  setSearchResults,
  variant = "unstyled",
  placeholder = "",
  kinds = [],
}: Props) => {
  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.length > 4) {
      const controller = new AbortController();
      const request = apiClient.get(`/search?searchQuery=${search}`, {
        signal: controller.signal,
      });

      request.then((res: any) => {
        console.log(res.data);
        var newNodes: Node[] = [];
        Object.keys(res.data).map((item) => {
          newNodes.push(res.data[item]);

          console.log(item);
        });
        setSearchResults(newNodes);
      });
      return () => {
        controller.abort();
      };
    } else {
      setSearchResults([]);
    }
  }, [search]);

  return (
    <>
      <Input
        onChange={handleChange}
        value={search}
        height="100%"
        margin="5px"
        variant={variant}
        placeholder={placeholder}
      ></Input>
    </>
  );
};

export default SearchBar;