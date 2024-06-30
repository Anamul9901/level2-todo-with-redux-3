import { useState } from "react";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useDeleteTodoMutation, useGetTodosQuery } from "@/redux/api/api";

const TodoContainer = () => {
  //* From Local State
  // const { todos } = useAppSelector((state) => state.todos);
  const [priority, setPriority] = useState("");
  // console.log(priority);

  //* From server
  const { data: todos, isLoading } = useGetTodosQuery(
    priority /**{ pollingInterval: 1000 } */
  ); // aivabe pollingInterval use korar karone pore 1000ms por por data fetch korbe. jeta web crush korbe. tai amora aivabe use korbo nah. api file e use korbo.

  // const [deleteTodo] = useDeleteTodoMutation();
  // deleteTodo()

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
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
