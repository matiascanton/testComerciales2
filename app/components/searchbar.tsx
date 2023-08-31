import { useTheme } from "../context/themeContext";

type Props = {
  search: string;
  placeholder: string;
  setSearch: (value: string) => void;
};
export default function Searchbar({ search, placeholder, setSearch }: Props) {
  const { theme } = useTheme();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <div className="border border-gray-900 my-1 rounded-md overflow-hidden flex justify-center items-center h-14">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        className="w-full p-2 outline-none bg-transparent"
        placeholder={placeholder}
      />
    </div>
  );
}
