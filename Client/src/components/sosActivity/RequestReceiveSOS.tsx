import axios from "axios";
import { useEffect, useState } from "react";
import { RequestSentSOS } from "./RequestSentSOS";
import { X } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  userId: string;
  onClose: () => void;
}

interface HelperRequest {
  requesters: {
    fullName: string;
    phoneNumber: string;
    profileImage: string;
    _id: string;
  };
  status: string;
  relation: string;
  _id: string;
}

export const RequestReceiveSOS = ({ userId, onClose }: Props) => {
  const [received, setReceived] = useState<HelperRequest[]>([]);

  useEffect(() => {
    if (!userId) return;
    async function fetchRequestReceive() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/sos/requestreceive",
          {
            userId,
          },
        );

        setReceived(response.data.data.requestedFrom ?? []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchRequestReceive();
  }, [userId]);

  async function reactOnRequest(
    requesters: string,
    action: boolean,
    relation: string,
  ) {
    let status = "pending";
    if (action) {
      status = "confirm";
    }
    try {
      await axios.put("http://localhost:3000/api/sos/update", {
        userId,
        requesters,
        status,
        relation,
      });
      setReceived((prev) => prev.filter((r) => r._id !== requesters));
      toast.success("Accepted Sucessfully");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-2xl animate-[fadeIn_0.15s_ease-out]">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              SOS helper requests
            </h2>
            <p className="text-sm text-gray-500">
              Manage who you help, and who's helping you
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto px-6 py-4">
          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Requests received
            </h3>

            {received.length <= 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center">
                <p className="text-sm text-gray-500">
                  No one has asked to be added yet.
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
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {received
                    .filter((sender) => sender.status !== "confirm")
                    .map((r, index) => (
                      <tr
                        key={r._id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="py-3">
                          {r.requesters.profileImage ? (
                            <img
                              src={r.requesters.profileImage}
                              alt=""
                              className="h-9 w-9 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                              {r.requesters.fullName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </td>
                        <td className="py-3">
                          <p className="font-medium text-gray-900">
                            {/* {r.requesters.fullName} */}
                            {/* {r.status} */}
                          </p>
                          {r.requesters.phoneNumber && (
                            <p className="text-sm text-gray-500">
                              {r.requesters.phoneNumber}
                            </p>
                          )}
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          {r.relation}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                reactOnRequest(
                                  r.requesters._id,
                                  true,
                                  r.relation,
                                )
                              }
                              className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-60"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                reactOnRequest(
                                  r.requesters._id,
                                  false,
                                  r.relation,
                                )
                              }
                              className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </section>
          <RequestSentSOS userId={userId} />
        </div>
      </div>
    </div>
  );
};
