import * as React from "react";
import Layout from "components/Layout";
import {
  Box,
  Center,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Stack,
  Input,
  Text,
} from "@chakra-ui/react";
import VendorCard from "components/VendorCard";
import { Select } from "chakra-react-select";
import useAuth from "hooks/useAuth";

import axios from "axios";

function Search() {
  const [loading, setLoading] = React.useState<any>(false);
  const [hits, setHits] = React.useState<any[]>([]);
  const [count, setCount] = React.useState<number>(0);
  const [sortBy, setSortBy] = React.useState<string>("name");
  const [filters, setFilters] = React.useState<any>("");
  const { auth: me } = useAuth();

  const [search, setSearch] = React.useState<any>("");

  const doSearch = React.useCallback(
    (query: any) => {
      const searchString = `/users/search?q=${query}${
        sortBy ? `&sort=${sortBy}` : ""
      }${filters ? `&filters=${filters}` : ""}`;
      axios
        .get(searchString)
        .then((results: any) => {
          setHits(results.data);
          setCount(results.data.length);
          setLoading(false);
        })
        .catch((error: any) => console.log(error));
    },
    [setCount, sortBy, filters]
  );

  React.useEffect(() => {
    if (search.length >= 3) {
      doSearch(search);
    }
  }, [search, doSearch]);

  const handleFilters = (filters: any) => {
    const searchFilter = filters.map((item: any) => item.value).join(",");
    setFilters(searchFilter);
  };

  // eslint-disable-next-line
  // @ts-ignore
  if (!me && me?.role !== "USER") return null;
  return (
    <Layout>
      <Stack spacing={6} pt="2em" maxW="1250px" mx="auto">
        <Heading>Search</Heading>
        <Box className="search-controls">
          <Input
            variant="outline"
            onChange={(e) => {
              setLoading(true);
              setSearch(e.target.value);
            }}
            placeholder="Search"
          />
          {search.length < 3 ? (
            <Text size="small" color="gray" pl="10px" my="5px">
              Type at least 3 characters
            </Text>
          ) : (
            <Flex
              direction="row"
              justifyContent="space-between"
              wrap={"wrap"}
              className="flexWrapper"
            >
              <Box>
                <Select
                  variant="outline"
                  options={[
                    { label: "Name", value: "name" },
                    { label: "Borough", value: "borough" },
                  ]}
                  onChange={(e) => (e?.value ? setSortBy(e.value) : "")}
                  placeholder="Sort By"
                />
              </Box>
              <Box className="filters">
                <Select
                  isMulti
                  variant="outline"
                  options={[
                    { label: "MTAC", value: "mtac" },
                    { label: "NYC MWBE Certification", value: "nyc-mwbe" },
                    { label: "NYS MWBE Certification", value: "nys-mwbe" },
                    { label: "FAMIS Certification", value: "famis" },
                  ]}
                  onChange={handleFilters}
                  placeholder="Filter By"
                />
              </Box>
            </Flex>
          )}
        </Box>

        <Spacer
          // eslint-disable-next-line
          // @ts-ignore
          y={2}
        />
        <Box>
          <Heading as="h2" size="md">
            {count > 0 ? `Results (${count})` : ""}
          </Heading>
          <Flex justifyContent="between" wrap={"wrap"}>
            {loading && search.length > 0 && (
              <Center>
                <Spinner />
              </Center>
            )}
            {hits?.map((vendor, index) => (
              <Box key={index}>
                <VendorCard user={vendor} />
                <Spacer />
              </Box>
            ))}
          </Flex>
        </Box>
      </Stack>
    </Layout>
  );
}

export default Search;
