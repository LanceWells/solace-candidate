import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  GetAdvocatesRequest,
  GetAdvocatesResponse,
} from "../api/advocates/route";

export default function useGetAdvocates(
  params: GetAdvocatesRequest
): UseQueryResult<GetAdvocatesResponse, Error> {
  const query = useQuery<GetAdvocatesResponse>({
    queryKey: ["getAdvocates", params.searchTerm],
    queryFn: async () => {
      const url = "/api/advocates?" + new URLSearchParams(params);
      const advocatesData = await fetch(url);
      const advocates = (await advocatesData.json()) as GetAdvocatesResponse;

      return advocates;
    },
  });

  return query;
}
