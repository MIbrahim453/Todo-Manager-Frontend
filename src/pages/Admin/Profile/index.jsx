import { useState, useContext } from "react";
import { Typography } from "antd";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import { AuthContext } from "../../../context/authContext";
import { UserContext } from "../../../context/userContext";
import useAntdMessage from "../../../hooks/useAntdMessage";

const { Title, Text } = Typography;

function AdminProfile() {
  const { user: authUser } = useContext(AuthContext);
  const { user: ctxUser, editProfile, uploadProfilePhoto, loading } = useContext(UserContext);
  const { messageApi, contextHolder } = useAntdMessage();

  const [isEditing, setIsEditing] = useState(false);

  const currentUser = ctxUser || authUser;

  const handleAvatarChange = async (file) => {
    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      const res = await uploadProfilePhoto(formData);
      if (res?.success) {
        messageApi.success(res.message || "Profile photo updated successfully!");
      } else {
        messageApi.error(res?.message || "Failed to update profile photo");
      }
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Upload failed");
    }
  };

  const handleProfileSave = async (updatedData) => {
    try {
      const res = await editProfile(updatedData);
      if (res?.success) {
        messageApi.success(res.message || "Profile details saved successfully!");
        setIsEditing(false);
      } else {
        messageApi.error(res?.message || "Failed to save profile");
      }
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Failed to save profile");
    }
  };

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      {contextHolder}
      <div className="font-manrope">

        <div className="mb-6">
          <Text className="!text-xs !font-bold !uppercase !tracking-[0.14em] !text-text-muted font-manrope block mb-1">
            ADMIN · ACCOUNT SETTINGS
          </Text>
          <Title
            level={2}
            className="!mb-0 !text-2xl sm:!text-3xl !font-extrabold !text-text-primary font-manrope"
          >
            Account Profile
          </Title>
          <Text className="!text-sm !text-text-muted font-manrope mt-1 block">
            Manage your personal details, email credentials, and profile image.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          <div className="lg:col-span-4 xl:col-span-4">
            <ProfileCard
              profile={currentUser}
              onAvatarChange={handleAvatarChange}
              isEditing={isEditing}
            />
          </div>

          <div className="lg:col-span-8 xl:col-span-8">
            <ProfileForm
              profile={currentUser}
              isEditing={isEditing}
              onToggleEdit={handleToggleEdit}
              onSave={handleProfileSave}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProfile;
