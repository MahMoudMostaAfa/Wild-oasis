import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "../ui/Select";
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  const navigate = useNavigate();
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
    //navigate(`?sortBy=${e.target.value}`);
  }
  return (
    <Select
      value={sortBy}
      options={options}
      onChange={handleChange}
      type="white"
    />
  );
}

export default SortBy;
