import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

interface Props {
  userId: string;
  onClose: () => void;
}

interface Helper {
  helper: {
    fullName: string;
    phoneNumber: string;
    profileImage: string;
    _id: string;
  };
  relation: string;
  status: string;
}

export const ShowSosHelper = ({ userId, onClose }: Props) => {
  const [helpers, setHelpers] = useState<Helper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const fetchHelpers = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:3000/api/sos/show", {
        userId,
      });
      setHelpers(response.data.data.helperInfo ?? []);
    } catch (err) {
      console.error(err);
      setError("Couldn't load your helpers. Try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchHelpers();
  }, [fetchHelpers]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function removeHelper(helperId: string) {
    setRemovingId(helperId);
    try {
      await axios.delete("http://localhost:3000/api/sos/remove", {
        data: { helperId, userId },
      });
      setHelpers((prev) => prev.filter((h) => h.helper._id !== helperId));
      toast.success("Remove Sucessfully");
    } catch (err) {
      console.error(err);
      setError("Couldn't remove that helper. Try again.");
    } finally {
      setRemovingId(null);
      setConfirmId(null);
    }
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-2xl animate-[fadeIn_0.15s_ease-out]">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">SOS helpers</h2>
            <p className="text-sm text-gray-500">
              People who get notified when you send an SOS
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto px-6 py-4">
          {error && (
            <div className="mb-4 flex items-center justify-between rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              <span>{error}</span>
              <button
                onClick={fetchHelpers}
                className="font-medium text-red-700 underline hover:text-red-800"
              >
                Retry
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 animate-pulse"
                >
                  <div className="h-11 w-11 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 rounded bg-gray-200" />
                    <div className="h-2.5 w-1/4 rounded bg-gray-200" />
                  </div>
                  <div className="h-8 w-20 rounded-lg bg-gray-200" />
                </div>
              ))}
            </div>
          ) : helpers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="font-medium text-gray-900">No helpers added yet</p>
              <p className="mt-1 text-sm text-gray-500">
                Add trusted contacts so they're notified during an SOS.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {helpers
                .filter((h) => h.status === "confirm")
                .map((h) => (
                  <li
                    key={h.helper._id}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                  >
                    {h.helper.profileImage ? (
                      <img
                        src={h.helper.profileImage}
                        alt=""
                        className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                        {getInitials(h.helper.fullName)}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-gray-900">
                        {h.helper.fullName}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        {h.relation}
                        {h.helper.phoneNumber
                          ? ` · ${h.helper.phoneNumber}`
                          : ""}
                      </p>
                    </div>

                    {confirmId === h.helper._id ? (
                      <div className="flex flex-shrink-0 items-center gap-2">
                        <button
                          onClick={() => removeHelper(h.helper._id)}
                          disabled={removingId === h.helper._id}
                          className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-60"
                        >
                          {removingId === h.helper._id
                            ? "Removing…"
                            : "Confirm"}
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmId(h.helper._id)}
                        className="flex-shrink-0 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};


