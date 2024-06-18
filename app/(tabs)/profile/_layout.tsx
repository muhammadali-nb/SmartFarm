import { Slot } from "expo-router";
import ProfileHeader from "src/components/layout/profile/profile-header";

const ProfileLayout = () => {
	return (
		<>
			<ProfileHeader />
			<Slot />
		</>
	);
};

export default ProfileLayout;
