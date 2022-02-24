import { useState } from "react";
import { useQuery } from "react-query";
import { Logo as Person } from "../Person/PersonMini";
function debounce (fn, ms) {
   let timer
   return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
         timer = null
         fn.apply(this, arguments)
      }, ms)
   };
}

function FindFriends () {
   const { data: searchData, error, loading, refetch } = useQuery("findFriend",
      async () => {
         console.log("Fetching data");
         const res = await fetch("/api/users/all");
         return await res.json();
      },
      {
         refetchOnWindowFocus: false,
         refetchInterval: 1000 * 60 * 60 * 24,
         refetchOnMount: true
      },
   );

   const [searchString, setSearchString] = useState("");
   const searchResults = (e) => {
      setSearchString(e.target.value)
      refetch();
   }
   return (<section className="findFriends">
      <span style={{ fontSize: "1.5em" }}>Make New Friends</span>
      <form className="normform">
         <input type="text" value={searchString} onChange={(e) => debounce(searchResults(e), 500)} />
      </form>
      <div className="results">
         {searchString.length > 1 && !loading ? <>
            {searchData.map((x, i) =>
               (<Person className={"glassModel"} person={x} onClick="" key={i} />))
            }</> : ""}
      </div>
   </section>);
}

export default FindFriends;