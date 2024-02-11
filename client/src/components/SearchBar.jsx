function SearchBar({data, setData}) {
 
  return (
    <div className="max-w-md p-5 rounded-md ">
        <input type={"text"} className="w-full py-2 rounded-md bg-slate-400"
            value={data}
            name={data}
            placeholder="Find your following"
            onChange={ e => setData(e.target.data)}
        />
    </div>
  );
}

export default SearchBar;