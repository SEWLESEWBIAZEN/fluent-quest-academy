import { BadgeCheck, UserIcon, Mail, Phone, Calendar, Star } from "lucide-react"; // optional icons
import { UserData } from "@/lib/types";
import { getInitials } from "../../lib/getInitials";
import UpdateAvatar from "./UpdateAvatar";
import { useAuth } from "../../contexts/AuthContext";
import DeleteUser from "./DeleteUser";

interface UserProfileProps {
    user: UserData;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {

const {user:usera} = useAuth()
const ids={dbid:usera?.userId,fbid:usera?.id}

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Avatar */}
      <div className="relative group ">
        {user?.avatar ? (     
          <img
            role="img"
            src={user?.avatar}
            alt="User Avatar"
            className="h-16 w-16 md:h-24 md:w-24 rounded-full object-cover border-2 border-brand-900 shadow group-hover:blur-md"
          />
        ) : (
          <div className="h-16 w-16 md:h-24 md:w-24 rounded-full bg-gradient-to-br from-purple-300 to-brand-900 text-white flex items-center justify-center text-xl md:text-3xl font-bold shadow group-hover:blur-md">
            {getInitials(user?.name ?? "Guest User")}
          </div>
        )}
        {user?.verified && (
          <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow">
            <BadgeCheck role="img" className="w-5 h-5 text-brand-800" aria-label="verified user"/>
          </div>
        )}
        <div className="absolute top-[30%] right-[30%] ">
          <UpdateAvatar />
        </div>

      </div>

      {/* Name & Role */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gradient-custom capitalize">
          {user?.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">@{user?.username}</p>
        <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
          {user?.role}
        </span>
      </div>

      {/* User Details */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span>{user?.phoneNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>Joined: {new Date(user?.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>Rating: {user?.rating}/5</span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4 text-gray-500" />
          <span>Streak: {user?.streakDays} day(s)</span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4 text-gray-500" />
          <span>Points: {user?.points}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4 text-gray-500" />
          <span>Courses Enrolled: {user?.enrolledCourses?.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4 text-gray-500" />
          <span>Last Updated: {new Date(user?.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <DeleteUser ids={ids} accessToken={usera?.accessToken} />
      </div>
    </div>
  );
};

export default UserProfile;
