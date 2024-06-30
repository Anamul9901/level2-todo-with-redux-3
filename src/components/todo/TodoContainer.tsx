import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";

const TodoContainer = () => {
  //* From Local State
  // const { todos } = useAppSelector((state) => state.todos);

  //* From server
  const {
    data: todos,
    isLoading,
  } = useGetTodosQuery(undefined, /**{ pollingInterval: 1000 } */ ); // aivabe pollingInterval use korar karone pore 1000ms por por data fetch korbe. jeta web crush korbe. tai amora aivabe use korbo nah. api file e use korbo.

  console.log(todos);
  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter />
      </div>

      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        {/* <div className="bg-white p-3 flex justify-center items-center rounded-md text-2xl font-semibold">
          <p>There is no task pending</p>
        </div> */}
        <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
          {todos?.data?.map((item) => (
            <TodoCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
