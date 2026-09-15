import { useRef } from "react";
import { Tag } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

function ProfileCard({ profile, onAvatarChange }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onAvatarChange?.(file);
    }
  };

  const photo = profile?.profilePhoto || profile?.avatar;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 flex flex-col items-center text-center font-manrope">

      <div className="relative mb-4">
        <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-border bg-surface-muted flex items-center justify-center shadow-xs">
          {photo ? (
            <img
              src={photo}
              alt={profile?.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-primary flex items-center justify-center text-primary-text">
              <UserOutlined className="text-4xl" />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Upload profile photo"
          aria-label="Upload profile photo"
          className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface bg-primary text-primary-text shadow-md hover:bg-primary-hover hover:scale-110 transition-all cursor-pointer"
        >
          <CameraOutlined className="text-sm" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <h2 className="text-xl font-extrabold text-text-primary m-0 leading-tight font-manrope">
        {profile?.name || "Admin"}
      </h2>
      <div className="mt-2">
        <Tag
          bordered={false}
          className="bg-primary text-primary-text font-bold text-[11px] rounded px-2.5 py-0.5 m-0 tracking-wide font-manrope uppercase"
        >
          {profile?.role || "Admin"}
        </Tag>
      </div>

      <div className="w-full mt-6 pt-6 border-t border-border space-y-3 text-left font-manrope">
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          <MailOutlined className="text-text-muted text-sm shrink-0" />
          <span className="truncate">{profile?.email}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          <SafetyCertificateOutlined className="text-primary text-sm shrink-0" />
          <span>Full Platform Access</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
