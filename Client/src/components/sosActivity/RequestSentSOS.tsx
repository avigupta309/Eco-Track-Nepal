import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface RequestSentProps {
  _id: string;
  relation: string;
  status: string;

  helper: {
    fullName: string;
    phoneNumber: number;
    profileImage: string;
    _id: string;
  };
}

interface props {
  userId: string;
}

export const RequestSentSOS = ({ userId }: props) => {
  const [sent, setSent] = useState<RequestSentProps[]>([]);
  useEffect(() => {
    async function fetchSentRequest() {
      if (!userId) return;
      try {
        const response = await axios.post(
          "http://localhost:3000/api/sos/show",
          {
            userId,
          },
        );
        setSent(response.data.data.helperInfo ?? []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSentRequest();
  }, [userId]);

  async function cancelRequest(helperId: string, requestedTo: string) {
    try {
      await axios.delete("http://localhost:3000/api/sos/remove", {
        data: { userId, helperId, requestedTo },
      });
      setSent((prev) => prev.filter((r) => r._id !== helperId));
      toast.success("Cancelled Sucessfully");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="mt-8">
      <h3 className="mb-3 text-sm font-semibold text-gray-900">
        Requests sent
      </h3>

      {sent.length <= 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center">
          <p className="text-sm text-gray-500">
            You haven't asked anyone to be your helper yet.
          </p>
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              <th className="w-10 pb-2">SN</th>
              <th className="w-11 pb-2"></th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Relation</th>
              <th className="pb-2">Status</th>
              <th className="pb-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {sent
              .filter((user) => user.status !== "confirm")
              .map((r, index) => (
                <tr
                  key={r._id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 text-sm text-gray-500">{index + 1}</td>
                  <td className="py-3">
                    {r.helper.profileImage ? (
                      <img
                        src={r.helper.profileImage}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-xl text-gray-600">
                        {r.helper.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="py-3">
                    <p className="font-medium text-gray-900">
                      {r.helper.fullName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {r.helper.phoneNumber}
                    </p>
                  </td>
                  <td className="py-3 text-sm text-gray-600">{r.relation}</td>
                  <td className="py-3 text-sm text-gray-600">{r.status}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => cancelRequest(r._id, r.helper._id)}
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-60"
                      >
                        Cancel
                      </button>
                      <>
                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                          Pending
                        </span>
                      </>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </section>
  );
};
