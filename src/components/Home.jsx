import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Home(props) {
  const [task, setTasks] = useState([]);
  const [storage, setStorage] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedPara, setUpdatedPara] = useState("");
  const navigate = useNavigate();
  let email = props.email;

  const FetchTasks = async () => {
    try {
      const res = await axios.post("http://localhost:3001/get-tasks", {
        email,
      });
      const data = res.data.tasks;
      setTasks(data.slice().reverse());
      setStorage(res.data.totalStorageUsed);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    FetchTasks();
  }, []);

  const AddTaskNav = () => {
    navigate("/task");
  };

  const DeleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/delete-task/${id}`);
      toast.info("Deleted Successfully");
      FetchTasks();
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "Failed deleting");
    }
  };

  const UpdateTask = async (id) => {
    try {
      await axios.put(`http://localhost:3001/update-task/${id}`, {
        para: updatedPara,
      });
      toast.success("Task updated");
      setEditingTaskId(null);
      setUpdatedPara("");
      FetchTasks();
    } catch (e) {
      toast.error("Failed to update task");
    }
  };

  function formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  return (
    <div className="m-1">
      <div className="bg-black w-full h-16 mt-1 text-white">
        <div className="flex pt-2 pl-8 lg:space-x-[460px]">
          <button
            onClick={AddTaskNav}
            className="bg-yellow-300 text-black font-bold text-center rounded p-2 cursor-pointer"
          >
            + New Task
          </button>
          <div className="text-amber-300 text-3xl font-bold lg:flex justify-center sm:hidden">
            Tasks Saver
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-center bg-green-300 text-black font-bold terxt-xl p-2">
          All Tasks
        </div>
        <div className="text-center">
          <strong>Total Storage : {storage}</strong>
        </div>
        <div className="grid sm:grid-col-1 md:grid-col-2 lg:grid-cols-4 gap-4 sm:pl-8 sm:pr-8 lg:pl-0 lg:pr-0">
          {task.map((t) => (
            <div
              key={t._id}
              className="relative border-2 border-black mt-4 bg-amber-100 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="flex justify-center text-blue-600">
                Storage used {formatBytes(t.size)}
              </div>
              <h2 className="text-center font-bold text-xl bg-blue-200 py-2">
                {t.heading}
              </h2>

              <div className="text-center text-gray-600 text-sm mt-1">
                {new Date(t.time).toLocaleString()}
              </div>

              <div className="px-4 py-2 max-h-48 mb-12 overflow-auto break-words">
                {editingTaskId === t._id ? (
                  <textarea
                    value={updatedPara}
                    onChange={(e) => setUpdatedPara(e.target.value)}
                    rows={8}
                    required
                    style={{ height: "165px" }}
                    className="w-full h-24 p-2 rounded"
                  />
                ) : (
                  <p className="text-black font-medium whitespace-pre-wrap">
                    {t.para}
                  </p>
                )}
              </div>

              <div className="absolute bottom-2 space-x-4 bg-amber-100 flex justify-end px-4 pb-4">
                {editingTaskId === t._id ? (
                  <button
                    onClick={() => UpdateTask(t._id)}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingTaskId(t._id);
                      setUpdatedPara(t.para);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black rounded px-4 py-1"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => DeleteTask(t._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
