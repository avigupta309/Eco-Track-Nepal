import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { userProps } from "../../types";
import { useDataContext } from "../../Context/ContextApi";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
  id: string;
};

export const SosModal = ({ id, onClose }: Props) => {
  const [helper, setHelper] = useState<userProps>();
  const [relation, setRelation] = useState<string>("");
  const { user } = useDataContext();
  useEffect(() => {
    async function fetchUser() {
      if (!id) return null;
      const response = await axios.get(`http://localhost:3000/api/user/${id}`);
      setHelper(response.data.data);
    }
    fetchUser();
  }, [id]);

  async function AddSOShelper(id: string) {
    if (!relation.trim()) {
      toast.error("Plz Mentioned Relation First");
      return null;
    }
    const userId = user?._id;
    const helperId = id;
    await axios.post("http://localhost:3000/api/sos/set", {
      userId,
      helperId,
      relation,
    });
    onClose();
    toast.success(`Sucessfully Added your ${relation} as helper`);
  }

  if (!helper) return;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-md rounded-2xl bg-white shadow-2xl p-0 overflow-hidden">
        <div className="flex items-center justify-between bg-green-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white">Add SOS Helper</h3>

          <button
            onClick={onClose}
            className="btn btn-circle btn-sm bg-white text-green-600 border-none hover:bg-green-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center px-8 py-8">
          <div className="avatar">
            <div className="w-20 h-20 rounded-full overflow-hidden ring ring-green-500 ring-offset-2">
              {helper.profileImage ? (
                <img
                  src={helper.profileImage}
                  alt={helper.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-600 text-white text-lg font-bold">
                  {helper.fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-800">
            {helper.fullName}
          </h2>

          <p className="mt-3 text-center text-gray-500">
            This user will receive your emergency SOS alerts whenever you
            trigger an emergency.
          </p>
          <input
            value={relation}
            onChange={(e) => {
              setRelation(e.target.value);
            }}
            type="text"
            placeholder="Mentioned Relation here.."
            className="input input-ghost"
          />
        </div>

        <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="btn btn-outline border-gray-300 text-gray-700 hover:bg-red-100 hover:text-red-700"
          >
            Close
          </button>

          <button
            onClick={() => {
              AddSOShelper(helper._id);
            }}
            className="btn bg-green-600 border-none text-white hover:bg-green-700"
          >
            + Add
          </button>
        </div>
      </div>
    </dialog>
  );
};
