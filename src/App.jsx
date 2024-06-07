import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// File (Main.jsx) new code dare khunde beshe

function App() {
  //vaghti data post kardim, baraye inke dar edame data haye ghabl neshun dade beshe az in estefade mikonim
  const queryClient = useQueryClient();

  const queryKey = ["all-posts"];
  //arrow func khodesh return mikone vali agar {} bezarim bayad az return estefade konim
  const queryFn = () =>
    fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
      res.json()
    );

  const res = useQuery({ queryKey, queryFn });
  console.log(res);

  /* isLoading V4 taghire name dade be isPending ba hamun karkard
  va alan agar hardo true budan, isLoading shoru mishe */
  // isLoading => isPending && isFetched &&
  const { data, isPending, isFetched, isLoading } = useQuery({
    queryKey,
    queryFn,
  });
  console.log({ data, isPending, isFetched, isLoading });

  const mutationFn = (data) =>
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json());

  const { mutate } = useMutation({ mutationFn });

  const clickHandler = () => {
    // be jaye inke dar body: JSON.stringify(data) title,... vared konim, az vorudi data dar mutate estefade mikonim
    const data = { name: "ALI736-WDS" };
    mutate(data, {
      onSuccess: (data) => {
        console.log("data", data);
        queryClient.invalidateQueries({ queryKey: ["all-posts"] }); //chand ta az data ha ghheire motabar beshan ke dobare ejra behse
      },
      onError: (error) => console.log("error", error),
    });
  };

  return (
    <div>
      <button onClick={clickHandler}> Post </button>
    </div>
  );
}

export default App;
