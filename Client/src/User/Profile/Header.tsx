import { Calendar, Edit2, Mail, MapPin, Phone, Plus, X } from "lucide-react";
import { ProfileImageSection } from "./ProfileImageSection";
import { EditUserInfo } from "./EditUserInfo";
import { useState } from "react";
import { ShowPasswordModal } from "./ShowPasswordModal";
import { useDataContext } from "../../Context/ContextApi";
import { formatDateTime } from "../../pages/Report/FormattedDat";
import { SelectSOSuser } from "../../components/sosActivity/selectSOSUser";

export function Header() {
  const { user } = useDataContext();
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [SOSUSer, setSOSUser] = useState<boolean>(false);
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden mt-20">
      <div className="p-8 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          <ProfileImageSection />
          <div className="flex-1">
            {!editProfile ? (
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                      {user?.fullName}
                    </h1>
                    <p className="text-gray-800 flex items-center gap-2">
                      <Calendar className="text-orange-700" size={16} />
                      Join:
                      {formatDateTime(user?.updatedAt as string)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSOSUser(!SOSUSer)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition-all duration-200 ${
                      SOSUSer
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg"
                    }`}
                  >
                    {SOSUSer ? (
                      <>
                        <X size={18} />
                        <span>Close</span>
                      </>
                    ) : (
                      <>
                        <Plus size={18} />
                        <span>SOS Contact</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditProfile(!editProfile);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors duration-200 font-medium"
                  >
                    <Edit2 className="text-orange-700" size={18} /> Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail size={20} className="text-orange-700" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone size={20} className="text-orange-700" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium">{user?.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin size={20} className="text-orange-700" />
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="font-medium">{user?.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar size={20} className="text-orange-700" />
                    <div>
                      <p className="text-xs text-gray-500">Last Login</p>
                      <p className="font-medium">last login date</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowPasswordModal(!showPasswordModal)}
                  className="mt-6 px-4 py-2 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
                >
                  Change Password
                </button>
              </div>
            ) : (
              <EditUserInfo
                setEditProfile={setEditProfile}
                editProfile={editProfile}
              />
            )}
          </div>
        </div>
      </div>
      {showPasswordModal && (
        <ShowPasswordModal
          setShowPasswordModal={setShowPasswordModal}
          showPasswordModal={showPasswordModal}
        />
      )}
      {SOSUSer && <SelectSOSuser />}
    </div>
  );
}
