import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userProps } from "../../types";
import { SosModal } from "./sosModal";
import { useDataContext } from "../../Context/ContextApi";

export const SelectSOSuser = () => {
  const [users, setUsers] = useState<userProps[]>([]);
  const [helperId, setHelperId] = useState<string | null>(null);
  const { user } = useDataContext();
  const userId = user?._id;

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/sos/soshelper",
          {
            userId,
          },
        );
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Cannot fetch users");
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="mx-auto max-w-5xl rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
      <div className=" bg-green-600 px-8 py-6">
        <h1 className="text-3xl font-bold text-white">Select SOS Helpers</h1>
        <p className="text-green-100 mt-1">
          Choose trusted people who will receive your emergency alerts.
        </p>
      </div>

      <div className="p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-green-100 text-gray-700">
              <th className="py-4 text-left font-semibold">S.N</th>
              <th className="py-4 text-left font-semibold">Full Name</th>
              <th className="py-4 text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {users
              .filter((helper) => helper._id !== userId)
              .map((helper, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-green-50 transition duration-300"
                >
                  <td className="py-5 font-medium text-gray-600">
                    {index + 1}
                  </td>

                  <td className="py-5">
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => {
                          setHelperId(helper._id);
                        }}
                        className="h-11 w-11 rounded-full flex items-center justify-center font-bold text-lg cursor-pointer"
                      >
                        {helper.profileImage ? (
                          <img
                            className="w-10 h-10 rounded-full "
                            src={helper.profileImage}
                          />
                        ) : (
                          helper.fullName.charAt(0).toUpperCase()
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {helper.fullName}
                        </p>
                        <p className="text-sm text-gray-500">Available User</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 text-center">
                    <button
                      onClick={() => {
                        setHelperId(helper._id);
                      }}
                      className="rounded-xl bg-green-600 hover:bg-green-700 px-6 py-2.5 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                    >
                      + Add Helper
                    </button>
                  </td>
                </tr>
              ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="py-16 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {helperId && (
          <SosModal
            id={helperId}
            onClose={() => {
              setHelperId(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
