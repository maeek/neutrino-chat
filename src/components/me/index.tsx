import ProfileBanner from './components/banner';
import ProfileAvatar from './components/avatar';
import ProfileUsername from './components/username';
import ProfileBio from './components/bio';
import ProfileQuickLinks from './components/quick-links';
import ProfileStatistics from './components/statistics';
import ProfilePageBackground from './components/page-background';
import './me.scss';

export const ProfileView = () => {

  return (
    <div className="view-root view-root--me">
      <ProfilePageBackground />
      <ProfileBanner />
      <div className="me-profile-content">
        <ProfileAvatar />
        <ProfileUsername />
        <ProfileBio />
        <ProfileStatistics />
        <ProfileQuickLinks />
      </div>
    </div>
  );
};

export default ProfileView;
