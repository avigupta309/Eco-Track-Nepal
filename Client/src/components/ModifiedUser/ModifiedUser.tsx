import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ModifiedModal } from "./ModifiedModal";
import axios from "axios";
import { userProps } from "../../types";

export function ModiFiedUser() {
  const [userId, setUserId] = useState<string>();
  const [users, setUsers] = useState<userProps[]>([]);

  useEffect(() => {
    async function fetChedUser() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/alluser",
        );
        setUsers(response.data.users);
      } catch (error: any) {
        console.log("error message: ", error.message);
      }
    }
    fetChedUser();
  }, []);

  return (
    <>
      <div>
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-2 tracking-tight">
            User <span className="text-green-600">Management</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Manage your team members and their information
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border-2 border-green-100 overflow-hidden">
          <table className="w-full border-green-500 border mb-10">
            <thead>
              <tr className="bg-green-500 hover:bg-green-600 text-white border-green-600 ">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  S.N
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>
                <th className=" px-6 py-4 text-left text-sm font-semibold">
                  Role
                </th>
                <th className="hidden md:block px-6 py-4 text-left text-sm font-semibold">
                  Phone Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 hover:bg-blue-50 transition-colors index === reports.length - 1 ? "border-b-0" : `}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <p className="font-medium text-gray-900">{index + 1}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{user.fullName}</td>

                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {user.role}
                    </td>
                    <td className="hidden md:block px-6 py-4 text-gray-700 text-sm">
                      {user.phoneNumber}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setUserId(user._id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors duration-200 font-medium"
                      >
                        <Edit2 className="text-orange-700" size={18} /> Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-gray-600 font-medium">
            Total Users:{" "}
            <span className="text-green-600 font-bold">{users.length}</span>
          </p>
        </div>
      </div>

      {userId && (
        <ModifiedModal
          userId={userId}
          onClose={() => {
            setUserId("");
          }}
        />
      )}
    </>
  );
}
